import {gql} from "@apollo/client";

export const GET_LOGIN = gql`
    query GetLogin { 
        login @client {
            name
            date
        }
    }
`