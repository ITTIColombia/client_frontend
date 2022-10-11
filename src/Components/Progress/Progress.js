import { Link } from "react-router-dom";
import React from "react";
import './Progress.scss';
import { FormattedMessage } from "react-intl";

function Progress(props) {

    const {
        createdDate,
        processedDate,
        sentDate,
        deliveredDate
    } = props;

    return (
        <span id="Progress">
            <div className="grid">
                <div className="rowCell">
                    <div className="step">
                        <img className="circle" src="/Assets/ProgressItems/Ellipse43.svg" alt="" />
                    </div>
                    <div className="step-caption">
                        <FormattedMessage id="OrderCreated" />
                        {/*createdDate ? <p>{createdDate}</p> : ""*/}
                        <p>20-03-1998</p>
                    </div>
                </div>
                <div className="rowCell">
                    <div className="step path">
                        <div className="bar filled" />
                        {
                            processedDate ?
                                <img className="circle" src="/Assets/ProgressItems/Ellipse43.svg" alt="" /> :
                                <img className="circle" src="/Assets/ProgressItems/Ellipse 45.svg" alt="" />
                        }
                    </div>
                    <div className="step-caption">
                        <FormattedMessage id="Processing" />
                        {processedDate ? <p>{processedDate}</p> : ""}
                    </div>
                </div>
                <div className="rowCell">
                    <div className="step path">
                        {
                            processedDate ?
                                <div className="bar filled" /> :
                                <div className="bar not-filled" />
                        }
                        {
                            processedDate ?
                                sentDate ? <img className="circle" src="/Assets/ProgressItems/Ellipse 43.svg" alt="" /> :
                                    <img className="circle" src="/Assets/ProgressItems/Ellipse 45.svg" alt="" /> :
                                <img className="circle" src="/Assets/ProgressItems/Ellipse 46.svg" alt="" />
                        }
                    </div>
                    <div className="step-caption">
                        <FormattedMessage id="Sent" />
                        {sentDate ? <p>{sentDate}</p> : ""}
                    </div>
                </div>
                <div className="rowCell">
                    <div className="step path">
                        {
                            sentDate ?
                                <div className="bar filled" /> :
                                <div className="bar not-filled" />
                        }
                        {
                            sentDate ?
                                deliveredDate ? <img className="circle" src="/Assets/ProgressItems/Ellipse 43.svg" alt="" /> :
                                    <img className="circle" src="/Assets/ProgressItems/Ellipse 45.svg" alt="" /> :
                                <img className="circle" src="/Assets/ProgressItems/Ellipse 46.svg" alt="" />
                        }
                    </div>
                    <div className="step-caption">
                        <FormattedMessage id="Delivered" />
                        {deliveredDate ? <p>{deliveredDate}</p> : ""}
                    </div>
                </div>
            </div>
        </span >
    )
}

export default Progress;