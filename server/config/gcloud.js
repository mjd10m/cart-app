const {Storage} = require('@google-cloud/storage') 
const path = require('path')

const gc = new Storage({
    keyFilename: path.join(__dirname,"./orbital-stage-423917-i7-2f18fb5b78cb"),
    projectId: 'tag-my-cart'
  })
  
const bucket = gc.bucket('cart-app-storage')

module.exports = bucket