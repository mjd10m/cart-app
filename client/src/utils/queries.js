import {gql} from '@apollo/client'

export const QUERY_CUSTOMERS = gql`
    query Query {
        listCustomers {
            _id
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
        }
    }
`