import { ChangeEvent, FC, useEffect, useState } from "react";
import {storage} from "@/lib/storage";
import {cache} from "@/apollo/cache";
import {IS_LOGGED_IN} from "@/apollo/queries/local/login";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";


export const AuthPage: FC = () => {

    const navigate = useNavigate()
    const { data } = useQuery(IS_LOGGED_IN)
    const isAuth = data?.isLoggedIn

    useEffect(() => {
        if (isAuth) navigate("/profile")
    }, [isAuth, navigate])

    const [login, setLogin] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    }

    const buttonHandler = (): void => {
        storage.setItem("login", login)
        cache.updateQuery({
            query: IS_LOGGED_IN,
        }, () => ({
            isLoggedIn: true
        }))
    }

    return (
        <div>
            Type your login on GitHub:
            <input type="text" value={login} onChange={(e) => inputHandler(e)}/>
            <button onClick={buttonHandler} disabled={login.length === 0}>OK</button>
        </div>
    )
}