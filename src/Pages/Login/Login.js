import './Login.css';
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import {Carousel} from "react-bootstrap";


function Login() {

    const [form, setForm] = useState({email: "", password: ""});

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        console.log(form)
    }, [form])

    return (
        <div className="Login">
            <Topbar/>
            <Navbar/>
            <div className="container">
                <div className="row login-content">
                    <div className="col-6 login-image-section d-flex justify-content-end">
                        <Carousel className="login-carousel"
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
                    <div className="col-6 login-form">
                        <h1 className="login-special-text black">
                            <FormattedMessage id="SignInInvitation1"/>
                            <span className="orange"><FormattedMessage id="SignInInvitation2"/></span>
                            <FormattedMessage id="SignInInvitation3"/>
                        </h1>
                        <form className="login-normal-text ">
                            <div className="form-group login-form-section">
                                <label htmlFor="email"><FormattedMessage id="Email"/></label>
                                <input name="email"
                                       type="email"
                                       className="form-control login-input"
                                       id="email"
                                       value={form.email}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-group login-form-section">
                                <label htmlFor="password"><FormattedMessage id="Password"/></label>
                                <input name="password"
                                       type="password"
                                       className="form-control login-input"
                                       id="password"
                                       aria-describedby="passwordHelp"
                                       value={form.password}
                                       onChange={handleChange}/>
                                <small id="passwordHelp"
                                       className="d-flex justify-content-end orange">
                                    <FormattedMessage id="ForgotYourPassword"/>
                                </small>
                            </div>
                            <button id="login-button"
                                    type="submit"
                                    className="btn btn-primary"><FormattedMessage id="Login"/></button>
                            <p className="text-center login-noAccount"><FormattedMessage id="DontHaveAnAccount"/>
                                <span className="orange"><FormattedMessage id="SignUp"/></span></p>
                        </form>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default Login;