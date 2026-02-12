import jsPDF from 'jspdf';

export const generateExplanationPDF = (explanationText) => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Define margin size
  const margin = 14; // Set a margin (in mm)

  // Set font for the title and content
  doc.setFont('helvetica', 'normal'); // Font type
  doc.setFontSize(18); // Title font size
  doc.text("Code Explanation", margin, 20); // Apply margin for the title

  // Set font size for content
  doc.setFontSize(12); // Content font size
  let currentY = 30; // Starting Y position for the content

  // Split the explanation text into sections (for better formatting in PDF)
  const explanationLines = explanationText.split("\n");
  explanationLines.forEach((line, index) => {
    if (currentY > 280) {
      doc.addPage(); // Add a new page if the content exceeds the current page
      currentY = 20; // Reset Y position for the new page
    }
    doc.text(line, margin, currentY); // Apply margin for each line
    currentY += 6; // Line height adjustment
  });

  // Save the generated PDF
  doc.save("code_explanation.pdf");
};
