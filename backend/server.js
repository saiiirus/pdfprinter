// server.js
const express = require("express");
const app = express();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const pdfPrinter = require("pdf-to-printer");

app.use(express.json());

app.post("/print-receipt", (req, res) => {
  const filePath = path.join(__dirname, "receipt.pdf");

  // Create a PDF document
  const doc = new PDFDocument({ size: [300, 300] }); // Start with an estimated size
  doc.pipe(fs.createWriteStream(filePath));

  // Define text content
  const content = [
    "Receipt",
    "Store Name: ABC Store",
    `Date: ${new Date().toLocaleDateString()}`,
    `Time: ${new Date().toLocaleTimeString()}`,
    "Item 1: $10.00",
    "Item 2: $5.00",
    "Total: $15.00",
    "Item 1: $10.00",
    "Item 2: $5.00",
    "Total: $15.00",
    "Thank you for shopping with us!",
  ];

  // Remove any blank or empty lines
  const filteredContent = content.filter((line) => line.trim() !== "");

  // Define left margin
  const leftMargin = 20; // Adjust this value as needed

  // Add content to the PDF with left margin
  doc.fontSize(12);
  filteredContent.forEach((line, index) => {
    doc.text(line, leftMargin, 50 + index * 15); // Adjust vertical spacing (50 + (index * 15)) as needed
  });

  doc.end();

  // Wait for the file to be created
  setTimeout(() => {
    pdfPrinter
      .print(filePath)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }, 1000); // Delay to ensure PDF is created
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
