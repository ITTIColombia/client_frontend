import './Login.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {useEffect, useLayoutEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";


function Login() {

    const [form, setForm] = useState({email: "", password: ""});

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        console.log(form)
    }, [form])

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })

    return (
        <React.Fragment>
            <Navbar/>
            <div id="Login">
                <div className="container">
                    <div className="row login-content">
                        <div className="col-lg-6 login-image-section d-flex justify-content-end">
                            <Carousel className="login-carousel hide-sm"
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
                                           className="login-input"
                                           id="email"
                                           value={form.email}
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-group login-form-section">
                                    <label htmlFor="password"><FormattedMessage id="Password"/></label>
                                    <input name="password"
                                           type="password"
                                           className="login-input"
                                           id="password"
                                           aria-describedby="passwordHelp"
                                           value={form.password}
                                           onChange={handleChange}/>
                                    {
                                        // TODO: Finish the forgot password page and mailing service problems
                                        // <small id="passwordHelp"
                                        //    className="d-flex justify-content-end orange">
                                        // <FormattedMessage id="ForgotYourPassword"/>
                                        // </small>
                                    }
                                </div>
                                <button id="login-button"
                                        type="submit"
                                        className="btn btn-primary"><FormattedMessage id="Login"/></button>
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