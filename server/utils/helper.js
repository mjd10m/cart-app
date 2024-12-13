function getPaymentUrl(urlType, dealer) {
  if (dealer =='') {
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
  } else {
    switch(urlType){
      case "newPlate":
        return 'https://www.paypal.com/ncp/payment/9VNCEDWFXL4G2'
      case "plateTransfer":
        return 'https://www.paypal.com/ncp/payment/9K9VFCWCH92YA'
      case "specPlate":
        return 'https://www.paypal.com/ncp/payment/NY4292MPZN3YA'
      case "perPlate":
        return 'https://www.paypal.com/ncp/payment/4H98QSMUKHJJL'
      case "perSpecPlate":
        return 'https://www.paypal.com/ncp/payment/WUZAB5SFPRXNG'
    } 
  }
}

function convertDate(date) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-us',{year:"numeric", month:"2-digit", day:"2-digit", timeZone: "UTC"})
}

module.exports = {getPaymentUrl, convertDate}