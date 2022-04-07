import {InMemoryCache} from "@apollo/client";
//import {loginVar} from "@/apollo/queries/variables";
import {IS_LOGGED_IN} from "@/apollo/queries/local/login";
import {storage} from "@/lib/storage";


export const cache = new InMemoryCache({
//    typePolicies: {
//        Query: {
//            fields: {
//                login: {
//                    read () {
//                        return loginVar()
//                    }
//                },
//            }
//        }
//    }
})
cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
        isLoggedIn: !!storage.getItem("login"),
    },
});





