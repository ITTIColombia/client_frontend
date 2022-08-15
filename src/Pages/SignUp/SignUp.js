import "./SignUp.css";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useLayoutEffect, useState, useContext} from "react";
import {Carousel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import Footer from "../../Components/Footer/Footer";
import {Link} from "react-router-dom";
import React from "react";
import AppContext from "../../AppContext";

const phoneNumberFormat = " +57##########";

function SignUp() {

    const context = useContext(AppContext);

    const [form, setForm] = useState({
        name: "", 
        email: "", 
        phoneNumber: "",
        password: "", 
        repeatPassword: "",
        authenticationCode: "",
    });
    const [formMode, setFormMode] = useState(0);

    const [alertName, setAlertName] = useState("");
    const [alertEmail, setAlertEmail] = useState("");
    const [alertPhoneNumber, setAlertPhoneNumber] = useState("");
    const [alertPassword, setAlertPassword] = useState("");
    const [alertRepeatPassword, setAlertRepeatPassword] = useState("");
    const [alertForm, setAlertForm] = useState("");

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        console.log(form);
    }, [form]);

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    });

    const signUp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return ;
        const error = await context.signUp(form.name, form.email, form.phoneNumber, form.password);
        if (error) {
            if (error.code === "InvalidPasswordException") {
                // user should never receive this error (cognito minimum password length is 8, but back minimum is 6)
                setAlertForm(context.languageSettings.messages.PasswordInvalid);
            } else if (error.code === "InvalidParameterException") {
                // user should never receive this error
                setAlertForm(error.message);
            }
            throw error;
            return ;
        }
        setFormMode(1); // Change to authentication code form
        //TODO Tony: Confirmation code sent to email

        //TODO Tony: success case
    }

    const confirmSignUp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return ;
        const error = await context.confirmSignUp(form.email, form.authenticationCode);
        if (error) {
            throw error;
        }
        console.log("user created");
        console.log(context.user);
        //TODO Tony: Success case
    }

    const validateForm = () => {
        validateName();
        validateEmail();
        validatePhoneNumber();
        validatePassword();
        validateRepeatPassword();
        return alertName === "" && alertEmail === "" && alertPhoneNumber === "" && 
               alertPassword === "" && alertRepeatPassword === "";
    }

    const validateName = () => {
        if (form.name === "") setAlertName(context.languageSettings.messages.NameRequired);
        else if (form.name.length < 4) setAlertName(context.languageSettings.messages.NameTooShort);
        else if (form.name.length > 50) setAlertName(context.languageSettings.messages.NameTooLong);
        else setAlertName("");
        setAlertForm("");
    }

    const validateEmail = () => {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (form.email === "") setAlertEmail(context.languageSettings.messages.EmailRequired);
        else if (!form.email.match(regexEmail)) setAlertEmail(context.languageSettings.messages.EmailInvalid);
        else setAlertEmail("");
        setAlertForm("");
    }

    const validatePhoneNumber = () => {
        if (form.phoneNumber === "") setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberRequired);
        else if (form.phoneNumber.length < 12 || form.phoneNumber.length > 13) setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberInvalid + phoneNumberFormat + 1);
        else if (form.phoneNumber.charAt(0) !== "+") setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberInvalid + phoneNumberFormat + 2);
        else if (isNaN(form.phoneNumber.substring(1))) setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberInvalid + phoneNumberFormat + 3);
        else setAlertPhoneNumber("");
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
            {
                formMode === 0 ? /* SignUp Form */
                (
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
                                        <label htmlFor="name"><FormattedMessage id="Name"/></label>
                                        <input name="name"
                                            type="text"
                                            className={(alertName?"wrong-":"")+"signup-input"}
                                            id="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            onBlur={validateName}/>
                                        <p className="signup-alert-text">{alertName}</p>
                                    </div>
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
                                        <label htmlFor="phoneNumber"><FormattedMessage id="PhoneNumber"/></label>
                                        <input name="phoneNumber"
                                            type="text"
                                            className={(alertPhoneNumber?"wrong-":"")+"signup-input"}
                                            id="phoneNumber"
                                            value={form.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={validatePhoneNumber}
                                            placeholder={context.languageSettings.messages.ForExample+phoneNumberFormat}/>
                                        <p className="signup-alert-text">{alertPhoneNumber}</p>
                                    </div>
                                    <div className="form-group signup-form-section">
                                        <label htmlFor="password"><FormattedMessage id="Password"/></label>
                                        <input name="password"
                                            type="password"
                                            className={(alertPassword?"wrong-":"")+"signup-input"}
                                            id="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            onBlur={validatePassword}/>
                                        <p className="signup-alert-text">{alertPassword}</p>
                                    </div>
                                    <div className="form-group signup-form-section">
                                        <label htmlFor="repeatPassword"><FormattedMessage id="RepeatPassword"/></label>
                                        <input name="repeatPassword"
                                            type="password"
                                            className= {(alertRepeatPassword?"wrong-":"")+"signup-input"}
                                            id="repeatPassword"
                                            value={form.repeatPassword}
                                            onChange={handleChange}
                                            onBlur={validateRepeatPassword}/>
                                        <p className="signup-alert-text">{alertRepeatPassword}</p>
                                    </div>
                                    <button id="signup-button"
                                            type="submit"
                                            className="btn btn-primary text-uppercase"
                                            onClick={signUp}
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
                ) 
                : /* Authentication Code Form */ 
                (
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
                                            value={form.email}
                                            readOnly/>
                                        <p className="login-alert-text">{alertEmail}</p>
                                    </div>
                                    <div className="form-group login-form-section">
                                        <label htmlFor="authenticationCode"><FormattedMessage id="AuthenticationCode"/></label>
                                        <input name="authenticationCode"
                                            type="text"
                                            className="login-input"
                                            value={form.authenticationCode}
                                            onChange={handleChange}/>
                                    </div>
                                    <button id="authenticationCode-button"
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={confirmSignUp}
                                            ><FormattedMessage id="Login"/>
                                    </button>
                                    <p className="login-form-alert-text">{alertForm}</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            <Footer/>
        </React.Fragment>

    )
}

export default SignUp;