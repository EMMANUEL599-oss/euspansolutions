import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, RefreshCw, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg[] = [
  { role: "assistant", content: "👋 Hi, I'm **Euspan Bot**! Nice to meet you." },
  { role: "assistant", content: "I'm here to help you discover our digital training programs, services, and how to get started. What are you looking for?" },
];

const QUICK_REPLIES = [
  "See programs",
  "How do I register?",
  "Pricing",
  "Contact / WhatsApp",
];

function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("euspan_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("euspan_visitor_id", id);
  }
  return id;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(GREETING);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const reset = () => { setMessages(GREETING); setConversationId(null); };

  const sendText = async (text: string) => {
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("euspan-chat", {
        body: {
          messages: next.map(({ role, content }) => ({ role, content })),
          conversationId,
          visitorId: getVisitorId(),
        },
      });
      if (error) throw error;
      const payload = data as { reply?: string; error?: string; conversationId?: string };
      if (payload.conversationId) setConversationId(payload.conversationId);
      const reply = payload.reply ?? payload.error ?? "Sorry, something went wrong. Please try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I'm having trouble right now. Reach us on WhatsApp at 0769722940." }]);
    } finally {
      setLoading(false);
    }
  };

  const send = (e: React.FormEvent) => { e.preventDefault(); sendText(input.trim()); };

  const showQuickReplies = !loading && messages.length <= GREETING.length + 1;

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105"
          aria-label="Open chat">
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold text-sm">Chat with us</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[32rem] rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-hero text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm leading-tight">Euspan Bot</p>
                <p className="text-[11px] text-primary-foreground/80">Online · Replies instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={reset} className="p-1.5 rounded hover:bg-primary-foreground/10" aria-label="Reset chat" title="Reset"><RefreshCw className="h-4 w-4" /></button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded hover:bg-primary-foreground/10" aria-label="Close chat"><X className="h-4 w-4" /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm"
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }}
                />
              </div>
            ))}

            {showQuickReplies && (
              <div className="flex flex-wrap gap-2 pt-2">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} onClick={() => sendText(q)}
                    className="text-xs font-medium border border-primary/30 bg-primary/5 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={send} className="p-3 border-t border-border bg-card flex items-center gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Send a message..." disabled={loading}
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
            <button type="submit" disabled={loading || !input.trim()}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function formatMessage(text: string): string {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
}
