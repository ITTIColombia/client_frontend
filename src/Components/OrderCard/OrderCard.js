import React, {useEffect, useContext, useState} from 'react'
import "./OrderCard.scss"
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Progress from '../../Components/Progress/Progress';
import AppContext from './../../AppContext';

const formatPrice = (number) => {
    if(number== undefined)
    return undefined
    const numberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return numberFormat.format(number)
}

export default function OrderCard(props) {
    const context = useContext(AppContext);
    
    console.log(props.media)
    
    return(
            <div className="container">
                <div className="row orders-content">
                    <div className="col-md-3"><Progress></Progress></div>
                    <div className="col-md-9">
                        <div className="order-content">
                            <div className="details">
                                <div className="left">
                                    <div className="state"><span className="color"></span><p>{props.purchaseStatus}</p> </div>
                                    <div className="products"> <p>{props.media.length} <FormattedMessage id="Products" /> </p></div>
                                    <div className="price"> <p>{formatPrice(props.price)}</p></div>
                                </div>
                                <div className="right">
                                    <div className="order"><FormattedMessage id="Order" />  # <span>{props.id}</span></div>
                                    <div className="address"><FormattedMessage id="SendTo" />  <span><p>{props.city}, {props.country}</p></span></div>
                                    <Link to={`/compras/${props.id}`} className="detail"><FormattedMessage id="Details" /> </Link>
                                </div>
                            </div>
                            <div className="products">
                            {props.media.map((productImage, index) => 
                                <Link to="#" className="product" key={index}>
                                    <img src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/artisans/${productImage}`} alt="imagen"  />
                                    </Link>
                                )}
                         </div>
                            <button>
                            <FormattedMessage id="Cancel" /> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        
    );
    
}