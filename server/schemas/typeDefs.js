const {gql} = require('apollo-server-express')

const typeDefs = gql`
  scalar Upload
  scalar Date
  type Customer {
    _id: ID!
    transactionId: String!
    firstName: String!
    lastName: String!
    dob: Date!
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
    dealerName: String
    createdAt: Date!
    files: [File]
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
    transactionId: String!
    createdAt: Date!
  }
  type User {
    username: String!
    password: String!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    listCustomers: [Customer]
    listFiles: [File]
    validateSignupToken(token: String!): Boolean
  }
  type Mutation {
    addCustomer(transactionId: String!, firstName: String!, lastName: String!, dob: Date!, addr1: String!, addr2: String, city: String!, state: String!, zip: String!, email: String!, phone: String!, cartSize: String!, cartColor: String!, plate: String!, plateNum: String, plateType: String, dealerName: String): Customer
    uploadFiles(files: [Upload!]!, transactionId: String!): [File!]!
    getSignedUrls(fileName: [String!]!): [String!]!
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    signup(email: String!): String!
  }
`;

module.exports = typeDefs