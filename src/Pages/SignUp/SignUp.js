import "./SignUp.css";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useState, useContext} from "react";
import {Carousel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import Footer from "../../Components/Footer/Footer";
import {Link} from "react-router-dom";
import React from "react";
import AppContext from "../../AppContext";

function SignUp() {

    const context = useContext(AppContext);

    const [form, setForm] = useState({
        email: "", 
        password: "", 
        repeatPassword: ""
    });

    const [alertEmail, setAlertEmail] = useState("");
    const [alertPassword, setAlertPassword] = useState("");
    const [alertRepeatPassword, setAlertRepeatPassword] = useState("");
    const [alertForm, setAlertForm] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showRepeatPass, setShowRepeatPass] = useState(false);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

/*
    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    });
*/
    const signUpCognito = async (e) => {
        e.preventDefault();
        if (!validateFormCognito()) return ;
        const error = await context.signUpCognito(form.email, form.password);
        if (error) {
            if (error.code === "InvalidPasswordException") {
                // user should never receive this error (case that password minimum length is different than back minimum length)
                setAlertForm(context.languageSettings.messages.PasswordInvalid);
            } else if (error.code === "InvalidParameterException") {
                // user should never receive this error
                setAlertForm(error.message ? error.message : error);
            } else if (error.code === "UsernameExistsException") {
                setAlertForm(context.languageSettings.messages.EmailExists);
            } else if (error.code === "LimitExceededException") {
                setAlertForm(context.languageSettings.messages.LimitExceeded);
            } else {
                setAlertForm(error.message ? error.message : error);
                throw error;
            }
            return ;
        }
        context.setLoginStatus(1); // Change to authentication code form
    }

    const validateFormCognito = () => {
        validateEmail();
        validatePassword();
        validateRepeatPassword();
        return alertEmail === "" && alertPassword === "" && alertRepeatPassword === "";
    }

    const validateEmail = () => {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (form.email === "") setAlertEmail(context.languageSettings.messages.EmailRequired);
        else if (!form.email.match(regexEmail)) setAlertEmail(context.languageSettings.messages.EmailInvalid);
        else setAlertEmail("");
        setAlertForm("");
    }

    const validatePassword = () => {
        if (form.password === "") setAlertPassword(context.languageSettings.messages.PasswordRequired);
        else if (form.password.length < 6) setAlertPassword(context.languageSettings.messages.PasswordInvalid);
        else setAlertPassword("");
        setAlertForm("");
    }

    const validateRepeatPassword = () => {
        if (form.repeatPassword !== form.password) setAlertRepeatPassword(context.languageSettings.messages.PasswordsMustMatch);
        else setAlertRepeatPassword("");
        setAlertForm("");
    }

    return (
        <React.Fragment>
            <Navbar/>
                <div id="SignUp">
                    <div className="container-fluid">
                        <div className="row signup-content">
                            <div className="col-12 col-lg-6 signup-form">
                                <h1 className="signup-special-text black">
                                    <FormattedMessage id="SignInInvitation" values={{
                                        span: (chunks) => <span className="orange">{chunks}</span>
                                    }}/>
                                </h1>
                                <form className="signup-normal-text justify-content-end">
                                    <div className="form-group signup-form-section">
                                        <label htmlFor="email"><FormattedMessage id="Email"/></label>
                                        <input name="email"
                                            type="email"
                                            className={(alertEmail?"wrong-":"")+"signup-input"}
                                            id="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            onBlur={validateEmail}/>
                                        <p className="signup-alert-text">{alertEmail}</p>
                                    </div>
                                    <div className="form-group signup-form-section">
                                        <label htmlFor="password"><FormattedMessage id="Password"/></label>
                                        <input name="password"
                                            type={showPass ? "text" : "password"}
                                            className={(alertPassword?"wrong-":"")+"signup-input"}
                                            id="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            onBlur={() => {
                                                validatePassword();
                                                validateRepeatPassword();
                                            }}/>
                                            <img src={showPass ? "/Assets/Icons/eye-hide.svg" : "/Assets/Icons/eye-show.svg"}
                                                onClick={()=>{setShowPass(!showPass)}} 
                                                alt="Show" className="login-eye-show"
                                                />
                                        <p className="signup-alert-text">{alertPassword}</p>
                                    </div>
                                    <div className="form-group signup-form-section">
                                        <label htmlFor="repeatPassword"><FormattedMessage id="RepeatPassword"/></label>
                                        <input name="repeatPassword"
                                            type={showRepeatPass ? "text" : "password"}
                                            className= {(alertRepeatPassword?"wrong-":"")+"signup-input"}
                                            id="repeatPassword"
                                            value={form.repeatPassword}
                                            onChange={handleChange}
                                            onBlur={validateRepeatPassword}/>
                                            <img src={showRepeatPass ? "/Assets/Icons/eye-hide.svg" : "/Assets/Icons/eye-show.svg"}
                                                onClick={()=>{setShowRepeatPass(!showRepeatPass)}} 
                                                alt="Show" className="login-eye-show"
                                                />
                                        <p className="signup-alert-text">{alertRepeatPassword}</p>
                                    </div>
                                    <button id="signup-button"
                                            type="submit"
                                            className="btn btn-primary text-uppercase"
                                            onClick={signUpCognito}
                                            ><FormattedMessage id="SignUp"/>
                                    </button>
                                    <p className="signup-form-alert-text">{alertForm}</p>
                                    <p className="text-center signup-noAccount"><FormattedMessage id="AlreadyHaveAnAccount"/>
                                        <Link to="/login"> <span className="orange"> <FormattedMessage id="Login"/></span></Link></p>
                                </form>
                            </div>
                            <div className="col-lg-6 signup-image-section ">
                                <Carousel className="signup-carousel signup-hide-sm"
                                        controls={false}>
                                    <Carousel.Item>
                                        <img className="d-block w-100 signup-carousel-item"
                                            src="/Assets/Photos/Login/Login1.png"
                                            alt="First slide"/>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-100 signup-carousel-item"
                                            src="/Assets/Photos/Login/Login2.png"
                                            alt="Second slide"/>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-100 signup-carousel-item"
                                            src="/Assets/Photos/Login/Login3.png"
                                            alt="Third slide"/>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </React.Fragment>

    )
}

export default SignUp;