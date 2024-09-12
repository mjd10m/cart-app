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
        uploadFiles: async (parent,{args}) => {
            const uploadedFiles = await Promise.all(
                args.map(async file => {
                    const {createReadStream, filename, mimetype, encoding, transactionId} = await file
                    const blob = bucket.file(filename)
                    const blobStream = blob.createWriteStream({
                        resumable:false
                    })

                    return new Promise((resolve, reject) => {
                        createReadStream()
                        .pipe(blobStream)
                        .on('finish', async () => {
                            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`

                            const newFile = new File({
                                filename,
                                mimetype,
                                encoding,
                                url: publicUrl,
                                transactionId: transactionId
                              });
                              await newFile.save();

                            resolve({
                                filename,
                                mimetype,
                                encoding,
                                url: publicUrl
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