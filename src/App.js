import './App.css';
import {useState} from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React from "react";
import Home from "./Pages/Home/Home";
import NavbarITTI from "./Components/Navbar/NavbarITTI";

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
            <NavbarITTI/>
            <Switch>
              <Route path='/' exact component={Home}/>
            </Switch>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
  );
}

export default App;
