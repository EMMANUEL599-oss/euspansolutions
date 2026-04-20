import jsPDF from "jspdf";
import ceoSignature from "@/assets/ceo-signature.png";

const BRAND_BLUE: [number, number, number] = [37, 78, 153];
const BRAND_GREEN: [number, number, number] = [56, 142, 100];
const TEXT_DARK: [number, number, number] = [30, 35, 50];
const TEXT_MUTED: [number, number, number] = [110, 120, 140];

async function imageToDataUrl(src: string): Promise<string> {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function drawCeoSignatureBlock(doc: jsPDF, x: number, y: number, sigDataUrl: string | null) {
  if (sigDataUrl) {
    try {
      doc.addImage(sigDataUrl, "PNG", x, y - 18, 50, 18);
    } catch {
      /* ignore */
    }
  }
  doc.setDrawColor(...TEXT_DARK);
  doc.line(x, y + 2, x + 60, y + 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...TEXT_DARK);
  doc.text("Emmanuel Ndunda", x, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text("Founder & CEO, Euspan Solutions", x, y + 13);
  doc.text("IT Expert | Software & Web Developer", x, y + 17);
  doc.text("Remote Career Coach & Mentor", x, y + 21);
}

export interface ReceiptData {
  receiptNumber: string;
  fullName: string;
  email: string;
  phone?: string | null;
  requestType: string;
  itemName: string;
  message?: string | null;
  amount: number;
  currency: string;
  issuedAt: Date;
}

export async function generateReceiptPDF(data: ReceiptData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const sig = await imageToDataUrl(ceoSignature).catch(() => null);

  // Header band
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, 210, 35, "F");
  doc.setFillColor(...BRAND_GREEN);
  doc.rect(0, 35, 210, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("EUSPAN SOLUTIONS", 15, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("ICT & Digital Solutions Providers", 15, 25);
  doc.text("Kenya  |  +254 769722940  |  infoeuspansolutions@gmail.com", 15, 30);

  // Receipt title
  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("OFFICIAL RECEIPT", 15, 52);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...TEXT_MUTED);
  doc.text(`Receipt No:  ${data.receiptNumber}`, 130, 48);
  doc.text(`Issued:      ${data.issuedAt.toLocaleDateString()}`, 130, 53);

  // Bill to
  doc.setDrawColor(220, 225, 235);
  doc.setLineWidth(0.3);
  doc.line(15, 60, 195, 60);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_DARK);
  doc.text("BILLED TO", 15, 68);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(data.fullName, 15, 75);
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(data.email, 15, 81);
  if (data.phone) doc.text(data.phone, 15, 86);

  // Items table
  doc.setFillColor(245, 247, 252);
  doc.rect(15, 95, 180, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_DARK);
  doc.text("DESCRIPTION", 18, 102);
  doc.text("TYPE", 120, 102);
  doc.text("AMOUNT", 165, 102);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(data.itemName, 18, 115);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...TEXT_MUTED);
  doc.setFontSize(9);
  doc.text(data.requestType.toUpperCase(), 120, 115);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...TEXT_DARK);
  doc.setFontSize(10);
  const amountStr = data.amount > 0 ? `${data.currency} ${data.amount.toLocaleString()}` : "On request";
  doc.text(amountStr, 165, 115);

  if (data.message) {
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_MUTED);
    const lines = doc.splitTextToSize(`Notes: ${data.message}`, 170);
    doc.text(lines, 18, 125);
  }

  // Total band
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(120, 145, 75, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TOTAL", 125, 153);
  doc.setFontSize(13);
  doc.text(amountStr, 165, 154);

  // Thank you
  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.text("Thank you for choosing Euspan Solutions.", 15, 175);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(
    "Our team will reach out shortly to confirm next steps. Keep this receipt as proof of your request.",
    15,
    182,
  );

  // Signature
  drawCeoSignatureBlock(doc, 15, 230, sig);

  // Footer
  doc.setDrawColor(...BRAND_BLUE);
  doc.setLineWidth(0.5);
  doc.line(15, 270, 195, 270);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text("Euspan Solutions  |  Empowering Digital Futures  |  euspansolutions.lovable.app", 105, 278, {
    align: "center",
  });

  return doc;
}

export async function generateBrochurePDF(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const sig = await imageToDataUrl(ceoSignature).catch(() => null);

  // Cover page
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, 210, 297, "F");
  doc.setFillColor(...BRAND_GREEN);
  doc.rect(0, 250, 210, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.text("EUSPAN", 105, 110, { align: "center" });
  doc.text("SOLUTIONS", 105, 125, { align: "center" });
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("ICT & Digital Solutions Providers", 105, 140, { align: "center" });
  doc.setFontSize(11);
  doc.setTextColor(200, 220, 255);
  doc.text("Empowering Digital Futures", 105, 150, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Official Company Brochure  •  2026", 105, 270, { align: "center" });

  // Page 2 — About
  doc.addPage();
  doc.setTextColor(...BRAND_BLUE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("About Euspan Solutions", 15, 25);
  doc.setDrawColor(...BRAND_GREEN);
  doc.setLineWidth(1.5);
  doc.line(15, 28, 80, 28);

  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const about = doc.splitTextToSize(
    "Euspan Solutions is a Kenyan tech startup providing ICT and digital solutions, including technology services, products, and certified digital training programs. We tackle unemployment while nurturing tech careers and talents, empowering individuals to succeed in the digital economy.",
    180,
  );
  doc.text(about, 15, 40);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...BRAND_BLUE);
  doc.text("Our Mission", 15, 80);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...TEXT_DARK);
  doc.setFontSize(10);
  doc.text(
    doc.splitTextToSize(
      "To empower individuals and communities with practical digital skills, innovative technology solutions, and mentorship for the digital economy.",
      180,
    ),
    15,
    87,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...BRAND_BLUE);
  doc.text("Our Vision", 15, 110);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...TEXT_DARK);
  doc.setFontSize(10);
  doc.text(
    doc.splitTextToSize(
      "To establish a leading digital training academy and tech hub, equipping individuals for real-world tech challenges and innovation.",
      180,
    ),
    15,
    117,
  );

  // Services
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...BRAND_BLUE);
  doc.text("What We Offer", 15, 145);

  const services = [
    ["ICT Consultancy", "Technology services and digital solutions for business, education, and agriculture."],
    ["Software Development", "Custom software, mobile & web apps, e-commerce solutions."],
    ["AI & Cybersecurity", "AI solutions and cybersecurity services to protect and automate."],
    ["Digital Training", "Certified courses, freelancing prep, AI/robotics, career coaching."],
    ["Cloud Services", "Cloud strategy, migration, and managed cloud infrastructure."],
    ["Pro Bono LMS", "Free Digital Literacy training with certificates for the community."],
  ];

  doc.setFontSize(10);
  let y = 155;
  services.forEach(([title, desc]) => {
    doc.setFillColor(...BRAND_GREEN);
    doc.circle(18, y - 1, 1.4, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...TEXT_DARK);
    doc.text(title, 23, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXT_MUTED);
    doc.setFontSize(9);
    doc.text(desc, 23, y + 5);
    doc.setFontSize(10);
    y += 14;
  });

  // Contact
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 245, 210, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Get in touch", 15, 257);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Phone: +254 769722940", 15, 265);
  doc.text("Email: infoeuspansolutions@gmail.com", 15, 271);
  doc.text("Web:   euspansolutions.lovable.app", 15, 277);

  // Page 3 — CEO message + signature
  doc.addPage();
  doc.setTextColor(...BRAND_BLUE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("A Message from the CEO", 15, 25);
  doc.setDrawColor(...BRAND_GREEN);
  doc.setLineWidth(1.5);
  doc.line(15, 28, 80, 28);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...TEXT_DARK);
  doc.setFontSize(11);
  const message = doc.splitTextToSize(
    "At Euspan Solutions we believe technology is the most direct path out of unemployment. We don't just train — we mentor, place, and walk alongside our learners until they earn. Our doors are open to youth, professionals, businesses, schools, and communities who want to grow with the digital economy. Whether you need a service, a product, or a skill — we're here to deliver.\n\nThank you for trusting us with your digital journey.",
    180,
  );
  doc.text(message, 15, 45);

  drawCeoSignatureBlock(doc, 15, 130, sig);

  // Footer
  doc.setDrawColor(...BRAND_BLUE);
  doc.setLineWidth(0.5);
  doc.line(15, 280, 195, 280);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text("© Euspan Solutions  |  Empowering Digital Futures", 105, 287, { align: "center" });

  return doc;
}

export interface CertificateData {
  certificateNumber: string;
  fullName: string;
  courseTitle: string;
  issuedAt: Date;
}

export async function generateCertificatePDF(data: CertificateData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  const sig = await imageToDataUrl(ceoSignature).catch(() => null);

  // Outer decorative border
  doc.setDrawColor(...BRAND_BLUE);
  doc.setLineWidth(2);
  doc.rect(8, 8, 281, 194);
  doc.setDrawColor(...BRAND_GREEN);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, 273, 186);

  // Top band
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(12, 12, 273, 22, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("EUSPAN SOLUTIONS", 148.5, 26, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("ICT & Digital Solutions Providers  |  Free Pro Bono Training", 148.5, 31, { align: "center" });

  // Title
  doc.setTextColor(...BRAND_BLUE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.text("CERTIFICATE", 148.5, 60, { align: "center" });
  doc.setFontSize(16);
  doc.setTextColor(...TEXT_MUTED);
  doc.setFont("helvetica", "normal");
  doc.text("of Appreciation & Completion", 148.5, 70, { align: "center" });

  // Body
  doc.setFontSize(12);
  doc.setTextColor(...TEXT_DARK);
  doc.text("This certificate is proudly presented to", 148.5, 90, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...BRAND_BLUE);
  doc.text(data.fullName, 148.5, 110, { align: "center" });
  doc.setDrawColor(...BRAND_GREEN);
  doc.setLineWidth(0.6);
  const nameWidth = doc.getTextWidth(data.fullName);
  doc.line(148.5 - nameWidth / 2 - 10, 113, 148.5 + nameWidth / 2 + 10, 113);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...TEXT_DARK);
  doc.text("for successfully completing the free pro-bono course", 148.5, 125, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...BRAND_GREEN);
  doc.text(`"${data.courseTitle}"`, 148.5, 138, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(
    "Awarded by Euspan Solutions in recognition of dedication, learning, and digital empowerment.",
    148.5,
    148,
    { align: "center" },
  );

  // Signature
  drawCeoSignatureBlock(doc, 30, 180, sig);

  // Date + cert number
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_DARK);
  doc.text(`Issued: ${data.issuedAt.toLocaleDateString()}`, 250, 185, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(`Certificate ID: ${data.certificateNumber}`, 250, 191, { align: "right" });

  return doc;
}
