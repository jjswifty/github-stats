import {makeVar} from "@apollo/client";

interface Login {
    name: string
    date: string
}

const loginInitialValue: Login = {
    name: '',
    date: '',
}

export const loginVar = makeVar(loginInitialValue)
