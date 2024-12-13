function newCustomerNotificationBody(customer) {
  return `
    <html>
    <body>
        <p>Hi Mason,</p>

        <p>You have a new submission for 
            <strong>
                ${customer.dealerName === '' ? `${customer.firstName} ${customer.lastName}` : customer.dealerName}
            </strong>
            <br>
            Transaction ID: <strong>${customer.transactionId}</strong>
        </p>

        <p>Bot Mike</p>
    </body>
    </html>
  `
}
function signupEmailBody(url) {
  return `
    <html>
    <body>
      <p>Hi New User,</p>

      <p>You have been granted access to the Tag My Cart admin app.</p>

      <p>Click the link below to access the signup page:</p>
      
      <p><a href="${url}">Signup Here</a></p>

      <p>Bot Mike</p>
    </body>
    </html>
  `
}
function customerActionEmailBody(customer, payUrl) {
  return `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Dear ${customer.dealerName == '' ? (`${customer.firstName} ${customer.lastName}`):(`${customer.dealerName}`)} ,</p>
      <p>I hope this message finds you well. To proceed with your transaction (#${customer.transactionId}), we need you to complete the following steps:</p>
      <ol>
        <li>Print and Sign Form 82053 – ${customer.dealerName == '' ? (`Please print, sign, and mail the physical form to us at`):(`Please have ${customer.firstName} ${customer.lastName} print, sign, and mail the physical form to us at`)}:<br>
            Riverview Auto Tag and Title Service<br>
            7423 US Hwy 301 S<br>
            Riverview, FL 33578</li>
        <li>Complete Payment – Please visit the payment link and complete the payment so that we can initiate the processing of your transaction:<br>
            <a href="${payUrl}">Paypal Payment Link</a></li>
      </ol>
      <p>We are unable to proceed with your transaction until we receive the completed form and payment. Thank you for your prompt attention to this matter.</p>
      <p>Best regards,<br>Mason<br>Riverview Auto Tag and Title Service</p>
    </body>
    </html>
  `
}

module.exports = {newCustomerNotificationBody, signupEmailBody, customerActionEmailBody}