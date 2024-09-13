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
            createdAt
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