const {PDFDocument, rgb} = require('pdf-lib')
const fs = require('fs')
const {convertDate} = require('./helper')

async function create84490Pdf(existingPdfPath, outputPdfPath, customer) {
  const today = new Date()
  const year = today.getFullYear()

  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes,{ ignoreEncryption: true });
  const page1 = pdfDoc.getPages()[0];
  const page3 = pdfDoc.getPages()[2];

  //today year cart
  page1.drawText(year.toString(), {
    x: 60,
    y: 600,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart body
  page1.drawText(`${customer.cartSize}P`, {
    x: 420,
    y: 600,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //name
  page3.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 40,
    y: 590,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //address
  page3.drawText(`${customer.addr1} ${customer.addr2}`, {
    x: 40,
    y: 545,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //city 
  page3.drawText(customer.city, {
    x: 40,
    y: 500,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //state
  page3.drawText(customer.state, {
    x: 170,
    y: 500,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //zip
  page3.drawText(customer.zip, {
    x: 260,
    y: 500,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart color
  page1.drawText(customer.cartColor, {
    x: 330,
    y: 600,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, modifiedPdfBytes);
}

module.exports = {create84490Pdf}