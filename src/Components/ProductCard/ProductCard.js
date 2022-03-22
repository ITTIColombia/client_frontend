import React from 'react'
import "./ProductCard.css"
import {Link} from 'react-router-dom';
import like from "../../Assets/Icons/like.svg";
import add from "../../Assets/Icons/add.svg";

function ProductCard(props) {
    return (
        <div className="ProductCard">
            <Link to={"/producto/"+props.index}>
                <img className="productCard-img" src={require('../../Assets/Photos/Products/foto'+props.index+'.png')} alt="Foto Producto" /> 
            </Link>
            <div className="productCard-over">
                <p className="productCard-over-text">{props.name}</p>
                <div className="productCard-icons">
                    <Link  to="/marcas"><img className="productCard-svg" src={like} alt="Like" /></Link>
                    <Link to="/marcas"><img className="productCard-svg" src={add} alt="Agrgear" /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
