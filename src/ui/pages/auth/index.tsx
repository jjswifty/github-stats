import { ChangeEvent, FC, useEffect, useState } from "react";
import {storage} from "@/lib/storage";
import {cache} from "@/apollo/cache";
import {IS_LOGGED_IN} from "@/apollo/queries/local/login";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "@/apollo/queries/local/__generated__/isUserLoggedIn";
import { isUserExists, isUserExistsVariables } from "@/apollo/queries/__generated__/isUserExists";
import { IS_USER_EXISTS } from "@/apollo/queries/isUserExists";


export const AuthPage: FC = () => {

    const navigate = useNavigate()
    const { data } = useQuery<isUserLoggedIn>(IS_LOGGED_IN)
    const isAuth = data?.isLoggedIn

    useEffect(() => {
        if (isAuth) navigate("/profile")
    }, [isAuth, navigate])

    const [login, setLogin] = useState<string>('')

    const [getIsLoginCorrect, { data: isLoginCorrectData }] = useLazyQuery<
        isUserExists,
        isUserExistsVariables
    >(IS_USER_EXISTS, {
        variables: {
            login,
        },
        onCompleted: data => {
            if (data.user?.login) {
                storage.setItem("login", login)
                cache.updateQuery({
                    query: IS_LOGGED_IN,
                }, () => ({
                    isLoggedIn: true
                }))
            }
        }
    })

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLogin(e.target.value)
    }

    const buttonHandler = async () => {
        await getIsLoginCorrect()
    }

    return (
        <div>
            {!!isLoginCorrectData?.user?.login && <span>Не существует GitHub аккаунта с таким логином. Введите другой.</span>}
            Type your login on GitHub:
            <input type="text" value={login} onChange={(e) => inputHandler(e)}/>
            <button onClick={buttonHandler} disabled={login.length === 0}>OK</button>
        </div>
    )
}