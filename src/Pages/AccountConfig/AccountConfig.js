import "./AccountConfig.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";
import { FormattedMessage } from "react-intl";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProfileNav from "../../Components/ProfileNav/ProfileNav";

function AccountConfig() {

    const context = useContext(AppContext);


    return (
        <React.Fragment>
            <Navbar />
            <div className="container">
            <ProfileNav tab={3} />
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default AccountConfig;