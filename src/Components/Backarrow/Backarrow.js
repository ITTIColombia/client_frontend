import React from 'react'
import {Link} from 'react-router-dom';
import back from "../../../assets/Icons/backarrow.svg";
import "./Backarrow.css";

function Backarrow(props) {
    return (
        <div className="Backarrow">
            <Link to={props.path}>
                <img className="backarrow-img" src={back} alt="Flecha"/>
                <p>{"VOLVER A "+props.name}</p>
            </Link>
        </div>
    )
}

export default Backarrow