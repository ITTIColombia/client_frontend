import './Cart.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React, {useLayoutEffect, useMemo, useState} from "react";
import {FormattedMessage, FormattedNumber} from "react-intl";
import products from "../../Mockup/Product/ProductsUserTesting";
import {Modal} from "react-bootstrap";


function Cart() {

    const [showModal, setShowModal] = useState(false)

    const [shoppingCart, setShoppingCart] = useState(mapProductsList(products))

    const totalValue = useMemo(() => Object.keys(shoppingCart).reduce((cumulativeSum, currentKey) => {
        const productElement = shoppingCart[currentKey];
        return cumulativeSum + (productElement["product"].price * productElement.quantity);
    }, 0), [shoppingCart])

    function mapProductsList(productsList) {
        const productsObject = {};
        productsList.forEach(product => {
            if (product["_id"]) {
                productsObject[product["_id"]] = {product, quantity: 1}
            }
        })
        return productsObject;
    }

    function getAddSubtractQty(_id, qty) {
        if (shoppingCart[_id]) {
            setShoppingCart({
                ...shoppingCart, [_id]: {
                    quantity: shoppingCart[_id].quantity + qty,
                    product: shoppingCart[_id].product
                }
            })

        }
    }

    function remove(_id) {
        const newShoppingCart = {...shoppingCart}
        delete newShoppingCart[_id]
        setShoppingCart(newShoppingCart)
    }

    function checkout(){
        // TODO: Conexion con API de Whastapp para lograr concluir la venta
        setShowModal(false);
        setShoppingCart({})
    }

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })

    return (
        <React.Fragment>
            <Navbar/>
            <div className="Cart">
                <Modal show={showModal} className="cart-modal" size="lg" dialogClassName="modal-90w" onHide={()=>{setShowModal(false)}}>
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <h3><FormattedMessage id="CartModalTitle1"/> <span className="orange">IT<span>T</span>I</span> <FormattedMessage id="CartModalTitle2"/></h3>
                        <p><FormattedMessage id="CartModalMessage"/></p>
                        <button
                            type="submit"
                            className="btn text-uppercase cart-button" onClick={checkout}><FormattedMessage id="GoToCheckout"/>
                        </button>
                    </Modal.Body>
                </Modal>
                <div className="container-fluid cart-container">
                    <div className="row">
                        <div className='col-12'>
                            <h1><FormattedMessage id="ShoppingBag"/></h1>
                            <p><FormattedMessage id="ShoppingCartMessage"/></p>
                        </div>
                    </div>
                    <div className='row cart-table-summary-row'>
                        <div className='col-9 cart-table-row'>
                            <table>
                                <thead>
                                <tr className="text-uppercase">
                                    <th><FormattedMessage id="Item"/></th>
                                    <th></th>
                                    <th><FormattedMessage id="UnitPrice"/></th>
                                    <th><FormattedMessage id="Quantity"/></th>
                                    <th><FormattedMessage id="FinalPrice"/></th>
                                    <th><FormattedMessage id="Remove"/></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan="6">
                                        <hr/>
                                    </td>
                                </tr>
                                {Object.keys(shoppingCart).map((productKey, i) => {
                                    const product = shoppingCart[productKey].product;
                                    const finalPrice = shoppingCart[productKey].quantity * product.price;
                                    return (
                                        <tr key={`cart-item-` + i}>
                                            <td><img src={product.media[0]["Photo1"]}/></td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button onClick={()=>getAddSubtractQty(productKey, -1)}>-</button>
                                                {shoppingCart[productKey].quantity}
                                                <button onClick={()=>getAddSubtractQty(productKey, 1)}>+</button>
                                            </td>
                                            <td>{finalPrice}</td>
                                            <td><button onClick={()=>remove(productKey)}>X</button></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-3 cart-summary-col">
                            <h2><FormattedMessage id="Summary"/></h2>
                            <p className="d-flex justify-content-between bd-highlight mb-3">
                                <span className="bd-highlight text-uppercase cart-summary-cost"><FormattedMessage id="Subtotal"/></span><span className="bd-highlight">$<FormattedNumber value={totalValue}/></span>
                            </p>
                            <p className="d-flex justify-content-between bd-highlight mb-3">
                                <span className="bd-highlight text-uppercase cart-summary-cost"><FormattedMessage id="Tax"/></span><span className="bd-highlight">$0</span>
                            </p>
                            <hr className="cart-divisor-line"/>
                            <p className="d-flex justify-content-between bd-highlight mb-3">
                                <span className="bd-highlight"><FormattedMessage id="EnterLocation"/></span><span className="bd-highlight"><img className="backarrow-img"
                                                                                                                                                src="/Assets/Icons/rightarrow.svg"
                                                                                                                                                alt="Arrow"/></span>
                            </p>
                            <hr id="cart-underline-location"/>
                            <p className="d-flex justify-content-between bd-highlight mb-3">
                            <span className="bd-highlight text-uppercase"><FormattedMessage id="ShippingCost"/>
                            </span><span className="bd-highlight">$<FormattedNumber value={totalValue}/></span>
                            </p>
                            <hr className="cart-divisor-line"/>
                            <p className="d-flex justify-content-between bd-highlight mb-3">
                                <span className="bd-highlight text-uppercase cart-summary-cost"><FormattedMessage id="ServiceCost"/></span>
                                <span className="bd-highlight">$<FormattedNumber value={totalValue*0.03}/></span>
                            </p>
                            <p className="d-flex justify-content-between bd-highlight mb-3 text " id="cart-total-region">
                                <span className="bd-highlight text-uppercase"><FormattedMessage id="Total"/></span><span className="bd-highlight">$<FormattedNumber value={totalValue*1.03}/></span>
                            </p>
                            <button type="submit"
                                    className="btn text-uppercase cart-button" onClick={()=>{setShowModal(true)}}><FormattedMessage id="Checkout"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>

    )
}

export default Cart;