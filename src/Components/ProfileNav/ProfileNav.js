import "./ProfileNav.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";
import { FormattedMessage } from "react-intl";
import { Link, Routes, Route } from "react-router-dom";

function ProfileNav(props) {

    const context = useContext(AppContext);



    return (
        <React.Fragment>
                <div className="d-flex justify-content-left">
                    <div className="d-flex flex-row ml-5">
                        <div className="px-3">
                            <Link to={`/profile`} className="detail">
                                <label className={`${props.tab==1 ? "Selectedlabel" : "labels"}`}>
                                    <FormattedMessage id="OrdersCapital" />
                                </label>
                            </Link>
                        </div>
                        <div className="px-3">
                            <Link to={`/profile/account`} className="col detail">
                                <label className={`${props.tab==2 ? "Selectedlabel" : "labels"}`}>
                                    <FormattedMessage id="Account" />
                                </label>
                            </Link>
                        </div>
                        <div className="px-3">
                            <Link to={`/profile/settings`} className="col detail">
                                <label className={`${props.tab==3 ? "Selectedlabel" : "labels"}`}>
                                    <FormattedMessage id="Settings" />
                                </label>
                            </Link>
                        </div>
                    </div>

                </div>
                <div>
                    <hr>
                    </hr>
                </div>


        </React.Fragment>
    );
}

export default ProfileNav;