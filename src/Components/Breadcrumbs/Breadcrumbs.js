import React from 'react'
import {Link} from 'react-router-dom';
import bread from "../../Assets/Icons/chevronRight.svg";
import "./Breadcrumbs.css";

function Breadcrumbs(props) {
    return (
        <div className='Breadcrumbs'>
            <Link to={props.path}>
                <p>{props.pathName}</p>
            </Link>
            <img className="bread-icon" src={bread} alt="Chevron"/>
            <p>{props.name}</p>
        </div>
    )
}

export default Breadcrumbs