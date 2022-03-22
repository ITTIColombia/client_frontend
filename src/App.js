import './App.css';
import {useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import Home from "./Pages/Home/Home";
import Artisans from "./Pages/Artisans/Artisans";
import ProductsPage from './Pages/ProductsPage/ProductsPage';

const AppContext = React.createContext({})

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("itti-user") || '{}'))

  function login(user){
    localStorage.setItem("itti-user", JSON.stringify(user))
    setUser(user);
  }

  function logout(){
    localStorage.removeItem("itti-user")
    setUser({});
  }

  return (
      <div className="App">
       
        <AppContext.Provider value={{user, login, logout}}>
          <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/artesanos" exact element={<Artisans/>}/>
            <Route path="/productos" exact element={<ProductsPage/>}/>
          </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
  );
}

export default App;