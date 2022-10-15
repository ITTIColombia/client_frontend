import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";
import Orders from "../Orders/Orders";
import { FormattedMessage } from "react-intl";
import { Link, Routes, Route } from "react-router-dom";
import ProfileNav from "../../Components/ProfileNav/ProfileNav";

function Profile() {

    const context = useContext(AppContext);

    return (
        <React.Fragment>
            <Navbar />
            <div className="container">

                <div className="container px-5">
                    <ProfileNav tab={1} />
                </div>

                <Orders />
            </div>


            <Footer />
        </React.Fragment>
    );
}

export default Profile;