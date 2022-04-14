import { ChangeEvent, FC, useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { cache } from "@/apollo/cache";
import { IS_LOGGED_IN } from "@/apollo/queries/local/login";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "@/apollo/queries/local/__generated__/isUserLoggedIn";
import { isUserExists, isUserExistsVariables } from "@/apollo/queries/__generated__/isUserExists";
import { IS_USER_EXISTS } from "@/apollo/queries/isUserExists";


export const AuthPage: FC = () => {

    const navigate = useNavigate()
    const { data: isUserLoggedInData } = useQuery<isUserLoggedIn>(IS_LOGGED_IN)
    const isAuth = isUserLoggedInData?.isLoggedIn

    useEffect(() => {
        if (isAuth) navigate("/profile")
    }, [isAuth, navigate])

    const [login, setLogin] = useState<string>('')
    const [isLoginTooLong, setIsLoginTooLong] = useState<boolean>(false)
    const [incorrectLoginStatus, setIncorrectLoginStatus] = useState<boolean>()
    const [getIsLoginCorrect] = useLazyQuery<
        isUserExists,
        isUserExistsVariables
        >(IS_USER_EXISTS, {
        onCompleted: data => {
            if (!data.user) return
            storage.setItem("login", login)
            cache.updateQuery({
                query: IS_LOGGED_IN,
            }, () => ({
                isLoggedIn: true
            }))
            setIncorrectLoginStatus(false)
        },
        onError: data => {
            setIncorrectLoginStatus(true)
            setLogin('')
        },

    })
    console.log('render')
    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value.length < 39) {
            setLogin(e.target.value)
            setIsLoginTooLong(false)
        }
        else setIsLoginTooLong(true)
    }

    const buttonHandler = async () => {
        await getIsLoginCorrect({
            variables: {
                login,
            },
        })
    }

    return (
        <div className="flex flex-col justify-center space-y-1.5">
            {incorrectLoginStatus ?
                <span>We can't detect any profile with this username. Try another.</span>
            : <p>Type your login on GitHub:</p>}
            <input
                className="bg-main border-2 border-rose-900"
                type="text"
                value={login}
                onChange={(e) => inputHandler(e)}
            />
            <button
                onClick={buttonHandler}
                disabled={login.length === 0}
                className="border-2 cursor-pointer border-rose-900"
            >
                OK
            </button>
        </div>
    )
}