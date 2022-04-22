import './Cart.css';
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import products from "../../Mockup/Product/Products";


function Cart(){

    function mapProductsList(productsList){
        const productsObject = {};
        productsList.forEach(product => {
            if(product["_id"]){
                productsObject[product["_id"]] = {product, quantity:1}
            }
        })
        return productsObject;
    }

    function getAddSubtractQty(_id, qty){
        if(shoppingCart[_id]){
            setShoppingCart({...shoppingCart, _id:{quantity:shoppingCart[_id].quantity+qty,
                    product: shoppingCart[_id].product}})
        }
    }

    function remove(_id){
        const copyShoppingCart = {...shoppingCart};
        delete copyShoppingCart._id;
        setShoppingCart(copyShoppingCart);
    }



    const [shoppingCart, setShoppingCart] = useState(mapProductsList(products))

    useEffect(()=>{
        console.log(shoppingCart)
    })

    return (
        <div className="Cart">
            <Topbar/>
            <Navbar/>
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
                            <hr id="cart-table-divisor"/>
                            <tbody>
                            {Object.keys(shoppingCart).map(productKey => {
                                const product = shoppingCart[productKey].product;
                                const finalPrice = shoppingCart[productKey].quantity * product.price;
                                return (
                                    <tr>
                                        <td><img src={product.media[0]["Photo1"]}/></td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{shoppingCart[productKey].quantity}</td>
                                        <td>{finalPrice}</td>
                                        <td>X</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-3 cart-summary-col">
                        <h2><FormattedMessage id="Summary"/></h2>
                        <p className="d-flex justify-content-between bd-highlight mb-3">
                            <span className="bd-highlight text-uppercase"><FormattedMessage id="Subtotal"/></span><span className="bd-highlight">$243</span>
                        </p>
                        <p className="d-flex justify-content-between bd-highlight mb-3">
                            <span className="bd-highlight text-uppercase"><FormattedMessage id="Tax"/></span><span className="bd-highlight">$0</span>
                        </p>
                        <p className="d-flex justify-content-between bd-highlight mb-3">
                            <span className="bd-highlight text-uppercase"><FormattedMessage id="EnterLocation"/></span><span className="bd-highlight">-></span>
                        </p>
                        <p className="d-flex justify-content-between bd-highlight mb-3">
                            <span className="bd-highlight text-uppercase"><FormattedMessage id="ShippingCost"/></span><span className="bd-highlight">$3</span>
                        </p>
                        <p className="d-flex justify-content-between bd-highlight mb-3">
                            <span className="bd-highlight text-uppercase"><FormattedMessage id="ServiceCost"/></span><span className="bd-highlight">$12</span>
                        </p>
                        <p className="d-flex justify-content-between bd-highlight mb-3">
                            <span className="bd-highlight text-uppercase"><FormattedMessage id="Total"/></span><span className="bd-highlight">$999.000</span>
                        </p>

                    </div>
                </div>


            </div>

            <Footer/>
        </div>
    )
}

export default Cart;