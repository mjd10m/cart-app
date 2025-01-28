const { Customer, File, User, Note } = require('../models/index');
const bucket = require('../config/gcloud')
const {GraphQLUpload} = require("graphql-upload")
const { signToken, signupToken, checkSignupToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { createPoaPdf } = require('../utils/pdf');
const {sendNewCustomerNotificationEmail, sendSignupEmail, customerActionEmail} = require('../utils/email/email')


const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    listCustomers: async () => {
      return Customer.find()
      .sort({createdAt: -1})
      .select('-__v')
      .populate('files')
      .populate('notes')
    },
    listFiles: async() => {
      return File.find()
      .select('-__v')
    },
    listNotes: async() => {
      return Note.find()
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
        await createPoaPdf('./utils/pdfs/82053.pdf', `/tmp/${customer.lastName}82053.pdf`,customer)
        await sendNewCustomerNotificationEmail(customer)
        await customerActionEmail(customer, `/tmp/${customer.lastName}82053.pdf`)
        return customer;
      } catch (error) {
        console.error('Error creating customer:', error);
        throw new Error('Failed to create customer');
      }
    },
    updateCustomer: async (parent, args) => {
      const customerId = args.transactionId
      try {
        return await Customer.findOneAndUpdate({transactionId: customerId}, args, { new: true });
      } catch (error) {
        console.error('Error updating customer:', error);
        throw new Error('Failed to update customer');
      }
    },
    signup: async (parent, {email}) => {
      const token = signupToken(email)
      const url = `https://tagmycart.com/signup?token=${token}`
      sendSignupEmail(email, url)
      return url
    },
    addUser: async (parent, args) => {
      const user = await User.create({username: args.username, password: args.password});
      const token = signToken(user);
      return { token, user };
    },
    addNote: async (parent, args) => {
      const note = await Note.create({...args})
      return note
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    getSignedUrls: async (parent,{fileName}) => {
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