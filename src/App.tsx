import React from 'react';
import {AuthPage} from "@/ui/pages/auth";
import {useQuery} from "@apollo/client";
import {GET_LOGIN} from "@/apollo/queries/local/login";
import {GetLogin} from "@/apollo/queries/local/__generated__/GetLogin";


const App = () => {
    const { data } = useQuery<GetLogin>(GET_LOGIN)
    const login = data?.login.name

    return <div className="App">
        {login ? <div>Ваш логин: {login}</div> : <AuthPage/>}
    </div>
};

export default App;
