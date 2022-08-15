import "./Navbar.css";
import "./Topbar.css";
import {Link, useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import React from "react";
import {Container, Nav, Navbar as NavbarReact} from "react-bootstrap";
import AppContext from "../../AppContext";
import {useContext} from "react";

function isEmpty(object) {
    for (const property in object) {
      return false;
    }
    return true;
  }

function Navbar() {
    const context = useContext(AppContext);

    const navigate = useNavigate();

    const intl = useIntl();

    function handleGoCart(event) {
        event.preventDefault();
        navigate("/carrito");
    }

    function handleChangeLanguage(event) {
        context.setLang(event.target.value);
    }

    function getTotalProducts() {
        let total = 0;
        context.cart.items.forEach(item => {
            total += item.quantity;
        });
        return total;
    }

    const getUserName = () => {
        if (isEmpty(context.user)) {
            return "";
        }
        const username = context.user.attributes.name;
        return username.split(" ")[0];
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className='col-lg-12 col-xl-12 Topbar d-none d-lg-block d-xl-block'>
                        <div className='Topbar-text d-flex justify-content-end'>
                            {context.loggedIn
                            ?
                            <>   
                                <p className="Topbar-text-high"><FormattedMessage id="Welcome"/>{getUserName()}!</p>
                                <Link to="/profile" onClick={context.signOut}><p className='Topbar-text-profile'><FormattedMessage id="Profile"/></p></Link>
                                <Link to="/" onClick={context.signOut}><p className='Topbar-text-center'><FormattedMessage id="SignOut"/></p></Link>
                            </>
                            :
                            <>
                                <Link className="Topbar-text-artisan" to="/signupArtesanos"><p className='Topbar-text-high'><FormattedMessage id="AreYouAnArtisan"/></p></Link>
                                <Link to="/login"><p className='Topbar-text-center'><FormattedMessage id="SignIn"/></p></Link>
                            </>
                            }
                            <button className={ context.languageSettings.locale.startsWith("es") ? 'Topbar-button-active' : 'Topbar-button'} id="ES" value="es" onClick={handleChangeLanguage}>ES</button>
                            <button className={ context.languageSettings.locale.startsWith("en") ? 'Topbar-button-active' : 'Topbar-button'} id="EN" value="en" onClick={handleChangeLanguage}>EN</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="NavbarBootstrap">
                <NavbarReact expand="lg">
                    <Container>
                        <NavbarReact.Toggle aria-controls="basic-navbar-nav"
                                            id="navbarBootstrap-toggle"/>
                        <NavbarReact.Collapse id="basic-navbar-nav"
                                              className="navbarBootstrap-collapse">
                            <Nav className="navbarBootstrap-items-list">
                                <Nav.Link className="navbarBootstrap-item"
                                          id="navbarBootstrap-home-link"
                                          href="/">
                                <span className={window?.location.pathname === '/' ? "navbarBootstrap-active" : ""}>
                                    <FormattedMessage id="Home"/>
                                </span>
                                </Nav.Link>
                                <Nav.Link className="navbarBootstrap-item"
                                          href="/productos">
                                <span className={window?.location.pathname ===
                                '/productos' ? "navbarBootstrap-active" : ""}>
                                    <FormattedMessage id="Products"/>
                                </span>
                                </Nav.Link>
                                <NavbarReact.Brand href="/"
                                                   className="d-none d-lg-block ">
                                    <div className="navbarBootstrap-logo">
                                        <img className="navbarBootstrap-logo-img"
                                             src="/Assets/Logos/logoNav.svg"
                                             alt="Logo ITTI"/>
                                    </div>
                                </NavbarReact.Brand>
                                <Nav.Link className="navbarBootstrap-item"
                                          href="/artesanos">
                                <span className={window?.location.pathname ===
                                '/artesanos' ? "navbarBootstrap-active" : ""}>
                                    <FormattedMessage id="Artisans"/>
                                </span>
                                </Nav.Link>
                                <Nav.Link className="navbarBootstrap-item"
                                          href="/nosotros">
                                <span className={window?.location.pathname ===
                                '/nosotros' ? "navbarBootstrap-active" : ""}>
                                    <FormattedMessage id="AboutUs"/>
                                </span>
                                </Nav.Link>
                                <div className="Topbar-hide-lg">
                                    <button className={ context.languageSettings.locale.startsWith("es") ? 'Topbar-button-active' : 'Topbar-button'} id="ES" value="es" onClick={handleChangeLanguage}>ES</button>
                                    <button className={ context.languageSettings.locale.startsWith("en") ? 'Topbar-button-active' : 'Topbar-button'} id="EN" value="en" onClick={handleChangeLanguage}>EN</button>
                                </div>
                            </Nav>
                            {context.isLoggedIn 
                            ?
                            <div className='Topbar Topbar-text Topbar-hide-lg'>   
                                <div className="topbar-text-hide-are-you">
                                    <p className="Topbar-text-high"><FormattedMessage id="Welcome"/>{/* TODO Tony: Nombre del usuario */}!</p>
                                </div>
                                <div>
                                    <Link to="/profile" onClick={context.signOut}><p className='Topbar-text-profile'><FormattedMessage id="Profile"/></p></Link>
                                </div>
                                <div>
                                    <Link to="/" onClick={context.signOut}><p className='Topbar-text-center'><FormattedMessage id="SignOut"/></p></Link>
                                </div>
                            </div>
                            :
                            <div className='Topbar Topbar-text Topbar-hide-lg'>
                                <div className="topbar-text-hide-are-you">
                                    <Link id="Topbar-text-artisan" to="/signupArtesanos"><p className='Topbar-text-high'><FormattedMessage id="AreYouAnArtisan"/></p></Link>
                                </div>
                                <div>
                                    <Link to="/login"><p className='Topbar-text-center'><FormattedMessage id="SignIn"/></p></Link>
                                </div>
                            </div>
                            }
                        </NavbarReact.Collapse>
                    </Container>
                    <div className="navbarBootstrap-logo-sm d-lg-none d-xl-none">
                        <img className="navbarBootstrap-logo-img"
                             src="/Assets/Logos/logoNav.svg"
                             alt="Logo ITTI"/>
                    </div>
                    <div className="navbarBootstrap-cart">
                        {/*<input className="navbarBootstrap-user-cart"
                               type="image"
                               src="/Assets/Icons/Cart.svg"
                               alt={intl.formatMessage({id: "Cart"})}
                                onClick={handleGoCart}/>*/}
                        {/*context.cart.items.length > 0 && <a className="navbarBootstrap-cart-count-label">{getTotalProducts()}</a>*/}
                        
                        <img className="navbarBootstrap-user-cart" src="/Assets/Icons/Cart.svg" alt={intl.formatMessage({id: "Cart"})} onClick={handleGoCart}></img>

                        {context.cart.items.length > 0 && <span className='navbarBootstrap-cart-count-label' onClick={handleGoCart}> {getTotalProducts()} </span>}
                    </div>                
                </NavbarReact>
            </div>
        </React.Fragment>

    )
}

export default Navbar;