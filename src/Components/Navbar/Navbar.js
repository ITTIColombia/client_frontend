import React from 'react'
import "./Navbar.css"; 
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../../assets/Logos/logoNav.svg";


function Navbar() {

 const navigate = useNavigate();

    function handleGoCart(event){
        event.preventDefault();
        navigate("/cart");
    }

    return (
        <div className="Navbar">
            <div className="navbar-content">
                    <div className="navbar-items left">
                        <li key="1" className="navbar-items-text">
                            <NavLink className={({ isActive }) => isActive? "active": ''} to="/">
                                <span>HOME</span>
                            </NavLink>
                        </li>
                        <li key="2" className="navbar-items-text">
                            <NavLink className={({ isActive }) => isActive? "active": ''} to="/productos">
                                <span>PRODUCTOS</span>
                            </NavLink>
                        </li>
                    </div>
                    <div className="navbar-logo">
                        <NavLink to="/">
                            <img className="navbar-logo-img" src={logo} alt="Logo ITTI" />
                        </NavLink>
                    </div>
                    <div className="navbar-items left">
                        <li key="3" className="navbar-items-text">
                            <NavLink className={({ isActive }) => isActive? "active": ''} to="/artesanos">
                                <span>ARTESANOS</span>
                            </NavLink>
                        </li>
                        <li key="4" className="navbar-items-text">
                            <NavLink className={({ isActive }) => isActive? "active": ''} to="/nosotros">
                                <span>NOSOTROS</span>
                            </NavLink>
                        </li>
                    </div>   
            </div>
            <div className="navbar-cart">
                <button className="user-cart" type="button" onClick={handleGoCart}></button>
            </div>
        </div>
    )
}

export default Navbar
