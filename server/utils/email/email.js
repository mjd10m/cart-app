const { google } = require("googleapis");
const fs = require('fs')
const {newCustomerNotificationBody, signupEmailBody, customerActionEmailBody} = require('./email-body')
const {oAuth2Client} = require('../../config/gmail')
const {getPaymentUrl} = require('../helper')

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

// Helper function to create email
function createEmailBody(from, to, subject, body) {
  const message = `From: ${from.trim()}\r\nTo: ${to.trim()}\r\nSubject: ${subject}\r\nContent-Type: text/html; charset="UTF-8"\r\n\r\n${body}`;
  return Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

//Helper function to create email with attachment
function createEmailBodyAttachment(from, to, subject, body, attachments) {
  const boundary = "boundary_string";
  let message = [
    `From: ${from.trim()}`,
    `To: ${to.trim()}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    `${body}`,
    ``,
  ].join("\r\n");
  attachments.forEach(({path, filename}) => {
    const attachmentData = fs.readFileSync(path).toString("base64");
    message += [
      `--${boundary}`,
      `Content-Type: application/pdf; name="${filename}"`, // Change to the correct MIME type if not a PDF
      `Content-Disposition: attachment; filename="${filename}"`, // This ensures the file is an attachment
      `Content-Transfer-Encoding: base64`,
      ``,
      `${attachmentData}`,
      ``,
    ].join("\r\n") 
  });
  message += `--${boundary}--`

  return Buffer.from(message)
  .toString("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
}

async function sendNewCustomerNotificationEmail(customer, pdfPath) {
  try {
    const body = newCustomerNotificationBody(customer)
    const email = {
      userId: "me",
      requestBody: {
      raw: createEmailBodyAttachment("info@tagmycart.com","info@tagmycart.com","New TagMyCart Customer", body,[{path: pdfPath[0], filename:`${customer.lastName} 82040.pdf`}, {path: pdfPath[1], filename:`${customer.lastName} 84491.pdf`}, {path: pdfPath[2], filename:`${customer.lastName} 84490.pdf`},{path: pdfPath[3], filename:`${customer.lastName} 86064.pdf`}]),
      },
    };
    const response = await gmail.users.messages.send(email);
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function sendSignupEmail(userEmail, url) {
  try {
    const body = signupEmailBody(url)
    const email = {
        userId: "me",
        requestBody: {
        raw: createEmailBody("info@tagmycart.com",userEmail,"Tag My Cart Signup Link", body),
        },
      };
      const response = await gmail.users.messages.send(email);
      console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function customerActionEmail(customer, pdfPath) {
  try {
    const payUrl = getPaymentUrl(customer.plate, customer.dealerName)
    const body = customerActionEmailBody(customer, payUrl)
    const email = {
        userId: "me",
        requestBody: {
        raw: createEmailBodyAttachment("info@tagmycart.com",customer.email,`Action Required: Transaction #${customer.transactionId} - Form 82053 and Payment Needed`, body, [{path: pdfPath, filename:`${customer.lastName} POA.pdf`}]),
        },
      };
      const response = await gmail.users.messages.send(email);
      console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {sendNewCustomerNotificationEmail, sendSignupEmail, customerActionEmail}