import { useState } from "react";
import { ServiceRequestDialog } from "./ServiceRequestDialog";
import { FeedbackDialog } from "./FeedbackDialog";
import { Sparkles, MessageSquarePlus } from "lucide-react";

export function FloatingActions() {
  const [reqOpen, setReqOpen] = useState(false);
  const [fbOpen, setFbOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3">
        <button
          onClick={() => setReqOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-3 text-xs font-bold text-secondary-foreground shadow-lg hover:scale-105 transition-transform"
          aria-label="Request a service, product or training"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Request Service</span>
        </button>
        <button
          onClick={() => setFbOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full bg-card border-2 border-primary px-4 py-3 text-xs font-bold text-primary shadow-lg hover:scale-105 transition-transform"
          aria-label="Send a complaint or recommendation"
        >
          <MessageSquarePlus className="h-4 w-4" />
          <span className="hidden sm:inline">Feedback</span>
        </button>
      </div>
      <ServiceRequestDialog open={reqOpen} onClose={() => setReqOpen(false)} />
      <FeedbackDialog open={fbOpen} onClose={() => setFbOpen(false)} />
    </>
  );
}
