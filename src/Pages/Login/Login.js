import './Login.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React, {useLayoutEffect, useState, useContext} from "react";
import {FormattedMessage} from "react-intl";
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import AppContext from "../../AppContext";

function Login() {

    const context = useContext(AppContext);

    const [form, setForm] = useState({email: "", password: ""});
    const [alertEmail, setAlertEmail] = useState("");
    const [alertPassword, setAlertPassword] = useState("");
    const [alertForm, setAlertForm] = useState("");

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }
    /*
    useEffect(() => {
        console.log(form)
    }, [form]);
    */

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    });

    const signIn = async (e) => {
        e.preventDefault();
        if (!validateEmail() | !validatePassword()) return ;
        const error = await context.signIn(form.email, form.password);
        if (!error) {
            //success case
        }
        else {
            console.log(error.code);
            if (error.code === "UserNotFoundException") {
                setAlertForm(context.languageSettings.messages.EmailNotFound)
            } else {
                setAlertForm(context.languageSettings.messages.PasswordIncorrect)
            }
        }
    }

    const validateEmail = () => {
        if (form.email === "") {
            setAlertEmail(context.languageSettings.messages.EmailRequired);
            setAlertForm("");
        }
        else if (!form.email.includes("@")) {
            setAlertEmail(context.languageSettings.messages.EmailInvalid);
            setAlertForm("");
        }
        else if (!form.email.substring(form.email.indexOf("@")+1)) {
            setAlertEmail(context.languageSettings.messages.EmailInvalid);
            setAlertForm("");
        }
        else {
            setAlertEmail(""); 
            return true;
        }
    }

    const validatePassword = () => {
        if (form.password === "") {
            setAlertPassword(context.languageSettings.messages.PasswordRequired);
            setAlertForm("");
        }
        else if (form.password.length < 6) {
            setAlertPassword(context.languageSettings.messages.PasswordInvalid);
            setAlertForm("");
        }
        else {
            setAlertPassword("");
            return true;
        }
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
                        <div className="col-12 col-lg-6 login-form">
                            <h1 className="login-special-text black">
                                <FormattedMessage id="SignInInvitation" values={{
                                    span: (chunks) => <span className="orange">{chunks}</span>
                                }}/>
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
                                <div className="form-group login-form-section">
                                    <label htmlFor="password"><FormattedMessage id="Password"/></label>
                                    <input name="password"
                                           type="password"
                                           className={(alertPassword?"wrong-":"")+"login-input"}
                                           id="password"
                                           aria-describedby="passwordHelp"
                                           value={form.password}
                                           onChange={handleChange}
                                           onBlur={validatePassword}/>
                                    <p className="login-alert-text">{alertPassword}</p>
                                    {
                                        // TODO: Finish the forgot password page and mailing service problems
                                        // <small id="passwordHelp"
                                        //    className="d-flex justify-content-end orange">
                                        // <FormattedMessage id="ForgotYourPassword"/>
                                        // </small>
                                    }
                                </div>
                                <button id="login-button"
                                        className="btn btn-primary"
                                        onClick={signIn}
                                        ><FormattedMessage id="Login"/>
                                </button>
                                <p className="login-form-alert-text">{alertForm}</p>
                                <p className="text-center login-noAccount"><FormattedMessage id="DontHaveAnAccount"/>
                                    <Link to="/signup"> <span className="orange"><FormattedMessage id="SignUp"/></span></Link>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>

    )
}


export default Login;