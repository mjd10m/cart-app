import {gql} from '@apollo/client'

export const ADD_CUSTOMER = gql `
    mutation Mutation($transactionId: String!, $firstName: String!, $lastName: String!, $dob: Date!, $addr1: String!, $city: String!, $state: String!, $zip: String!, $email: String!, $phone: String!, $cartSize: String!, $cartColor: String!, $plate: String!, $addr2: String, $plateNum: String, $plateType: String) {
        addCustomer(transactionId: $transactionId, firstName: $firstName, lastName: $lastName, dob: $dob, addr1: $addr1, city: $city, state: $state, zip: $zip, email: $email, phone: $phone, cartSize: $cartSize, cartColor: $cartColor, plate: $plate, addr2: $addr2, plateNum: $plateNum, plateType: $plateType) {
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