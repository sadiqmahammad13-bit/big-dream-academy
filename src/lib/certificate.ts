// Generates a downloadable PDF certificate entirely in the browser using
// jsPDF — no backend needed, which fits this app's mobile-only workflow.

import jsPDF from "jspdf";

export interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string; // human-readable, e.g. "July 31, 2026"
  certificateId: string;
}

export function generateCertificatePDF({
  studentName,
  courseName,
  completionDate,
  certificateId,
}: CertificateData) {
  // Landscape A4 in points
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(12, 15, 16); // ink-900
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Decorative border — gold
  doc.setDrawColor(212, 175, 55); // gold-500
  doc.setLineWidth(3);
  doc.rect(24, 24, pageWidth - 48, pageHeight - 48);

  // Inner thin green border
  doc.setDrawColor(31, 169, 113); // grow-500
  doc.setLineWidth(1);
  doc.rect(34, 34, pageWidth - 68, pageHeight - 68);

  // Brand
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("BIG DREAM ACADEMY", pageWidth / 2, 90, { align: "center" });

  // Title
  doc.setTextColor(243, 240, 231); // bone
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.text("Certificate of Completion", pageWidth / 2, 140, { align: "center" });

  // "This certifies that"
  doc.setTextColor(154, 163, 160); // smoke
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("This certifies that", pageWidth / 2, 190, { align: "center" });

  // Student name
  doc.setTextColor(31, 169, 113); // grow-500
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(studentName, pageWidth / 2, 230, { align: "center" });

  // "has successfully completed"
  doc.setTextColor(154, 163, 160);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("has successfully completed the course", pageWidth / 2, 265, { align: "center" });

  // Course name
  doc.setTextColor(243, 240, 231);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(courseName, pageWidth / 2, 300, { align: "center" });

  // Date
  doc.setTextColor(154, 163, 160);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Completed on ${completionDate}`, pageWidth / 2, 335, { align: "center" });

  // Certificate ID — bottom
  doc.setFontSize(10);
  doc.text(`Certificate ID: ${certificateId}`, pageWidth / 2, pageHeight - 50, { align: "center" });

  doc.save(`Big-Dream-Academy-Certificate-${certificateId}.pdf`);
}
