import {gql} from "@apollo/client";

//export const GET_LOGIN = gql`
//    query GetLogin {
//        login @client {
//            name
//            date
//        }
//    }
//`

export const IS_LOGGED_IN = gql`
    query isUserLoggedIn {
        isLoggedIn @client
    }   
`