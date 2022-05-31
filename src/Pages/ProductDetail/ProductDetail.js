import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import "./ProductDetail.css";
import Bread from '../../Components/Breadcrumbs/Breadcrumbs';
import ButtonOrange from '../../Components/Buttons/ButtonOrange';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Products from "../../Mockup/Product/Products";
import {FormattedMessage, useIntl} from "react-intl";
import AppContext from "../../AppContext";
import {useContext} from "react";

function ProductDetail() {

    const context = useContext(AppContext)

    const intl = useIntl();

    let params = useParams();

    const [product, setProduct] = useState({});

    const [artisan, setArtisan] = useState({});

    const [department, setDepartment] = useState({});

    const [contentURL, setContentURL] = useState(undefined);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${params._id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(json => {
                    setProduct(json)
                }).catch(err => {
                    console.log("Error extracting json:", err)
                })
            } else {
                setProduct({})
            }
        }).catch(err => {
            console.log("Error receiving artisans:", err)
        })
    }, [params._id])

    useEffect(() => {
        if (product.artisan) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/artisans/${product.artisan}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(json => {
                        setArtisan(json)
                    }).catch(err => {
                        console.log("Error extracting json:", err)
                    })
                } else {
                    setArtisan({})
                }
            }).catch(err => {
                console.log("Error receiving artisans:", err)
            })
        }
    }, [product])

    useEffect(() => {
        if (artisan.department) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/departments/${artisan.department}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(json => {
                        setDepartment(json)
                    }).catch(err => {
                        console.log("Error extracting json:", err)
                    })
                } else {
                    setDepartment({})
                }
            }).catch(err => {
                console.log("Error receiving artisans:", err)
            })
        }
    }, [artisan])

    useEffect(() => {
        if (product.artisan) {
            setContentURL(`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/artisans/${product.artisan}`)
        } else {
            setContentURL(undefined)
        }
    }, [product])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <React.Fragment>
            <Navbar/>
            <div id="ProductDetail">
                <Bread pathName={intl.formatMessage({id: "Products"})}
                       path="/productos"
                       name={product.name}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block">
                            <img id="productDetail-main-image"
                                 src={product.media?.photos?.[0] ?
                                     `${contentURL}/${product.media.photos[0]}` : ""}
                                 alt="Front Product Image"/>
                        </div>
                        <div className="col-12 col-lg-6"
                             id="productDetail-productDescription-col">
                            <div id="productDetail-productDescription-container">
                                <p>{artisan.name}</p>
                                <h1>{product.name}</h1>
                                <p>{context.languageSettings.locale.startsWith(
                                    "en") ? product.descriptionEN : product.descriptionES}</p>
                                <p>
                                    <span className="productDetail-productTag">
                                        <FormattedMessage id="Type"/></span> - {product.productType ?
                                    <FormattedMessage id={product.productType}/> : ""}<br/>
                                    <span className="productDetail-productTag">
                                        <FormattedMessage id="Labour"/> </span> - {product.productLabour ?
                                    <FormattedMessage id={product.productLabour}/> : ""}<br/>
                                    <span className="productDetail-productTag">
                                         <FormattedMessage id="Technique"/></span> - {context.languageSettings.locale.startsWith(
                                    "en") ? product.techniqueEN : product.techniqueES}<br/>
                                    <span className="productDetail-productTag">
                                        <FormattedMessage id="ElaborationTime"/></span> - {product.fabricationDays}
                                    <FormattedMessage id="Days"/>
                                </p>
                                <p className='productDetail-price'>${product.price}</p>
                                <div id="productDetail-buttonOrange-container">
                                    <ButtonOrange path="cart"
                                                  text="AddToCart"/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row"
                         id="productDetail-images-row">
                        <div className="col-12 col-lg-4">
                            <img src={product.media?.photos?.[0] ?
                                `${contentURL}/${product.media.photos[0]}` : ""}
                                 alt="Foto Producto"/>
                        </div>
                        <div className="col-12 col-lg-4">
                            <img src={product.media?.photos?.[1] ?
                                `${contentURL}/${product.media.photos[1]}` : ""}
                                 alt="Foto Producto"/>
                        </div>
                        <div className=" col-12 col-lg-4">
                            <img src={product.media?.photos?.[2] ?
                                `${contentURL}/${product.media.photos[2]}` : ""}
                                 alt="Foto Producto"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7 col-lg-4">
                            <img id="productDetail-map"
                                 src={department.mapColorRegion ? `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/frontend/departments/${department.mapColorRegion}` : ""}
                                 alt="Mapa Colombia"/>
                        </div>
                        <div className="col-5 d-block d-lg-none">
                            <div id="productDetail-subtitle-container">
                                <h2>
                                    <FormattedMessage id="TheWorldOfArtisans"
                                                      values={{
                                                          span: (chunks) =>
                                                              <span className="productDetail-italic">{chunks}</span>
                                                      }}/>
                                </h2>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8">
                            <h2 className="d-none d-lg-block">
                                <FormattedMessage id="TheWorldOfArtisans"
                                                  values={{
                                                      span: (chunks) =>
                                                          <span className="productDetail-italic">{chunks}</span>
                                                  }}/>
                            </h2>
                            <p id="productDetail-artisan-description">
                                {context.languageSettings.locale.startsWith("en") ? artisan.shortDescriptionEN :
                                    artisan.shortDescriptionES}
                            </p>
                            <Link to={"/artesanos/" + artisan._id}
                                  id="productDetail-link-artisan">
                                <p className='productDetail-artisans-description'>
                                    <FormattedMessage id="LearnMoreAbout"
                                                      values={{
                                                          span: (chunks) =>
                                                              <span id="productDetail-link-bold">{artisan.name}</span>
                                                      }}/>
                                    <img id="productDetail-arrow"
                                         src="/Assets/Icons/rightarrow.svg"
                                         alt="Flecha"/>
                                </p>
                            </Link>
                            <div className='row'
                                 id="productDetail-artisans-images-row">
                                <div className='col-12 col-lg-6'>
                                    <img src={artisan.media ? `${contentURL}/${artisan.media?.technique[1]}` : ""}
                                         alt="Artisans photo 1"/>
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <img src={artisan.media ? `${contentURL}/${artisan.media?.technique[2]}` : ""}
                                         alt="Artisans photo
             2"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>

        </React.Fragment>
    )


}

export default ProductDetail;