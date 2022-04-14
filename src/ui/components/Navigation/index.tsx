import { cache } from "@/apollo/cache";
import { IS_LOGGED_IN } from "@/apollo/queries/local/login";
import { isUserLoggedIn } from "@/apollo/queries/local/__generated__/isUserLoggedIn";
import { storage } from "@/lib/storage";

export const Navigation = () => {

    const logOutHandler = () => {
        cache.updateQuery<isUserLoggedIn>({
            query: IS_LOGGED_IN,
        }, () => ({
            isLoggedIn: false
        }))
        storage.removeItem("login")
    }

    return (
        <div className="absolute top-[15px] right-[15px]">
            <button onClick={logOutHandler}>Log out</button>
        </div>
    )
}