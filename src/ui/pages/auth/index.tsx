import {ChangeEvent, FC, useState} from "react";
import {loginVar} from "@/apollo/queries/variables";


export const AuthPage: FC = () => {

    const [login, setLogin] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    }

    const buttonHandler = async () => {
        const loginObj = {
            name: login,
            date: Date.now().toString()
        }
        loginVar(loginObj)
        localStorage.setItem("login", JSON.stringify(loginObj))
    }

    return (
        <div>
            Type your login on GitHub:
            <input type="text" value={login} onChange={(e) => inputHandler(e)}/>
            <button onClick={buttonHandler} disabled={login.length === 0}>OK</button>
        </div>
    )
}