import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";

function Profile() {
    
    const context = useContext(AppContext);

    return (
        <React.Fragment>
            <Navbar/>
            <div>
                <h1>{context.user.attributes.name}</h1>
            </div>
            <Footer/>
        </React.Fragment>
    );
}

export default Profile;