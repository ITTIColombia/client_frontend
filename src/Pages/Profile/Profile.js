import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";

function Profile() {
    
    const context = useContext(AppContext);

    const deleteUser = async () => {
        const error = await context.deleteCurrentUser();
        if (error) {
            throw error;
        }
        window.location.href = "/";
    }

    return (
        <React.Fragment>
            <Navbar/>
            <div>
                <h1>{JSON.stringify(context.user.attributes)}</h1>
                <button onClick={deleteUser}></button>
            </div>
            <Footer/>
        </React.Fragment>
    );
}

export default Profile;