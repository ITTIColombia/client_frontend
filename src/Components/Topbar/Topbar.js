import React, {useState, useContext} from 'react'
import {Link } from "react-router-dom";
import "./Topbar.css"; 

function Topbar() {

    // TODO Agregar contexto aquí con usuario cuando está logeado 

    const [language, setLanguage] = useState("ES");

    function handleChangeLanguage(event) {
        setLanguage(event.target.value);
    }


    return (
        <div className='Topbar'>
            <div className='Topbar-text'>
                <Link id="Topbar-text-artisan" to="/signupArtesanos"><p className='Topbar-text-high'>¿Eres artesano?</p></Link>
                <Link to="/login"><p className='Topbar-text-center'>Ingresar</p></Link>
                <div>
                    <button className={ language === "ES" ? 'Topbar-button-active' : 'Topbar-button'} id="ES" value="ES" onClick={handleChangeLanguage}>ES</button>
                    <button className={ language === "EN" ? 'Topbar-button-active' : 'Topbar-button'} id="EN" value="EN" onClick={handleChangeLanguage}>EN</button>              
                </div>
            </div>
        </div>
    )
}

export default Topbar
