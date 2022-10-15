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
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import CodeVerification from "./Pages/CodeVerification/CodeVerification";
import SignUp2 from "./Pages/SignUp2/SignUp2";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import { useAlert } from "react-alert";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import AccountDetail from "./Pages/AccountDetail/AccountDetail";
import AccountConfig from "./Pages/AccountConfig/AccountConfig";
import OrderDetail from "./Components/OrderDetail/OrderDetail";

Amplify.configure(awsconfig);

const defaultCart = {
  items: [],
  totalPrice:0
}
const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function App() {
  const alert = useAlert()

  // stablish default cart at navigator's storage (if not previously existent)
  let storedCart = JSON.parse(localStorage.getItem('cart'));
  if (!storedCart) {
    localStorage.setItem('cart', JSON.stringify(defaultCart));
    storedCart = defaultCart;
  }

  const [cart, setCart] = useState(storedCart);

  const persistCartToBack = async () => {
    // persist cart to back
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;
      const mappedBackendCart = {"cardItems" : cart.items.map((i) => {
        return {
          quantity: i.quantity,
          product: i.product._id,
        };
      })};
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/email/${user.email}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(mappedBackendCart),
      });
    } catch (error) {
      // if user is not logged in, do nothing
      console.log("user not logged in, cart not persisted to back");
    }
  }

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
      persistCartToBack();
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
      persistCartToBack();
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
    persistCartToBack();
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
  
  // stablish default user at navigator's storage (if not previously existent)
  let storedUser = JSON.parse(localStorage.getItem('itti-user'));
  if (!storedUser) {
    localStorage.setItem('itti-user', "{}");
    storedUser = {};
  }

  let storedLoginStatus = parseInt(localStorage.getItem('itti-login-status'));
  if (!storedLoginStatus) {
    localStorage.setItem('itti-login-status', "0");
    storedLoginStatus = 0;
  }

  const [user, setUser] = useState(storedUser);
  const [loginStatus, setLoginStatus] = useState(storedLoginStatus); // 0: not loged in/sign up, 1: not verified, 2: not signed up in backend, 3: loged in

  const updateCartFromBackend = async (backendUser, accessToken) => {
    const products = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());

    const mappedFrontendCart = { "items": backendUser.cardItems.map((item) => {
      const q = item.quantity;
      const p = products.find((p) => p._id === item.product);
      return {
        "product": p,
        "quantity": q
      }
    })};
    const totalPrice = mappedFrontendCart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    mappedFrontendCart.totalPrice = totalPrice;
    localStorage.setItem('cart', JSON.stringify(mappedFrontendCart));
  }

  const checkIfLoggedIn = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const email = cognitoUser.attributes.email;
      try {
        const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;
        const backendUser = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/clients/email/${email}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          }).then((response) => response.json());
          localStorage.setItem("itti-user", JSON.stringify(backendUser));
          setUser(backendUser);
          if (loginStatus !== 3) {
            setLoginStatus(3);
            localStorage.setItem("itti-login-status", "3");
            // retrieve cart from backend
            updateCartFromBackend(backendUser, accessToken);
            await delay(2000); // wait 2 seconds to let the backend process the request
            window.location.href = "/";
          }
      } catch (err) {
        if (loginStatus !== 2) {
          setLoginStatus(2);
          localStorage.setItem("itti-login-status", "2");
        }
        const currentW = window.location.href.split("/");
        if (currentW[currentW.length-2] !== "signup" || currentW[currentW.length-1] !== "2") {
          window.location.href = "/signup/2";
        }
      }
    } catch (error) {
      if (error.code === "UserNotConfirmedException" || error === "The user is not authenticated") {
        console.log(error);
         if (loginStatus !== 1) {
           setLoginStatus(1);
           localStorage.setItem("itti-login-status", "1");
         }
       } else {
         console.log("error", error);
         if (loginStatus !== 0) {
           setLoginStatus(0);
           localStorage.setItem("itti-login-status", "0");
           setUser({});
         }
      }
    }
  }

  useEffect(() => {
    console.log("login status", loginStatus);
    console.log("user", user);
    
    /*Auth.currentAuthenticatedUser().then( // uncomment this to show access token for proofs in postman
      (cognitoUser) => {
        const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;
        console.log(accessToken);
      }
    );*/
    checkIfLoggedIn();
  }, [loginStatus]);

  const signOut = async () => {
    try {
      clearCart();
      await Auth.signOut();
      localStorage.setItem("itti-user", "{}");
      setUser({});
      setLoginStatus(0);
    }
    catch (err) {
      console.log('Error signing out',err);
    }
  }

  const signIn = async (email, password) => {
    try {
      await Auth.signIn(email, password);
      localStorage.setItem("itti-user", JSON.stringify({email}));
      setUser({email});
      window.location.href = "/authentication";
    }
    catch (err) {
      return err;
    }
  }

  // signup part 2: in backend
  const signUpBackend = async (email, name, cellphoneNumber, address, postalCode, city, department, country) => {
    try {
      // user should be already logged in at this point
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;

      const attributes = {
        name,
        cellphoneNumber: cellphoneNumber.substring(1),
        address,
        postalCode,
        city,
        department,
        country,
        email,
      };

      const backendUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clients`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(attributes),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }).then(response => response.json());
      if (backendUser.errors !== undefined && backendUser.errors !== "") {
        console.log("returned", backendUser.message);
        return backendUser.message;
      }
      console.log("cognito user", cognitoUser);
      console.log("backend user", backendUser);

      window.location.href = "/profile";      
    } catch (err) {
      return err;
    }
  }

  // signup part 1: in cognito (only email and password)
  const signUpCognito = async (email, password) => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        }
      });
      localStorage.setItem("itti-user", JSON.stringify({email}));
      setUser({email});
      window.location.href = "/authentication";
    }
    catch (err) {
      return err;
    }
  }

  const confirmSignUp = async (email, authenticationCode) => {
    try {
      await Auth.confirmSignUp(email, authenticationCode);
      console.log("user has been authenticated successfully");
      window.location.href = "/login"; // user must login after confirming signup
    }
    catch (err) {
      return err;
    }
  }

  const resendCode = async (email) => {
    try {
      await Auth.resendSignUp(email);
    }
    catch (err) {
      return err;
    }
  }

  const deleteCurrentUser = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;

      // delete on cognito
      const result = await Auth.deleteUser();

      // delete on backend
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/clients/email/${user.email}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });
      console.log("user deleted",result);
      localStorage.setItem("itti-user", "{}");
      setUser({});
      setLoginStatus(0);
    } 
    catch (err) {
      return err;
    }
  }

  const forgotPassword = async (email) => {
    try {
      await Auth.forgotPassword(email); // send confirmation code
    }
    catch (err) {
      return err;
    }
  }

  const confirmForgotPassword = async (email, code, password) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
    }
    catch (err) {
      return err;
    }
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{ 
                user, /* current user state */
                signIn, signOut, signUpCognito, signUpBackend, confirmSignUp, resendCode, deleteCurrentUser, forgotPassword, confirmForgotPassword, /* login operations */
                loginStatus, setLoginStatus, /* other variables */
                languageSettings, setLang, /* language */
                cart, addToCart, substractToCart, removeFromCart, clearCart /* cart */
              }}
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
              <Route path="/forgotPassword" exact element={<ForgotPassword />} />
              <Route path="/authentication" exact element={<CodeVerification />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/signup/2" exact element={<SignUp2 />} />
              <Route path="/carrito" exact element={<Cart />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/compras/:_id" exact element={<OrderDetail/>} />
              <Route path="/profile/account" exact element={<AccountDetail />} />
              <Route path="/profile/settings" exact element={<AccountConfig />} />
              
            </Routes>
          </BrowserRouter>
        </IntlProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
