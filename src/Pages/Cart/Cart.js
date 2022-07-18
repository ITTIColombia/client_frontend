import './Cart.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ButtonOrange from "../../Components/Buttons/ButtonOrange";
import React, {useLayoutEffect, useState, useContext} from "react";
import {FormattedMessage, FormattedNumber} from "react-intl";
import {Modal} from "react-bootstrap";
import AppContext from './../../AppContext';


function Cart() {
    const context = useContext(AppContext);

    const [showModal, setShowModal] = useState(false);

/*    const [shoppingCart, setShoppingCart] = useState(mapProductsList(products));

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
*/

    function checkout() {
        // TODO: Conexion con API de Whastapp para lograr concluir la venta
        setShowModal(false);
        context.clearCart();
    }

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <React.Fragment>
            <Navbar/>
            <div id="Cart">
                <Modal show={showModal}
                       className="cart-modal"
                       size="lg"
                       dialogClassName="modal-90w"
                       onHide={() => {
                           setShowModal(false)
                       }}>
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <h3><FormattedMessage id="CartModalTitle1"/> <span className="orange">IT<span>T</span>I</span>
                            <FormattedMessage id="CartModalTitle2"/>
                        </h3>
                        <p><FormattedMessage id="CartModalMessage"/></p>
                        <button
                            type="submit"
                            className="btn text-uppercase cart-button"
                            onClick={checkout}><FormattedMessage id="GoToCheckout"/>
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
                        <div className='col-12 col-lg-9 cart-table-row'>
                            {context.cart.items.length > 0 ? <table>
                                <thead>
                                <tr className="text-uppercase">
                                    <th><FormattedMessage id="Item"/></th>
                                    <th></th>
                                    <th className="cart-hide-sm"><FormattedMessage id="UnitPrice"/></th>
                                    <th><FormattedMessage id="Quantity"/></th>
                                    <th className="cart-hide-sm"><FormattedMessage id="FinalPrice"/></th>
                                    <th><FormattedMessage id="Remove"/></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan="6">
                                        <hr/>
                                    </td>
                                </tr>
                                {
                                context.cart.items.map((item, index) => {
                                    const product = item.product;
                                    const itemPrice = item.product.price * item.quantity;
                                    return (
                                        <tr key={`cart-item-${index}`}>
                                            <td><img src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/artisans/${product.artisan}/`+product.media.photos[0]} alt="product"/></td>
                                            <td>{product.name}<span className="cart-hide-lg"><br/>${itemPrice}</span></td>
                                            <td className="cart-hide-sm">${product.price}</td>
                                            <td>
                                                    <button onClick={() => context.substractToCart(product)}>-</button>
                                                    {item.quantity}
                                                    <button onClick={() => context.addToCart(product)}>+</button>
                                            </td>
                                            <td className="cart-hide-sm">${itemPrice}</td>
                                            <td>
                                                <button onClick={() => context.removeFromCart(product)}>X</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                            </table> : 
                                <div className="container-fluid cart-container">
                                    <h2 className="d-flex justify-content-between bd-highlight mb-3">
                                        <span className="bd-highlight"><FormattedMessage id="NoItems"/></span>
                                    </h2>
                                    <ButtonOrange path="productos" text="SeeProducts">Browse</ButtonOrange>
                                </div>
                            }
                        </div>
                        <div className="col-12 col-lg-3 cart-summary-col">
                            <h2><FormattedMessage id="Summary"/></h2>
                            <p className="d-flex justify-content-between bd-highlight mb-3">
                                <span className="bd-highlight text-uppercase cart-summary-cost"><FormattedMessage id="Subtotal"/></span><span className="bd-highlight">$<FormattedNumber value={context.cart.totalPrice}/></span>
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
                                <span className="bd-highlight text-uppercase"><FormattedMessage id="ShippingCost"/></span>
                                <span className="bd-highlight">$<FormattedNumber value={context.cart.totalPrice}/></span>
                            </p>
                            <hr className="cart-divisor-line"/>
                            <p className="d-flex justify-content-between bd-highlight mb-3">
                                <span className="bd-highlight text-uppercase cart-summary-cost"><FormattedMessage id="ServiceCost"/></span>
                                <span className="bd-highlight">$<FormattedNumber value={context.cart.totalPrice * 0.03}/></span>
                            </p>
                            <p className="d-flex justify-content-between bd-highlight mb-3 text "
                               id="cart-total-region">
                                <span className="bd-highlight text-uppercase"><FormattedMessage id="Total"/></span><span className="bd-highlight">$<FormattedNumber value={context.cart.totalPrice *
                                1.03}/></span>
                            </p>
                            {context.cart.items.length > 0 && <button type="submit"
                                    className="btn text-uppercase cart-button"
                                    onClick={() => {
                                        setShowModal(true)
                                    }}><FormattedMessage id="Checkout"/>
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>

    )
}

export default Cart;