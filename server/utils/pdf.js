const {PDFDocument, rgb} = require('pdf-lib')
const fs = require('fs')

function convertDate(date) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-us',{year:"numeric", month:"2-digit", day:"2-digit", timeZone: "UTC"})
}

async function createPoaPdf(existingPdfPath, outputPdfPath, customer) {
  const today = new Date()
  const year = today.getFullYear()
  const day = today.getDate()
  const month = today.getMonth() + 1
  // Read the existing PDF file
  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  
  // Load the existing PDF using pdf-lib
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the first page and add text to it
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();
  console.log('height:' + height + ' width: ' + width)
  //today month
  page.drawText(month.toString(), {
    x: 96,
    y: 692,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //today day
  page.drawText(day.toString(), {
    x: 122,
    y: 692,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //today year
  page.drawText(year.toString(), {
    x: 144,
    y: 692,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //today year cart
  page.drawText(year.toString(), {
    x: 30,
    y: 435,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //cart make
  page.drawText('ASPT', {
    x: 75,
    y: 435,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //body type
  page.drawText(`${customer.cartSize}P`, {
    x: 200,
    y: 435,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //vin
  page.drawText('FLA', {
    x: 385,
    y: 435,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //name
  page.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 30,
    y: 308,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //dob
  page.drawText(convertDate(customer.dob).toString(), {
    x: 420,
    y: 285,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //address
  page.drawText(customer.addr1, {
    x: 30,
    y: 262,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //city 
  page.drawText(customer.city, {
    x: 302,
    y: 262,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //state
  page.drawText(customer.state, {
    x: 450,
    y: 262,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //zip
  page.drawText(customer.zip, {
    x: 500,
    y: 262,
    size: 12,
    color: rgb(0, 0, 0),
  });
  // Save the modified PDF to a new file
  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, modifiedPdfBytes);
  console.log('Modified PDF saved!');
}

module.exports = {createPoaPdf}