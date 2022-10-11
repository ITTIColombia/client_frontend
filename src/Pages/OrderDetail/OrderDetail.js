import React, { useEffect, useState, useContext } from 'react'
import "./OrderDetail.scss"
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { Grid } from '@aws-amplify/ui-react';
import AppContext from './../../AppContext';

import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

export default function OrderDetail() {

    const context = useContext(AppContext);
    let params = useParams();
    const {
        address,
        postalCode,
        city,
        department,
        cellphoneNumber,
        country,
        _id,
    } = context.user

    const [purchase, setPurchase] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        console.log("BUENAS");
        fetch(`${process.env.REACT_APP_BACKEND_URL}/purchases/${params._id}/?token=${process.env.REACT_APP_TOKEN}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(json => {
                    setPurchase(json)
                    setIsLoading(false)
                }).catch(err => {
                    console.log("Error extracting json:", err)
                })
            } else if (res.status === 204) {
                setPurchase([])
            }
        }).catch(err => {
            console.log("Error receiving purchases:", err)
        })
    }, [])

    return (
        <React.Fragment>
            <Navbar />
            <div className="container-fluid">
                {isLoading ?
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div> :
                    <div className="d-flex flex-column">
                        <div className="content-order"><FormattedMessage id="OrdersCapital" /> {' > '} <FormattedMessage id="Order" /> # 102 </div>


                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column">
                                <div className="row-content">
                                    <div className="title"><FormattedMessage id="OrderInfo" /> </div>
                                    <div className="content"><FormattedMessage id="Date" /> {purchase.createdAt}</div>
                                    <div className="content"><FormattedMessage id="DeliveryMethod" /> :<FormattedMessage id="National" /></div>

                                    <div className="title"><FormattedMessage id="DeliveryData" /> </div>
                                    <div className="content">{_id}</div>
                                    <div className="content">{address}</div>
                                    <div className="content">{department}, {city}, {postalCode}</div>
                                    <div className="content">{country}</div>
                                    <div className="content">{cellphoneNumber}</div>

                                    <div className="title"><FormattedMessage id="InvoiceData" /></div>
                                    <div className="content">{_id}</div>
                                    <div className="content">{address}</div>
                                    <div className="content">{department}, {city}, {postalCode}</div>
                                    <div className="content">{country}</div>
                                    <div className="content">{cellphoneNumber}</div>
                                </div>


                                <Link to="#" className="detail"><FormattedMessage id="DownloadInvoice" /> </Link>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="row-content">
                                    <div className="title"><FormattedMessage id="OrderDetails" /> {purchase.media.length} <FormattedMessage id="Products" /></div>
                                    <div className="invoice">
                                        {purchase.media.map((productImage, index) =>
                                            <Link to="#" className="product" key={index}>
                                                <img src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/artisans/${productImage}`} alt="imagen" />
                                                <div className="product">name</div>
                                                <div className="content">Price</div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
            <Footer />
        </React.Fragment>
    );

}