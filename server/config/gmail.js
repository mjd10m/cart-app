const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

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
            raw: createEmailBody("doughertym727@gmail.com","info@tagmycart.com","New TagMyCart Customer", body),
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
            raw: createEmailBody("doughertym727@gmail.com",userEmail,"Tag My Cart Signup Link", body),
            },
         };
  
        const response = await gmail.users.messages.send(email);
        console.log("Email sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}



  module.exports = {sendEmail, sendSignupEmail}