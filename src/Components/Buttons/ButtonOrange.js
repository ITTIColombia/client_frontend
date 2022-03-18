import React from 'react'
import {Link} from 'react-router-dom';
import "./ButtonOrange.css"

function ButtonOrange(props) {
    return (
        <div className='ButtonOrange'>
            <Link to={"/"+props.path}>
                <span>{props.text}</span>
            </Link>
        </div>
    )
}

export default ButtonOrange