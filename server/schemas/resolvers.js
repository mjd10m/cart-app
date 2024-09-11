const { Customer, File } = require('../models/index')

const resolvers = {
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
                })
            )
        }
    }
}

module.exports= resolvers