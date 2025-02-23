const {PDFDocument, rgb} = require('pdf-lib')
const fs = require('fs')

async function createChecklistPdf(existingPdfPath, outputPdfPath, customer) {
  const today = new Date()
  const year = today.getFullYear()
  const day = today.getDate()
  const month = today.getMonth() + 1

  const existingPdfBytes = fs.readFileSync(existingPdfPath);
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes,{ ignoreEncryption: true });
  const page1 = pdfDoc.getPages()[0];

   //today date
   page1.drawText(`${month.toString()}/${day.toString()}/${year.toString()}`, {
    x: 45,
    y: 530,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //name
  page1.drawText(`${customer.firstName} ${customer.lastName}`, {
    x: 152,
    y: 605,
    size: 12,
    color: rgb(0, 0, 0),
  });
  //transaction id
  page1.drawText(customer.transactionId, {
    x: 455,
    y: 605,
    size: 12,
    color: rgb(0, 0, 0),
  });
  
  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, modifiedPdfBytes);
}

module.exports = {createChecklistPdf}