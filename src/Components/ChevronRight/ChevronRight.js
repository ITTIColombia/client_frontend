import React from "react";
import {Link} from "react-router-dom";
import "./ChevronRight.css";

function ChevronRight(props){
    return (
        <div className="ChevronRight">
            <Link to={props.path}>
                <img className="chevron-img" src="/Assets/Icons/chevronRight.svg" alt="Flecha"/>
            </Link>
        </div>
    )
}

export default ChevronRight;