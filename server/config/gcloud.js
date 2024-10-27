const {Storage} = require('@google-cloud/storage') 
const path = require('path')


const gc = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n') : ''
    }
  })

const bucket = gc.bucket(process.env.GCP_BUCKET_ID)

module.exports = bucket