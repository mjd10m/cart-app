const { google } = require("googleapis");
const fs = require('fs')

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

function getPayUrl(urlType) {
  switch(urlType){
    case "newPlate":
      return 'https://www.paypal.com/ncp/payment/VYD5DG9GLQ8JL'
    case "plateTransfer":
      return 'https://www.paypal.com/ncp/payment/V2E7KELWY9WQY'
    case "specPlate":
      return 'https://www.paypal.com/ncp/payment/XNH8C7PQMK78Q'
    case "perPlate":
      return 'https://www.paypal.com/ncp/payment/36LX2LSAT5TTA'
    case "perSpecPlate":
      return 'https://www.paypal.com/ncp/payment/TQQ9R2Q3YQ5EG'
  }  
}

async function sendEmail(customer) {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const body = `
Hi Mason
    
    You have a new submission for ${customer.firstName} ${customer.lastName} transaction ID: ${customer.transactionId}
    
Bot Mike`
    const email = {
      userId: "me",
      requestBody: {
      raw: createEmailBody("info@tagmycart.com","info@tagmycart.com","New TagMyCart Customer", body),
      },
    };
    const response = await gmail.users.messages.send(email);
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
  
  // Helper function to create email body (base64 encoded for Gmail API)
function createEmailBody(from, to, subject, body) {
  const message = `From: ${from.trim()}\r\nTo: ${to.trim()}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset="UTF-8"\r\n\r\n${body}`;
  return Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function createEmailBodyAttachment(from, to, subject, body, attachmentPath, attachmentFileName) {
  const attachmentData = fs.readFileSync(attachmentPath).toString("base64");
  const boundary = "boundary_string";
  const message = [
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
    `--${boundary}`,
    `Content-Type: application/pdf; name="${attachmentFileName}"`, // Change to the correct MIME type if not a PDF
    `Content-Disposition: attachment; filename="${attachmentFileName}"`, // This ensures the file is an attachment
    `Content-Transfer-Encoding: base64`,
    ``,
    `${attachmentData}`,
    ``,
    `--${boundary}--`,
  ].join("\r\n");
  return Buffer.from(message)
  .toString("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
}

async function sendSignupEmail(userEmail, url) {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const body = `
Hi New User
    
    You have been granted access to the Tag My Cart admin app.
    Click the link below to access your page:
    ${url}
    
Bot Mike`
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

async function sendSuccessEmail(customer, pdfPath) {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const payUrl = getPayUrl(customer.plate)
    const body = `
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <p>Dear ${customer.firstName} ${customer.lastName},</p>
    <p>I hope this message finds you well. To proceed with your transaction (#${customer.transactionId}), we need you to complete the following steps:</p>
    <ol>
      <li>Print and Sign Form 82053 – Please print, sign, and mail the physical form to us at:<br>
          Riverview Auto Tag and Title Service<br>
          7423 US Hwy 301 S<br>
          Riverview, FL 33578</li>
      <li>Complete Payment – Please visit the payment link and complete the payment so that we can initiate the processing of your transaction:<br>
          <a href="${payUrl}">Paypal Payment Link</a></li>
    </ol>
    <p>We are unable to proceed with your transaction until we receive the completed form and payment. Thank you for your prompt attention to this matter.</p>
    <p>Best regards,<br>Mason<br>Riverview Auto Tag and Title Service</p>
  </body>
</html>`
    const email = {
        userId: "me",
        requestBody: {
        raw: createEmailBodyAttachment("info@tagmycart.com",customer.email,`Action Required: Transaction #${customer.transactionId} - Form 82053 and Payment Needed`, body, pdfPath, `${customer.lastName} POA.pdf`),
        },
      };
      const response = await gmail.users.messages.send(email);
      console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}



  module.exports = {sendEmail, sendSignupEmail, sendSuccessEmail}