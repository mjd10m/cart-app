const {PDFDocument, rgb} = require('pdf-lib')
const fs = require('fs')
const {convertDate} = require('./helper')

async function create82040Pdf(existingPdfPath, outputPdfPath, customer) {
  const today = new Date()
  const year = today.getFullYear()
  const day = today.getDate()
  const month = today.getMonth() + 1

  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes,{ ignoreEncryption: true });
  const page1 = pdfDoc.getPages()[0];
  const page2 = pdfDoc.getPages()[1];

  //today year cart
  page1.drawText(year.toString(), {
    x: 225,
    y: 315,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart make
  page1.drawText('ASPT', {
    x: 15,
    y: 315,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart body
  page1.drawText(`${customer.cartSize}P`, {
    x: 275,
    y: 315,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //vin
  page1.drawText('FLA', {
    x: 15,
    y: 340,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //name
  page1.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 15,
    y: 570,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //name page 2
  page2.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 15,
    y: 257,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //dob
  page1.drawText(convertDate(customer.dob).toString(), {
    x: 540,
    y: 570,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //address
  page1.drawText(`${customer.addr1} ${customer.addr2}`, {
    x: 140,
    y: 545,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //owner address
  page1.drawText(`${customer.addr1} ${customer.addr2}`, {
    x: 15,
    y: 525,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //city 
  page1.drawText(customer.city, {
    x: 375,
    y: 545,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //owner city 
  page1.drawText(customer.city, {
    x: 375,
    y: 525,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //state
  page1.drawText(customer.state, {
    x: 505,
    y: 545,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //owner state
  page1.drawText(customer.state, {
    x: 505,
    y: 525,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //zip
  page1.drawText(customer.zip, {
    x: 540,
    y: 545,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //owner zip
  page1.drawText(customer.zip, {
    x: 540,
    y: 525,
    size: 12,
    color: rgb(0, 0, 0),
  });
  page1.drawText(customer.cartColor, {
    x: 320,
    y: 315,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, modifiedPdfBytes);
}

module.exports = {create82040Pdf}