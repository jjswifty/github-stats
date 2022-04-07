import {gql} from "@apollo/client";

export const GET_ME = gql`
    query Me ($login: String!) {
        user (login: $login) {
            bio
            avatarUrl
            createdAt
            starredRepositories {
                totalCount
            }
            repositories {
                totalCount
            }
        }
    }
`