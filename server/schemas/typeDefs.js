const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Customer {
        _id: ID!
        firstName: String!
        lastName: String!
        dob: String!
        addr1: String!
        addr2: String
        city: String!
        state: String!
        zip: String!
        email: String!
        phone: String!
        cartSize: String!
        cartColor: String!
        plate: String!
        plateNum: String
    }
    type Query {
        listCustomers: [Customer]
    }
    type Mutation {
        addCustomer(firstName: String!, lastName: String!, dob: String!, addr1: String!, addr2: String, city: String!, state: String!, zip: String!, email: String!, phone: String!, cartSize: String!, cartColor: String!, plate: String!, plateNum: String): Customer
    }
`;

module.exports = typeDefs