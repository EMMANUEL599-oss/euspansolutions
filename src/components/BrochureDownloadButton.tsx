import { useState, type ReactNode } from "react";
import { generateBrochurePDF } from "@/lib/pdf-generator";
import { Download, Loader2 } from "lucide-react";

export function BrochureDownloadButton({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const handle = async () => {
    setLoading(true);
    const pdf = await generateBrochurePDF();
    pdf.save("Euspan-Solutions-Brochure.pdf");
    setLoading(false);
  };
  return (
    <button onClick={handle} disabled={loading} className={className}>
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
      {children ?? "Download Brochure"}
    </button>
  );
}
