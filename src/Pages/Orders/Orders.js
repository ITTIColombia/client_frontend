import React, {useEffect, useLayoutEffect, useState} from 'react'
import "./Orders.scss"
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Progress from '../../Components/Progress/Progress';
import OrderCard from '../../Components/OrderCard/OrderCard';

export default function Orders() {
    const [orders, setOrders] = useState([]);
        // Retrieve Purchases from backend
        useEffect(()=> {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/purchases/?token=${process.env.REACT_APP_TOKEN}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then((res)=>{
                if(res.status === 200){
                    res.json().then(json=>{
                        setOrders(json)
                    }).catch(err=>{
                        console.log("Error extracting json:", err)
                    })
                }else if(res.status === 204){   
                    setOrders([])
                }
            }).catch(err=>{
                console.log("Error receiving purchases:", err)
            })
        }, [])
    
    return(
        <>
            
            {orders.map((order) =>
                   <OrderCard id={order._id} purchaseStatus={order.purchaseStatus} price={order.price} key={order._id} media={order.media} city={order.city} country={order.country}/>
                )}
            
            
        </>
    );
    
}