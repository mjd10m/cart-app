const {PDFDocument, rgb} = require('pdf-lib')
const fs = require('fs')

async function create86064Pdf(existingPdfPath, outputPdfPath, customer) {
  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes,{ ignoreEncryption: true });
  const page1 = pdfDoc.getPages()[0];

  //name
  page1.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 80,
    y: 100,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, modifiedPdfBytes);
}

module.exports = {create86064Pdf}