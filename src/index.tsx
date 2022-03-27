import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const link = createHttpLink({
    uri: 'https://api.github.com/graphql',
    credentials: 'include'
});

const authLink = setContext((_, {headers}) => ({
    headers: {
        ...headers,
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
    }
}));

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
