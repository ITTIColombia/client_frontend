import React from 'react'
import "./ProductCard.css"
import {Link} from 'react-router-dom';

function ProductCard(props) {
    return (
        <div className="ProductCard">
            <Link to={"/productos/"+props.index}>
                <img className="productCard-img" src={props.image} alt="Foto Producto" />
            </Link>
            <div className="productCard-over">
                <p className="productCard-over-text">{props.name}</p>
                <div className="productCard-icons">
                    {/*<Link  to="/marcas"><img className="productCard-svg" src="/Assets/Icons/like.svg" alt="Like" /></Link>*/}
                    <Link to="/marcas"><img className="productCard-svg" src="/Assets/Icons/add.svg" alt="Agrgear" /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
