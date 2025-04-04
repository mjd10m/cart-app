import {gql} from '@apollo/client'

export const ADD_CUSTOMER = gql `
    mutation Mutation($transactionId: String!, $firstName: String!, $lastName: String!, $dob: Date!, $addr1: String!, $city: String!, $state: String!, $zip: String!, $email: String!, $phone: String!, $cartSize: String!, $cartColor: String!, $plate: String!, $addr2: String, $plateNum: String, $plateType: String, $dealerName: String, $status: String) {
        addCustomer(transactionId: $transactionId, firstName: $firstName, lastName: $lastName, dob: $dob, addr1: $addr1, city: $city, state: $state, zip: $zip, email: $email, phone: $phone, cartSize: $cartSize, cartColor: $cartColor, plate: $plate, addr2: $addr2, plateNum: $plateNum, plateType: $plateType, dealerName: $dealerName, status: $status) {
            firstName
            lastName
        }
    }
`
export const UPLOAD_FILE = gql `
    mutation Mutation($files: [Upload!]!, $transactionId: String!) {
        uploadFiles(files: $files, transactionId: $transactionId) {
            filename
            url
            transactionId
            createdAt
        }
    }
`
export const GET_SIGNED_URLS = gql `
    mutation Mutation($fileName: [String!]!) {
        getSignedUrls(fileName: $fileName)
}
`
export const ADD_USER = gql `
    mutation AddUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            token
            user {
                username
            }
        }
    }
`
export const LOGIN = gql `
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                username
            }
        }
    }
`
export const SIGNUP = gql `
    mutation Mutation($email: String!) {
        signup(email: $email)
    }
`
export const UPDATE_CUSTOMER = gql `
    mutation UpdateCustomer($transactionId: String!, $firstName: String!, $lastName: String!, $dob: Date!, $addr1: String!, $city: String!, $state: String!, $zip: String!, $email: String!, $phone: String!, $cartSize: String!, $cartColor: String!, $plate: String!, $addr2: String, $plateNum: String, $plateType: String, $dealerName: String, $status: String) {
        updateCustomer(transactionId: $transactionId, firstName: $firstName, lastName: $lastName, dob: $dob, addr1: $addr1, city: $city, state: $state, zip: $zip, email: $email, phone: $phone, cartSize: $cartSize, cartColor: $cartColor, plate: $plate, addr2: $addr2, plateNum: $plateNum, plateType: $plateType, dealerName: $dealerName, status: $status) {
            firstName
            lastName
        }
    }
`
export const ADD_NOTE = gql `
    mutation AddNote($transactionId: String!, $noteText: String!) {
        addNote(transactionId: $transactionId, noteText: $noteText) {
            _id
            noteText
            transactionId
        }
    }
`
export const DELETE_NOTE = gql `
    mutation DeleteNote($_id: ID!) {
        deleteNote(_id: $_id) {
            _id
            noteText
            transactionId
        }
    }
`
export const UPDATE_NOTE = gql`
  mutation UpdateNote($_id: ID!, $noteText: String!) {
    updateNote(_id: $_id, noteText: $noteText) {
      _id
      noteText
    }
  }
`;