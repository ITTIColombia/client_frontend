import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home/Home";
import Artisans from "./Pages/Artisans/Artisans";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import ArtisanDetail from "./Pages/ArtisanDetail/ArtisanDetail";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import AppContext from "./AppContext";
import { IntlProvider } from "react-intl";
import en from "./Dictionaries/en.json";
import es from "./Dictionaries/es.json";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import { useAlert } from "react-alert";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const defaultCart = {
  items: [],
  totalPrice:0
}

/*const defaultLanguage = {
  messages: navigator.language.startsWith("es") ? es : en,
  locale: navigator.language,
}*/

function App() {
  const alert = useAlert()

  // stablish default cart at navigator's storage (if not previously existent)
  let storedCart = JSON.parse(localStorage.getItem('cart'));
  if (!storedCart) {
    localStorage.setItem('cart', JSON.stringify(defaultCart));
    storedCart = defaultCart;
  }

  const [cart, setCart] = useState(storedCart);

  const addToCart = (product, showAlert = false) => {
    
      const updatedCart = { ...cart };
      const itemAlreadyInCart = updatedCart.items.find(
        (i) => i.product._id === product._id
      );
      if (itemAlreadyInCart) {
        itemAlreadyInCart.quantity += 1;
      } else {
        updatedCart.items.push({
          product:product, 
          quantity: 1,
        });
      }
      updatedCart.totalPrice += parseInt(product.price);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);

      if (showAlert) {
        alert.show(product.name + languageSettings.messages.AddedToCart);
      }
}

  const substractToCart = (product) => {
      const updatedCart = { ...cart };
      const itemAlreadyInCart = updatedCart.items.find(
        (i) => i.product._id === product._id
      );
      if (itemAlreadyInCart) {
        itemAlreadyInCart.quantity -= 1;
        if (itemAlreadyInCart.quantity === 0) {
          updatedCart.items = updatedCart.items.filter(
            (i) => i.product._id !== product._id
          );
        }
      }
      updatedCart.totalPrice -= parseInt(product.price);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
  }

  const removeFromCart = (product) => {
    setCart((previousCart) => {
      const updatedCart = { ...previousCart };
      const itemAlreadyInCart = updatedCart.items.find(
        (i) => i.product._id === product._id
      );
      if (itemAlreadyInCart) {
        updatedCart.items = updatedCart.items.filter(
          (i) => i.product._id !== product._id
        );
      }
      updatedCart.totalPrice -= parseInt(product.price) * itemAlreadyInCart.quantity;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  const clearCart = () => {
    setCart({
      items: [],
      totalPrice: 0,
    });
    localStorage.setItem('cart', JSON.stringify(defaultCart));
  }

  // stablish default language at navigator's storage (if not previously existent)
  let storedLanguage = localStorage.getItem('language');
  if (!storedLanguage) {
    localStorage.setItem('language', navigator.language);
    storedLanguage = navigator.language;
  }

  const [languageSettings, setLanguageSettings] = useState({ messages: storedLanguage.startsWith("es") ? es : en, locale: storedLanguage });

  function setLang(lang) {
    const updatedLang = { messages: undefined, locale: lang };
    if (lang.startsWith(navigator.language.slice(0, 2))) {
      updatedLang.locale = navigator.language;
    }
    updatedLang.messages = updatedLang.locale.startsWith("es") ? es : en;
    localStorage.setItem("language", updatedLang.locale);
    setLanguageSettings(updatedLang);
  }
  
  /*
  // stablish default user at navigator's storage (if not previously existent)
  let storedUser = JSON.parse(localStorage.getItem('itti-user'));
  if (!storedUser) {
    localStorage.setItem('itti-user', JSON.stringify({}));
    storedUser = {};
  }
  
  const [user, setUser] = useState(storedUser);

  function login(user) {
    localStorage.setItem("itti-user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("itti-user");
    setUser({});
  }
  */
  let storedLoggedIn = localStorage.getItem('loggedIn');
  if (!storedLoggedIn) {
    localStorage.setItem('loggedIn', "false");
    storedLoggedIn = false;
  } else {
    storedLoggedIn = storedLoggedIn === "true";
  }

  let storedUser = JSON.parse(localStorage.getItem('itti-user'));
  if (!storedUser) {
    localStorage.setItem('itti-user', JSON.stringify({}));
    storedUser = {};
  }
  
  const [loggedIn, setLoggedIn] = useState(storedLoggedIn);
  const [user, setUser] = useState(storedUser);

  console.log("loggedIn",loggedIn);

  const checkIfLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        setLoggedIn(true);
        if (!localStorage.getItem("itti-user")) {
          localStorage.setItem("itti-user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch(err => {
        localStorage.setItem("loggedIn", false);
        setLoggedIn(false);
      });
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, [])

  const signOut = async () => {
    try {
      await Auth.signOut();
      localStorage.setItem("loggedIn", false);
      setLoggedIn(false);
      localStorage.setItem("itti-user", "{}");
      setUser({});
    }
    catch (err) {
      console.log('Error signing out',err);
    }
  }

  const signIn = async (email, password) => {
    try {
      const userSigned = await Auth.signIn(email, password);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      localStorage.setItem("itti-user", JSON.stringify(userSigned));
      setUser(userSigned);
    }
    catch (err) {
      return err;
    }
  }

  const signUp = async (name, email, phone, password) => {
    try {
      const userSigned = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: name,
          phone_number: phone,
          email: email,
        },
      });
      setUser(userSigned);
      localStorage.setItem("itti-user", JSON.stringify(userSigned));      
    }
    catch (err) {
      return err;
    }
  }

  const confirmSignUp = async (email, authenticationCode) => {
    try {
      await Auth.confirmSignUp(email, authenticationCode);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
    }
    catch (err) {
      return err;
    }
  }

  const resendCode = async (email) => {
    try {
      await Auth.resendSignUp(email);
      localStorage.setItem("loggedIn", false);
      setLoggedIn(false);
      localStorage.setItem("itti-user", "{}");
      setUser({});
    }
    catch (err) {
      return err;
    }
  }

  const [signupMode, setSignupMode] = useState(0); // 0 for signup, 1 for authentication

  return (
    <div className="App">
      <AppContext.Provider
        value={{ user, loggedIn, signIn, signOut, signUp, confirmSignUp, resendCode, signupMode, setSignupMode, languageSettings, setLang, cart, addToCart, substractToCart, removeFromCart, clearCart }}
      >
        <IntlProvider
          locale={languageSettings.locale}
          messages={languageSettings.messages}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/artesanos" exact element={<Artisans />} />
              <Route path="/productos" exact element={<ProductsPage />} />
              <Route path="/productos/:_id" exact element={<ProductDetail />} />
              <Route path="/artesanos/:_id" exact element={<ArtisanDetail />} />
              <Route path="/nosotros" exact element={<AboutUs />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/carrito" exact element={<Cart />} />
              <Route path="/profile" exact element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </IntlProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
