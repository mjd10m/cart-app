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
    status: String
    files: [File]
    notes: [Note]
  }
  type File {
    _id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
    transactionId: String!
    createdAt: Date!
  }
  type User {
    _id: ID!
    username: String!
    password: String!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Note {
    _id: ID!
    transactionId: String!
    noteText: String!
  }
  type Query {
    listCustomers: [Customer]
    listFiles: [File]
    validateSignupToken(token: String!): Boolean
    listNotes: [Note]
  }
  type Mutation {
    addCustomer(transactionId: String!, firstName: String!, lastName: String!, dob: Date!, addr1: String!, addr2: String, city: String!, state: String!, zip: String!, email: String!, phone: String!, cartSize: String!, cartColor: String!, plate: String!, plateNum: String, plateType: String, dealerName: String, status: String): Customer
    uploadFiles(files: [Upload!]!, transactionId: String!): [File!]!
    getSignedUrls(fileName: [String!]!): [String!]!
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    signup(email: String!): String!
    updateCustomer(transactionId: String!, firstName: String!, lastName: String!, dob: Date!, addr1: String!, addr2: String, city: String!, state: String!, zip: String!, email: String!, phone: String!, cartSize: String!, cartColor: String!, plate: String!, plateNum: String, plateType: String, dealerName: String, status: String): Customer
    addNote(transactionId: String!, noteText: String!): Note
    deleteNote(_id: ID!): Note
    updateNote(_id: ID!, noteText: String): Note
  }
`;

module.exports = typeDefs