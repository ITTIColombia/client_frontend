import "./SignUp.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useLayoutEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import Footer from "../../Components/Footer/Footer";
import {Link} from "react-router-dom";

function SignUp() {

    const [form, setForm] = useState({
        name: "", email: "", phoneNumber: "",
        password: "", repeatPassword: ""
    });

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() => {
    }, [form])

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })


    return (
        <div className="SignUp">
            <Topbar/>
            <Navbar/>
            <div className="container">
                <div className="row signup-content">
                    <div className="col-6 signup-form">
                        <h1 className="signup-special-text black">
                            <FormattedMessage id="SignUpInvitation1"/>
                            <span className="orange"> <FormattedMessage id="SignUpInvitation2"/> </span>
                             <FormattedMessage id="SignUpInvitation3"/>
                        </h1>
                        <form className="signup-normal-text justify-content-end">
                            <div className="form-group signup-form-section">
                                <label htmlFor="name"><FormattedMessage id="Name"/></label>
                                <input name="name"
                                       type="text"
                                       className="form-control signup-input"
                                       id="name"
                                       value={form.name}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-group signup-form-section">
                                <label htmlFor="email"><FormattedMessage id="Email"/></label>
                                <input name="email"
                                       type="email"
                                       className="form-control signup-input"
                                       id="email"
                                       value={form.email}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-group signup-form-section">
                                <label htmlFor="phoneNumber"><FormattedMessage id="PhoneNumber"/></label>
                                <input name="phoneNumber"
                                       type="text"
                                       className="form-control signup-input"
                                       id="phoneNumber"
                                       value={form.phoneNumber}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-group signup-form-section">
                                <label htmlFor="password"><FormattedMessage id="Password"/></label>
                                <input name="password"
                                       type="password"
                                       className="form-control signup-input"
                                       id="password"
                                       value={form.password}
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-group signup-form-section">
                                <label htmlFor="repeatPassword"><FormattedMessage id="RepeatPassword"/></label>
                                <input name="repeatPassword"
                                       type="password"
                                       className="form-control signup-input"
                                       id="repeatPassword"
                                       value={form.repeatPassword}
                                       onChange={handleChange}/>
                            </div>
                            <button id="signup-button"
                                    type="submit"
                                    className="btn btn-primary text-uppercase"><FormattedMessage id="SignUp"/></button>
                            <p className="text-center signup-noAccount"><FormattedMessage id="AlreadyHaveAnAccount"/>
                                <Link to="/login"> <span className="orange"> <FormattedMessage id="Login"/></span></Link></p>
                        </form>
                    </div>
                    <div className="col-6 signup-image-section ">
                        <Carousel className="signup-carousel"
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
            <Footer/>
        </div>
    )
}

export default SignUp;