const {PDFDocument, rgb} = require('pdf-lib')
const fs = require('fs')

async function create84491Pdf(existingPdfPath, outputPdfPath, customer) {
  const today = new Date()
  const year = today.getFullYear()

  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes,{ ignoreEncryption: true });
  const page1 = pdfDoc.getPages()[0];
  const page2 = pdfDoc.getPages()[1];

  //today year cart
  page1.drawText(year.toString(), {
    x: 60,
    y: 585,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart body
  page1.drawText(`${customer.cartSize}P`, {
    x: 420,
    y: 585,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //name
  page2.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 40,
    y: 170,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart color
  page1.drawText(customer.cartColor, {
    x: 350,
    y: 585,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, modifiedPdfBytes);
}

module.exports = {create84491Pdf}