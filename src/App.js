import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import Home from "./Pages/Home/Home";
import Artisans from "./Pages/Artisans/Artisans";
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import ArtisanDetail from "./Pages/ArtisanDetail/ArtisanDetail";
import AboutUs from './Pages/AboutUs/AboutUs';
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import AppContext from "./AppContext";
import {IntlProvider} from "react-intl";
import en from "./Dictionaries/en.json";
import es from "./Dictionaries/es.json";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("itti-user") || '{}'));

  const [languageSettings, setLanguageSettings] = useState({
    messages:navigator.language.startsWith("es")? es: en,
    locale:navigator.language
  });

  function login(user){
    localStorage.setItem("itti-user", JSON.stringify(user))
    setUser(user);
  }

  function logout(){
    localStorage.removeItem("itti-user")
    setUser({});
  }


  function setLang(lang){
    let finalLang = lang;
    if(lang.startsWith(navigator.language.slice(0,2))){
      finalLang = navigator.language;
    }
    let messages = finalLang.startsWith("es")? es: en;
    setLanguageSettings({messages: messages, locale: finalLang})
  }

  return (

      <div className="App">
        <AppContext.Provider value={{user, login, logout, languageSettings, setLang}}>
          <IntlProvider locale={languageSettings.locale} messages={languageSettings.messages}>
            <BrowserRouter>
              <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/artesanos" exact element={<Artisans/>}/>
                <Route path="/productos" exact element={<ProductsPage/>}/>
                <Route path="/productos/:_id" exact element={<ProductDetail/>}/>
                <Route path="/artesanos/:_id" exact element={<ArtisanDetail/>}/>
                <Route path="/nosotros" exact element={<AboutUs/>}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/signup" exact element={<SignUp/>}/>
              </Routes>
            </BrowserRouter>
          </IntlProvider>
        </AppContext.Provider>
      </div>

  );
}

export default App;
