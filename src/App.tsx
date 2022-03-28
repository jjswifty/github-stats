import React from 'react';
import {useMeQuery} from "./generated/graphql";


const App = () => {

    const { data } = useMeQuery({
        variables: {
            login: "jjswifty"
        }
    })

    console.log(data)

    return <div className="App">

    </div>
};

export default App;
