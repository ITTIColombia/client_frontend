import "./CodeVerification.css"
import React from "react";
import { useState, useLayoutEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Carousel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import AppContext from "../../AppContext";


function CodeVerification(props) {
    
    const context = useContext(AppContext);

    const [code, setCode] = useState("");
    
    const [alertCode, setAlertCode] = useState("");
    const [alertForm, setAlertForm] = useState("");
    const [codeResent, setCodeResent] = useState(false);

    const confirmSignUp = async (e) => {
        e.preventDefault();
        setCodeResent(false);
        if (!validateForm()) return ;
        const error = await context.confirmSignUp(props.email, code);
        if (error) {
            if (error.code === "CodeMismatchException") {
                setAlertForm(context.languageSettings.messages.CodeInvalid);
            }
            else {
                setAlertForm(error.message);
                throw error;
            }
            return ;
        }
        console.log("user created");
        console.log(context.user);
        window.location.href = "/";
    }

    const validateForm = () => {
        validateCode();
        return alertCode === "";
    }

    const validateCode = () => {
        if (code.length !== 6) {
            setAlertCode(context.languageSettings.messages.CodeInvalid);
        } else {
            setAlertCode("");
        }
    }

    const handleChange = (e) => {
        setCode(e.target.value);
    }

    useLayoutEffect(() => {
        window.scrollTo(0,0);
    } , []);

    const resendCode = async (e) => {
        e.preventDefault();
        const error = await context.resendCode(props.email);
        if (error) {
            setAlertForm(error.message);
            throw error;
        }
        console.log("code resent", codeResent);
        setAlertForm("");
        setCodeResent(true);
    }

    return (
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
                    <div className="col-12 col-lg-6 login-form">
                        <h1 className="login-special-text black">
                            <FormattedMessage id="CodeSent"/>
                        </h1>
                        <form className="login-normal-text ">
                            <div className="form-group login-form-section">
                                <label htmlFor="email"><FormattedMessage id="Email"/></label>
                                <input name="email"
                                    type="email"
                                    className="login-input"
                                    id="email"
                                    value={props.email}
                                    readOnly/>
                            </div>
                            <div className="form-group login-form-section">
                                <label htmlFor="authenticationCode"><FormattedMessage id="AuthenticationCode"/></label>
                                <input name="authenticationCode"
                                    type="text"
                                    className="login-input"
                                    value={code}
                                    onChange={handleChange}/>
                                <p className="login-alert-text">{alertCode}</p>
                            </div>
                            <button id="resendCode-button"
                                    className="btn btn-primary"
                                    onClick={resendCode}
                                    >
                                <FormattedMessage id="ResendCode"/>
                            </button>
                            <button id="authenticationCode-button"
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={confirmSignUp}
                                    ><FormattedMessage id="SendVerificationCode"/>
                            </button>
                            <p className="signup-form-alert-text">{alertForm}</p>
                            <p className="authCode-form-code-resent-text">{codeResent ? context.languageSettings.messages.CodeResent : ""}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CodeVerification;
