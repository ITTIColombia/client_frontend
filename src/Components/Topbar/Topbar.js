import React, {useState, useContext} from 'react'
import { FormattedMessage } from 'react-intl';
import {Link } from "react-router-dom";
import "./Topbar.css";
import AppContext from "../../AppContext";

function Topbar() {

    // TODO Agregar contexto aquí con usuario cuando está logeado

    const context = useContext(AppContext);

    const [language, setLanguage] = useState("EN");

    function handleChangeLanguage(event) {
        context.setLang(event.target.value);
    }


    return (
        <div className='Topbar'>
            <div className='Topbar-text'>
               {/*} <Link id="Topbar-text-artisan" to="/signupArtesanos"><p className='Topbar-text-high'><FormattedMessage id="AreYouAnArtisan"/></p></Link>
                <Link to="/login"><p className='Topbar-text-center'><FormattedMessage id="SignIn"/></p></Link>*/}
                <div>
                    <button className={ context.languageSettings.locale.startsWith("es") ? 'Topbar-button-active' : 'Topbar-button'} id="ES" value="es" onClick={handleChangeLanguage}>ES</button>
                    <button className={ context.languageSettings.locale.startsWith("en") ? 'Topbar-button-active' : 'Topbar-button'} id="EN" value="en" onClick={handleChangeLanguage}>EN</button>
                </div>
            </div>
        </div>
    )
}

export default Topbar
