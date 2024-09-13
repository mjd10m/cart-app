const { Customer, File } = require('../models/index');
const bucket = require('../config/gcloud')
const {GraphQLUpload} = require("graphql-upload")


const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        listCustomers: async () => {
            return Customer.find()
            .select('-__v')
        },
        listFiles: async() => {
            return File.find()
            .select('-__v')
        }
    },
    Mutation: {
        addCustomer: async (parent, args) => {
            console.log(args)
            try {
                const customer = await Customer.create({ ...args });
                console.log(customer);
                return customer;
            } catch (error) {
                console.error('Error creating customer:', error);
                throw new Error('Failed to create customer');
            }
        },
        uploadFiles: async (parent,{files, transactionId}) => {
            console.log(transactionId)            
            const uploadedFiles = await Promise.all(
                files.map(async file => {
                    const {createReadStream, filename, mimetype, encoding} = await file
                    const blob = bucket.file(filename)
                    const blobStream = blob.createWriteStream({
                        resumable:false
                    })

                    return new Promise((resolve, reject) => {
                        createReadStream()
                        .pipe(blobStream)
                        .on('finish', async () => {
                            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`
                            console.log(transactionId) 
                            const savedFile = await File.create({
                                filename,
                                mimetype,
                                encoding,
                                url: publicUrl,
                                transactionId
                              });
                              console.log('Saved file:', savedFile)
                            resolve({
                                filename,
                                mimetype,
                                encoding,
                                url: publicUrl,
                                transactionId: savedFile.transactionId,
                                createdAt: savedFile.createdAt
                            })
                        })
                        .on ('error', (err) => reject(err))
                    })
                })
            )
            return uploadedFiles
        }
    }
}

module.exports= resolvers