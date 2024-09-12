const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Customer {
        _id: ID!
        transactionId: String!
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
        plateType: String
    }
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
    }
    type Query {
        listCustomers: [Customer]
        listFiles: [File]
    }
    type Mutation {
        addCustomer(firstName: String!, lastName: String!, dob: String!, addr1: String!, addr2: String, city: String!, state: String!, zip: String!, email: String!, phone: String!, cartSize: String!, cartColor: String!, plate: String!, plateNum: String): Customer
        uploadFiles(files: [Upload!]!): [File!]!
    }
`;

module.exports = typeDefs