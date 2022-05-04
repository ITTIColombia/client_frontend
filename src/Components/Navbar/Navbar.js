import "./Navbar.css";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import React from "react";
import {Container, Nav, Navbar as NavbarReact} from "react-bootstrap";

function Navbar() {

    const navigate = useNavigate();

    const intl = useIntl();

    function handleGoCart(event) {
        event.preventDefault();
        navigate("/cart");
    }

    return (
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
                                <span className={window?.location.pathname === '/'? "navbarBootstrap-active": ""}>
                                    <FormattedMessage id="Home"/>
                                </span>
                            </Nav.Link>
                            <Nav.Link className="navbarBootstrap-item"
                                      href="/productos">
                                <span className={window?.location.pathname === '/productos'? "navbarBootstrap-active": ""}>
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
                                <span className={window?.location.pathname === '/artesanos'? "navbarBootstrap-active": ""}>
                                    <FormattedMessage id="Artisans"/>
                                </span>
                            </Nav.Link>
                            <Nav.Link className="navbarBootstrap-item"
                                      href="/nosotros">
                                <span className={window?.location.pathname === '/nosotros'? "navbarBootstrap-active": ""}>
                                    <FormattedMessage id="AboutUs"/>
                                </span>
                            </Nav.Link>
                        </Nav>
                    </NavbarReact.Collapse>
                </Container>
                <div className="navbarBootstrap-logo-sm d-lg-none d-xl-none">
                    <img className="navbarBootstrap-logo-img"
                         src="/Assets/Logos/logoNav.svg"
                         alt="Logo ITTI"/>
                </div>
                <div className="navbarBootstrap-cart">
                    <input className="navbarBootstrap-user-cart"
                           type="image"
                           src="/Assets/Icons/Cart.svg"
                           alt={intl.formatMessage({id: "Cart"})}
                           onClick={handleGoCart}/>
                </div>
            </NavbarReact>
        </div>
    )
}

export default Navbar;