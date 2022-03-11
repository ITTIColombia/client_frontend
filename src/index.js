import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {IntlProvider} from "react-intl";
import es from './Dictionaries/es.json'
import en from './Dictionaries/en.json'

let userLang = navigator.language || navigator.userLanguage;
const messages = userLang.startsWith('en')? en: userLang.startsWith('es')? es: en

ReactDOM.render(
    <IntlProvider locale={userLang} messages={messages}>
        <App/>
    </IntlProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
