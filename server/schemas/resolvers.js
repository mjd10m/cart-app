const { Customer } = require('../models/index').default

const resolvers = {
    Query: {
        listCustomers: async () => {
            return Customer.find()
            .select('-__v')
        }
    },
    Mutation: {
        addCustomer: async (parent, args) => {
            console.log(args)
            try {
                const customer = await Customer.create({ ...args });
                console.log(customer);
                return {customer};
            } catch (error) {
                console.error('Error creating customer:', error);
                throw new Error('Failed to create customer');
            }
        }
    }
}