import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider domain="aniketkulkarni.us.auth0.com"
        clientId="9yYWQaFFmOhGbBy9CDJ7fhKLCoIpIfoS"
        redirectUri="http://localhost:3000/all-notes"
        >
        <App />
    </Auth0Provider>
    , document.getElementById("root")
);