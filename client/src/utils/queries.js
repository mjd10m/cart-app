import {gql} from '@apollo/client'

export const QUERY_CUSTOMERS = gql`
    query Query {
        listCustomers {
            _id
            transactionId
            firstName
            lastName
            dob
            addr1
            addr2
            city
            state
            zip
            email
            phone
            cartSize
            cartColor
            plate
            plateNum
            plateType
            dealerName
            createdAt
            status
            files {
                url
                filename
                createdAt
                encoding
                mimetype
                transactionId
            }
            notes {
                _id
                transactionId
                noteText
            }
        }
    }
`
export const QUERY_FILES = gql `
    query ListFiles {
        listFiles {
            filename
            mimetype
            encoding
            url
            createdAt
        }
    }
`
export const VALIDATE_SIGNUP_TOKEN = gql `
    query validateSignupToken($token: String!) {
        validateSignupToken(token: $token)
    }
`