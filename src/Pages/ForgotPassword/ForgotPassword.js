import "./ForgotPassword.css"
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React from "react";
import { useState, useEffect, useContext } from "react";
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import AppContext from "../../AppContext";

function ForgotPassword () {

    const context = useContext(AppContext);

    const [form, setForm] = useState({
        email: "",
        authenticationCode: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [alertEmail, setAlertEmail] = useState("");
    const [alertCode, setAlertCode] = useState("");
    const [alertPassword, setAlertPassword] = useState("");
    const [alertConfirmPassword, setAlertConfirmPassword] = useState("");
    const [alertForm, setAlertForm] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const validateForm = () => {
        validateEmail();
        validateCode();
        validatePassword();
        validateConfirmPassword();
        return alertEmail === "" && alertCode === "" 
            && alertPassword === "" && alertConfirmPassword === "";
    }

    const validateEmail = () => {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (form.email === "") setAlertEmail(context.languageSettings.messages.EmailRequired);
        if (!form.email.match(regexEmail)) setAlertEmail(context.languageSettings.messages.EmailInvalid);
        else setAlertEmail("");
        setAlertForm("");
    }

    const validateCode = () => {
        if (form.authenticationCode.length !== 6) setAlertCode(context.languageSettings.messages.CodeInvalid);
        else setAlertCode("");
        setAlertForm("");
    }

    const validatePassword = () => {
        if (form.password === "") setAlertPassword(context.languageSettings.messages.PasswordRequired);
        else if (form.password.length < 6) setAlertPassword(context.languageSettings.messages.PasswordInvalid);
        else setAlertPassword("");
        setAlertForm("");
    }

    const validateConfirmPassword = () => {
        if (form.confirmPassword !== form.password) setAlertConfirmPassword(context.languageSettings.messages.PasswordsMustMatch);
        else setAlertConfirmPassword("");
        setAlertForm("");
    }

    const forgotPassword = async (e) => {
        e.preventDefault();
        validateEmail();
        if (!(alertEmail === "")) return ;
        const error = await context.forgotPassword(form.email);
        if (error) {
            if (error.code === "UserNotFoundException") {
                setAlertForm(context.languageSettings.messages.EmailNotFound)
            } else if (error.code === "LimitExceededException") {
                setAlertForm(context.languageSettings.messages.LimitExceeded)
            } else {
                setAlertForm(error.message ? error.message : error);
                throw error;
            }
            return ;
        }
    }

    const confirmForgotPassword = async (e) => {
        e.preventDefault();
        validateForm();
        if (!validateForm()) return ;
        const error = await context.confirmForgotPassword(form.email, form.authenticationCode, form.password);
        if (error) {
            if (error.code === "CodeMismatchException") {
                setAlertForm(context.languageSettings.messages.CodeInvalid);
            } else if (error.code === "LimitExceededException") {
                setAlertForm(context.languageSettings.messages.LimitExceeded);
            } else {
                setAlertForm(error.message ? error.message : error);
                throw error;
            }
            return ;
        }
        window.location.href = "/login";
    }


    return (
        <React.Fragment>
            <Navbar/>
                <div id="Login">
                    <div className="container">
                        <div className="row login-content">
                            <div className="col-lg-6 login-image-section d-flex justify-content-end">
                                <Carousel className="login-carousel login-hide-sm"
                                        controls={false}>
                                    <Carousel.Item>
                                        <img className="d-block w-100 login-carousel-item"
                                            src="/Assets/Photos/Login/Login1.png"
                                            alt="First slide"/>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-100 login-carousel-item"
                                            src="/Assets/Photos/Login/Login2.png"
                                            alt="Second slide"/>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-100 login-carousel-item"
                                            src="/Assets/Photos/Login/Login3.png"
                                            alt="Third slide"/>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            {
                                context.loginStatus === 0 ? /* Login Form */
                                (
                                <div className="col-12 col-lg-6 login-form">
                                    <h1 className="login-special-text black">
                                        <FormattedMessage id="PasswordRecovery"/>
                                    </h1>
                                    <form className="login-normal-text ">
                                        <div className="form-group login-form-section">
                                            <label htmlFor="email"><FormattedMessage id="Email"/></label>
                                            <input name="email"
                                                type="email"
                                                className={(alertEmail?"wrong-":"")+"login-input"}
                                                id="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                onBlur={validateEmail}/>
                                            <p className="login-alert-text">{alertEmail}</p>
                                        </div>
                                        <button id="login-button"
                                                type="submit"
                                                className="btn btn-primary"
                                                onClick={forgotPassword}
                                                ><FormattedMessage id="SendCode"/>
                                        </button>
                                        <p className="login-form-alert-text">{alertForm}</p>
                                        <p className="text-center login-noAccount">
                                            <Link to="/login"> <span className="orange"><FormattedMessage id="BackToSignIn"/></span></Link>                                    
                                        </p>
                                    </form>
                                </div>
                                ) : /* Password Recovery Form */
                                (
                                    <div className="col-12 col-lg-6 login-form">
                                        <h1 className="login-special-text black">
                                            <FormattedMessage id="PasswordRecovery"/>
                                        </h1>
                                        <form className="login-normal-text ">
                                            {<div className="form-group login-form-section">
                                                <label htmlFor="email"><FormattedMessage id="Email"/></label>
                                                <input name="email"
                                                    type="email"
                                                    className="login-input"
                                                    id="email"
                                                    value={form.email}
                                                    readOnly/>
                                                <p className="login-alert-text">{alertEmail}</p>
                                            </div>}
                                            <div className="form-group login-form-section">
                                                <label htmlFor="code"><FormattedMessage id="Code"/></label>
                                                <input name="authenticationCode"
                                                    type="text"
                                                    className={(alertCode?"wrong-":"")+"login-input"}
                                                    id="authenticationCode"
                                                    value={form.authenticationCode}
                                                    onChange={handleChange}
                                                    onBlur={validateCode}/>
                                                <p className="login-alert-text">{alertCode}</p>
                                            </div>
                                            <div className="form-group signup-form-section">
                                                <label htmlFor="password"><FormattedMessage id="Password"/></label>
                                                <input name="password"
                                                    type={showPass ? "text" : "password"}
                                                    className={(alertPassword?"wrong-":"")+"login-input"}
                                                    id="password"
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    onBlur={() => {
                                                        validatePassword();
                                                        validateConfirmPassword();
                                                    }}/>
                                                <img src={showPass ? "/Assets/Icons/eye-hide.svg" : "/Assets/Icons/eye-show.svg"}
                                                    onClick={()=>{setShowPass(!showPass)}} 
                                                    alt="Show" className="login-eye-show"
                                                    />
                                                <p className="signup-alert-text">{alertPassword}</p>
                                            </div>
                                            <div className="form-group signup-form-section">
                                                <label htmlFor="confirmPassword"><FormattedMessage id="RepeatPassword"/></label>
                                                <input name="confirmPassword"
                                                    type={showConfirmPass ? "text" : "password"}
                                                    className= {(alertConfirmPassword?"wrong-":"")+"login-input"}
                                                    id="confirmPassword"
                                                    value={form.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={validateConfirmPassword}/>
                                                <img src={showConfirmPass ? "/Assets/Icons/eye-hide.svg" : "/Assets/Icons/eye-show.svg"}
                                                    onClick={()=>{setShowConfirmPass(!showConfirmPass)}} 
                                                    alt="Show" className="login-eye-show"
                                                    />
                                                <p className="signup-alert-text">{alertConfirmPassword}</p>
                                            </div>

                                            <button id="login-button"
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    onClick={confirmForgotPassword}
                                                    ><FormattedMessage id="ChangePassword"/>
                                            </button>
                                            <p className="login-form-alert-text">{alertForm}</p>
                                            <p className="text-center login-resendCode" onClick={forgotPassword}>
                                                <span className="orange"><FormattedMessage id="ResendCode"/></span>
                                            </p>
                                        </form>
                                    </div>
                                )
                            }.

                        </div>
                    </div>
                </div>
            <Footer/>
        </React.Fragment>
    );
}

export default ForgotPassword;