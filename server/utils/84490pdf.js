const {PDFDocument, rgb} = require('pdf-lib')
const fs = require('fs')
const {convertDate} = require('./helper')

async function create84490Pdf(existingPdfPath, outputPdfPath, customer) {
  const today = new Date()
  const year = today.getFullYear()

  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes,{ ignoreEncryption: true });
  const page1 = pdfDoc.getPages()[0];
  const page2 = pdfDoc.getPages()[1];

  //today year cart
  page1.drawText(year.toString(), {
    x: 60,
    y: 618,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart body
  page1.drawText(`${customer.cartSize}P`, {
    x: 420,
    y: 618,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //name
  page2.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 40,
    y: 625,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //address
  page2.drawText(`${customer.addr1} ${customer.addr2}`, {
    x: 40,
    y: 598,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //city 
  page2.drawText(customer.city, {
    x: 40,
    y: 573,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //state
  page2.drawText(customer.state, {
    x: 170,
    y: 573,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //zip
  page2.drawText(customer.zip, {
    x: 260,
    y: 573,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart color
  page1.drawText(customer.cartColor, {
    x: 330,
    y: 618,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, modifiedPdfBytes);
}

module.exports = {create84490Pdf}