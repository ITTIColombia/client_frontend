import "./SignUp2.css";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useLayoutEffect, useState, useContext} from "react";
import {Carousel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import Footer from "../../Components/Footer/Footer";
import {Link} from "react-router-dom";
import React from "react";
import AppContext from "../../AppContext";

const phoneNumberFormat = " +57##########";

function SignUp2() {

    const context = useContext(AppContext);

    const [form, setForm] = useState({
        email: context.user.email,
        name: "",
        address: "",
        postalCode: "",
        city: "",
        department: "",
        country: "",
        phoneNumber: "",
    });

    useEffect(() => {
        if (context.loginStatus !== 2) {
            localStorage.setItem("log", context.loginStatus);
            window.location.href = "/signup";
        }
    }, []);

    const [alertName, setAlertName] = useState("");
    const [alertAddress, setAlertAddress] = useState("");
    const [alertPostalCode, setAlertPostalCode] = useState("");
    const [alertCity, setAlertCity] = useState("");
    const [alertDepartment, setAlertDepartment] = useState("");
    const [alertCountry, setAlertCountry] = useState("");
    const [alertPhoneNumber, setAlertPhoneNumber] = useState("");
    const [alertForm, setAlertForm] = useState("");

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const signUpBackend = async (e) => {
        e.preventDefault();
        if (!validateFormBackend()) return ;
        const error = await context.signUpBackend(form.email, form.name, form.phoneNumber, form.address, form.postalCode, form.city, form.department, form.country);
        if (error) {
            // if error.code ...
            setAlertForm(error.message ? error.message : error);
            throw error;
            // return ;
        }
    }

    const validateFormBackend = () => {
        validateName();
        validateAddress();
        validatePostalCode();
        validateCity();
        validateDepartment();
        validateCountry();
        validatePhoneNumber();
        return alertName === "" && alertPhoneNumber === "" && alertAddress === "" && 
                alertPostalCode === "" && alertCity === "" && alertDepartment === "" && alertCountry === "";
    }

    const validateName = () => {
        if (form.name === "") setAlertName(context.languageSettings.messages.NameRequired);
        else if (form.name.length < 4) setAlertName(context.languageSettings.messages.NameTooShort);
        else if (form.name.length > 50) setAlertName(context.languageSettings.messages.NameTooLong);
        else setAlertName("");
        setAlertForm("");
    }

    const validateAddress = () => {
        if (form.address === "") setAlertAddress(context.languageSettings.messages.AddressRequired);
        else if (form.address.length < 4) setAlertAddress(context.languageSettings.messages.AddressTooShort);
        else if (form.address.length > 150) setAlertAddress(context.languageSettings.messages.AddressTooLong);
        else setAlertAddress("");
    }

    const validatePostalCode = () => {
        if (form.postalCode === "") setAlertPostalCode(context.languageSettings.messages.PostalCodeRequired);
        else if (form.postalCode.length < 4) setAlertPostalCode(context.languageSettings.messages.PostalCodeTooShort);
        else if (form.postalCode.length > 8) setAlertPostalCode(context.languageSettings.messages.PostalCodeTooLong);
        else setAlertPostalCode("");
    }

    const validateCity = () => {
        if (form.city === "") setAlertCity(context.languageSettings.messages.CityRequired);
        else if (form.city.length < 4) setAlertCity(context.languageSettings.messages.CityTooShort);
        else if (form.city.length > 50) setAlertCity(context.languageSettings.messages.CityTooLong);
        else setAlertCity("");
    }

    const validateDepartment = () => {
        if (form.department === "") setAlertDepartment(context.languageSettings.messages.DepartmentRequired);
        else if (form.department.length < 4) setAlertDepartment(context.languageSettings.messages.DepartmentTooShort);
        else if (form.department.length > 50) setAlertDepartment(context.languageSettings.messages.DepartmentTooLong);
        else setAlertDepartment("");
    }

    const validateCountry = () => {
        if (form.country === "") setAlertCountry(context.languageSettings.messages.CountryRequired);
        else if (form.country.length < 4) setAlertCountry(context.languageSettings.messages.CountryTooShort);
        else if (form.country.length > 50) setAlertCountry(context.languageSettings.messages.CountryTooLong);
        else setAlertCountry("");
    }

    const validatePhoneNumber = () => {
        if (form.phoneNumber === "") setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberRequired);
        else if (form.phoneNumber.length < 12 || form.phoneNumber.length > 13) setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberInvalid + phoneNumberFormat);
        else if (form.phoneNumber.charAt(0) !== "+") setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberInvalid + phoneNumberFormat);
        else if (isNaN(form.phoneNumber.substring(1))) setAlertPhoneNumber(context.languageSettings.messages.PhoneNumberInvalid + phoneNumberFormat);
        else setAlertPhoneNumber("");
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
                                <div className="form-group login-form-section">
                                <label htmlFor="email"><FormattedMessage id="Email"/></label>
                                <input name="email"
                                    type="email"
                                    className="login-input"
                                    id="email"
                                    value={form.email}
                                    readOnly/>
                                </div>
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
                                    <label htmlFor="address"><FormattedMessage id="Address"/></label>
                                    <input name="address"
                                        type="text"
                                        className={(alertAddress?"wrong-":"")+"signup-input"}
                                        id="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        onBlur={validateAddress}/>
                                    <p className="signup-alert-text">{alertAddress}</p>
                                </div>
                                <div className="form-group signup-form-section">
                                    <label htmlFor="postalCode"><FormattedMessage id="PostalCode"/></label>
                                    <input name="postalCode"
                                        type="number"
                                        className={(alertPostalCode?"wrong-":"")+"signup-input"}
                                        id="postalCode"
                                        value={form.postalCode}
                                        onChange={handleChange}
                                        onBlur={validatePostalCode}/>
                                    <p className="signup-alert-text">{alertPostalCode}</p>
                                </div>
                                <div className="form-group signup-form-section">
                                    <label htmlFor="department"><FormattedMessage id="Department"/></label>
                                    <input name="department"
                                        type="text"
                                        className={(alertDepartment?"wrong-":"")+"signup-input"}
                                        id="department"
                                        value={form.department}
                                        onChange={handleChange}
                                        onBlur={validateDepartment}/>
                                    <p className="signup-alert-text">{alertDepartment}</p>
                                </div>
                                <div className="form-group signup-form-section">
                                    <label htmlFor="city"><FormattedMessage id="City"/></label>
                                    <input name="city"
                                        type="text"
                                        className={(alertCity?"wrong-":"")+"signup-input"}
                                        id="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        onBlur={validateCity}/>
                                    <p className="signup-alert-text">{alertCity}</p>
                                </div>
                                <div className="form-group signup-form-section">
                                    <label htmlFor="country"><FormattedMessage id="Country"/></label>
                                    <input name="country"
                                        type="text"
                                        className={(alertCountry?"wrong-":"")+"signup-input"}
                                        id="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        onBlur={validateCountry}/>
                                    <p className="signup-alert-text">{alertCountry}</p>
                                </div>
                                <button id="signup-button"
                                        type="submit"
                                        className="btn btn-primary text-uppercase"
                                        onClick={signUpBackend}
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
    );
}

export default SignUp2;