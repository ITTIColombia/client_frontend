import "./NavbarBootstrap.css";
import {NavLink, useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import React from "react";
import NavbarITTI from "./Navbar";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

function NavbarBootstrap() {

    const navigate = useNavigate();

    const intl = useIntl();

    function handleGoCart(event) {
        event.preventDefault();
        navigate("/cart");
    }

    return (
        <div id="NavbarBootstrap">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"
                                   id="navbarBootstrap-toggle"/>
                    <Navbar.Collapse id="basic-navbar-nav"
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
                            <Navbar.Brand href="/"
                                          className="d-none d-lg-block ">
                                <div className="navbarBootstrap-logo">
                                    <img className="navbarBootstrap-logo-img"
                                         src="/Assets/Logos/logoNav.svg"
                                         alt="Logo ITTI"/>
                                </div>
                            </Navbar.Brand>
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
                    </Navbar.Collapse>
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
            </Navbar>
        </div>
    )
}

export default NavbarBootstrap;