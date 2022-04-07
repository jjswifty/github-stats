import { gql } from "@apollo/client";

export const IS_USER_EXISTS = gql`
    query isUserExists ($login: String!) {
        user(login: $login) {
            login
        }
    }
`