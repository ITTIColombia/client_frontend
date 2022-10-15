import "./AccountDetail.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";
import { FormattedMessage } from "react-intl";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import ProfileNav from "../../Components/ProfileNav/ProfileNav";

function AccountDetail() {

    const context = useContext(AppContext);
    let params = useParams();
    const {
        address,
        name,
        postalCode,
        city,
        department,
        email,
        cellphoneNumber,
        country,
        _id,
    } = context.user

    const deleteUser = async () => {
        const error = await context.deleteCurrentUser();
        if (error) {
            throw error;
        }
        window.location.href = "/";
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className="container px-5">
                <ProfileNav tab={2} />

                <div className="container py-5">
                    <div className="flex flex-col">
                        <div className="py-3">
                            <div className="title">
                                <FormattedMessage id="Email" />
                            </div>
                            <div className="labels">
                                {email}
                            </div>
                        </div>
                        <div className="py-3">
                            <div className="title">
                                <FormattedMessage id="Name" />
                            </div>
                            <div className="labels">
                                {name}
                            </div>
                        </div>
                        <div className="py-3">
                            <div className="title">
                                <FormattedMessage id="PhoneNumber" />
                            </div>
                            <div className="labels">
                                {cellphoneNumber}
                            </div>
                        </div>
                        <div className="py-3">
                            <div className="title">
                                <FormattedMessage id="Address" />
                            </div>
                            <div className="labels">
                                {address}
                            </div>
                        </div>
                    </div>
                    <button className="buttonCancel">
                        <FormattedMessage id="EditAccount" />
                    </button>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default AccountDetail;