import React from 'react'
import "./Navbar.css"; 
import { NavLink, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';


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
                                <span><FormattedMessage id="Home"/></span>
                            </NavLink>
                        </li>
                        <li key="2" className="navbar-items-text">
                            <NavLink className={({ isActive }) => isActive? "active": ''} to="/productos">
                                <span><FormattedMessage id="Products"/></span>
                            </NavLink>
                        </li>
                    </div>
                    <div className="navbar-logo">
                        <NavLink to="/">
                            <img className="navbar-logo-img" src="/Assets/Logos/logoNav.svg" alt="Logo ITTI" />
                        </NavLink>
                    </div>
                    <div className="navbar-items left">
                        <li key="3" className="navbar-items-text">
                            <NavLink className={({ isActive }) => isActive? "active": ''} to="/artesanos">
                                <span><FormattedMessage id="Artisans"/></span>
                            </NavLink>
                        </li>
                        <li key="4" className="navbar-items-text">
                            <NavLink className={({ isActive }) => isActive? "active": ''} to="/nosotros">
                                <span><FormattedMessage id="AboutUs"/></span>
                            </NavLink>
                        </li>
                    </div>   
            </div>
            <div className="navbar-cart">
               {/* <button className="user-cart" type="button" onClick={handleGoCart}></button>*/} 
               <input className="user-cart" type="image" src="/Assets/Icons/Cart.svg" alt={<FormattedMessage id="Cart"/>} onClick={handleGoCart}/>

            </div>
        </div>
    )
}

export default Navbar
