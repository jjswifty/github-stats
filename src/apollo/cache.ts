import {InMemoryCache} from "@apollo/client";
import {loginVar} from "@/apollo/queries/variables";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                login: {
                    read () {
                        return loginVar()
                    }
                },
            }
        }
    }
})
