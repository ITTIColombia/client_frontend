import React, { useEffect, useState, useContext } from 'react'
import "./OrderDetail.scss"
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { Grid } from '@aws-amplify/ui-react';
import AppContext from '../../AppContext';

import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileNav from '../../Components/ProfileNav/ProfileNav';

const formatPrice = (number) => {
    if (number == undefined)
        return undefined
    const numberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return numberFormat.format(number)
}

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

    const [purchase, setPurchase] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    /*const [orders, setOrders] = useState([]);
    const orderItems = orders.flatMap((orders) => orders.orderItems)
    const products = orderItems.flatMap((orderItems) => orderItems.product)
    console.log(products)*/

    useEffect(() => {
        const fetchPurchase = async () => {
            try {
                setIsLoading(true)

                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/purchases/${params._id}/?token=${process.env.REACT_APP_TOKEN}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
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
            }
            catch (error) {
                console.log("Error receiving purchases:", error)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchPurchase()
    }, [])


    // Retrieve Purchases from backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/purchases/${params._id}/orders/?token=${process.env.REACT_APP_TOKEN}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                const orders = await res.json()
                const productIds = orders.flatMap((orders) => orders.orderItems.map((orderItem) => orderItem.product))
                const products = await Promise.all(productIds.map(fetchProduct))
                console.log(products)
                setProducts(products)
            } catch (error) {
                console.log("Error recieving orders", error)
            }

        }
        fetchOrders()
    }, [])


    const fetchProduct = async (productId) => {
        try {

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            return await res.json()
        }
        catch (error) {
            console.log("Error receiving purchases:", error)
        }
    }



    const PurchaseProductDetail = (props) => {
        const { product } = props
        const [artisan, setArtisan] = useState()
        useEffect(() => {
            const fetchArtisan = async () => {
                try {
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/artisans/${product.artisan}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    })
                    setArtisan(await res.json())
                }
                catch (error) {
                    console.error("error retreiving artisan");
                }
            }
            fetchArtisan()
        }, [])

        if (!artisan) {
            return null
        }
        return (
            <div className="product row">
                <img className='col-6' src={`https://${process.env.REACT_APP_BUCKET_ID}.s3.amazonaws.com/artisans/${product.artisan}/${product.media.photos[0]}`} alt="imagen" />
                <div className='col-6 px-4'>
                    <div className="productArtisan">{artisan.name}</div>
                    <div className="productName">{product.name}</div>
                    <p></p>
                    <div className="productPrice">{formatPrice(product.price)}</div>
                </div>
            </div>
        )
    }



    return (
        <React.Fragment>
            <Navbar />
            {isLoading ?
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div> :
                <div className="d-flex justify-content-center">
                    <div className="order-container">

                        <ProfileNav tab={1} />
                        <div className="d-flex justify-content-start mb-5">
                            <FormattedMessage id="OrdersCapital" /> {' > '}
                            <FormattedMessage id="Order" /> {`# ${purchase?._id ?? ""} >`}
                            <br />
                        </div>
                        <div className="row">
                            {
                                purchase &&
                                <div className="col-6">
                                    <div className='mb-4'>
                                        <div className="title"><FormattedMessage id="OrderInfo" /> </div>
                                        <p></p>
                                        <div className="content mb-1"><FormattedMessage id="Date" />: {new Date(purchase.createdAt).toLocaleDateString()}</div>
                                        <div className="content mb-1" ><FormattedMessage id="DeliveryMethod" />: <FormattedMessage id="National" /></div>
                                    </div>
                                    <div className='mb-4'>
                                        <div className="title"><FormattedMessage id="DeliveryData" /> </div>
                                        <p></p>
                                        <div className="content mb-1">{_id}</div>
                                        <div className="content mb-1">{address}</div>
                                        <div className="content mb-1">{department}, {city}, {postalCode}</div>
                                        <div className="content mb-1">{country}</div>
                                        <div className="content mb-1">{cellphoneNumber}</div>
                                    </div>

                                    <div className='mb-4'>
                                        <div className="title"><FormattedMessage id="InvoiceData" /></div>
                                        <p></p>
                                        <div className="content mb-1">{_id}</div>
                                        <div className="content mb-1">{address}</div>
                                        <div className="content mb-1">{department}, {city}, {postalCode}</div>
                                        <div className="content mb-1">{country}</div>
                                        <div className="content mb-1">{cellphoneNumber}</div>
                                    </div>
                                    <Link to="#" className="detail"><FormattedMessage id="DownloadInvoice" /> </Link>

                                </div>
                            }
                            <div className="col-6">
                                <div className="title"><FormattedMessage id="OrderDetails" /> {purchase?.media.length ?? "##"} <FormattedMessage id="Products" />
                                </div>
                                <div className="invoice">
                                    <div className="row">
                                        {products.map((product, index) =>
                                            <PurchaseProductDetail product={product} />
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <label className="price"> SUBTOTAL </label>
                                    <label className="price"> {`${formatPrice(purchase?.price) ?? ""}`} </label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label className="price"> <FormattedMessage id="Taxes" />  </label>
                                    <label className="price"> {formatPrice(0)} </label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label className="price"> <FormattedMessage id="Service" />  </label>
                                    <label className="price"> {formatPrice(3.28)} </label>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <label className="priceDark"> TOTAL  </label>
                                    <label className="priceDark"> {formatPrice(purchase?.price + 3.28)} </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
            <Footer />
        </React.Fragment>
    );

}   