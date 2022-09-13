import React, { useContext } from 'react'
import "./ProductCard.css"
import {Link} from 'react-router-dom';
import AppContext from './../../AppContext';

function ProductCard(props) {
    const context = useContext(AppContext);

    return (
        <div className="ProductCard">
            <Link to={"/productos/"+props.id}>
                <img className="productCard-img" src={props.image} alt="Foto Producto" />
            </Link>
            <div className="productCard-over">
                <p className="productCard-over-text">{props.name}</p>
                <div className="productCard-icons">
                    <Link to="/carrito"><img className="productCard-svg" src="/Assets/Icons/add.svg" alt="Agrgear" onClick={() => {context.addToCart(props.product,true)}} /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
