import "./App.css";
import { useState } from "react";
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
import Noty from 'noty';
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/bootstrap-v4.css"; // Noty CSS

const defaultCart = {
  items: [],
  totalPrice:0
}

/*const defaultLanguage = {
  messages: navigator.language.startsWith("es") ? es : en,
  locale: navigator.language,
}*/

function App() {

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
        new Noty({
          text: product.name+(languageSettings.locale.startsWith(
            "en") ? en.AddedToCart : es.AddedToCart),
          timeout: 2000,
          progressBar: false,
          type: "warning",
          layout: "topLeft",
          theme: 'bootstrap-v4',
        }).show();
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

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("itti-user") || "{}")
  );

  // stablish default language at navigator's storage (if not previously existent)
  let storedLanguage = localStorage.getItem('language');
  if (!storedLanguage) {
    localStorage.setItem('language', navigator.language);
    storedLanguage = navigator.language;
  }

  const [languageSettings, setLanguageSettings] = useState({ messages: storedLanguage.startsWith("es") ? es : en, locale: storedLanguage });

  function login(user) {
    localStorage.setItem("itti-user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("itti-user");
    setUser({});
  }

  function setLang(lang) {
    const updatedLang = { messages: undefined, locale: lang };
    if (lang.startsWith(navigator.language.slice(0, 2))) {
      updatedLang.locale = navigator.language;
    }
    updatedLang.messages = updatedLang.locale.startsWith("es") ? es : en;
    localStorage.setItem("language", updatedLang.locale);
    setLanguageSettings(updatedLang);
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{ user, login, logout, languageSettings, setLang, cart, addToCart, substractToCart, removeFromCart, clearCart }}
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
            </Routes>
          </BrowserRouter>
        </IntlProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
