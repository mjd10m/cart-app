const { Customer, File, User } = require('../models/index');
const bucket = require('../config/gcloud')
const {GraphQLUpload} = require("graphql-upload")
const { sendEmail, sendSignupEmail } = require("../config/gmail")
const { signToken, signupToken, checkSignupToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        listCustomers: async () => {
            return Customer.find()
            .sort({createdAt: -1})
            .select('-__v')
            .populate('files')
        },
        listFiles: async() => {
            return File.find()
            .select('-__v')
        },
        // findCustomer: async () => {
        //     return Customer.findOne()
        //     .select('-__v')
        //     .populate('files')
        // }
        validateSignupToken: (parent, {token}) => {
            return checkSignupToken(token)
        }
    },
    Mutation: {
        addCustomer: async (parent, args) => {
            console.log(args)
            try {
                const customer = await Customer.create({ ...args });
                console.log(customer);
                sendEmail(customer)
                return customer;
            } catch (error) {
                console.error('Error creating customer:', error);
                throw new Error('Failed to create customer');
            }
        },
        signup: async (parent, {email}) => {
            const token = signupToken(email)
            const url = `http://localhost:5173/signup?token=${token}`
            sendSignupEmail(email, url)
            return url
        },
        addUser: async (parent, args) => {
            const user = await User.create({username: args.username, password: args.password});
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
            throw new AuthenticationError('incorrect credentials');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw new AuthenticationError('incorrect credentials');
        }
        const token = signToken(user);
        return { token, user };
        },
        getSignedUrls: async (parent,{fileName}) => {
            console.log("In Server")
            const expires = Date.now() + 120000;
            const signedUrls = await Promise.all(
                fileName.map(async(file) => {
                    const [url] = await bucket
                        .file(file)
                        .getSignedUrl({
                            action: 'read',
                            expires,
                        })
                    return url
                })
            )
            return signedUrls
        },
        uploadFiles: async (parent,{files, transactionId}) => {
            console.log(transactionId)            
            const uploadedFiles = await Promise.all(
                files.map(async file => {
                    const {createReadStream, filename, mimetype, encoding} = await file
                    const blob = bucket.file(filename)
                    const blobStream = blob.createWriteStream({
                        resumable:true,
                        contentType: mimetype,
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