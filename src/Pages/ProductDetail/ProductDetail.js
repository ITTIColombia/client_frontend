import React, {useEffect, useLayoutEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import "./ProductDetail.css";
import Product1 from "../../Mockup/Product/Product1/Product1.json";
import Artisan1 from "../../Mockup/Artisan/Artisan1/Artisan1.json";
import Department1 from '../../Mockup/Department/Department1/Department1.json';
import Bread from '../../Components/Breadcrumbs/Breadcrumbs';
import ButtonOrange from '../../Components/Buttons/ButtonOrange';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Products from "../../Mockup/Product/Products";
import Departments from "../../Mockup/Department/Departments";
import Artisans from "../../Mockup/Artisan/Artisans";
import {FormattedMessage, useIntl} from "react-intl";
import AppContext from "../../AppContext";
import {useContext} from "react";

function ProductDetail(){

    const context = useContext(AppContext)

    const intl = useIntl();

    let params = useParams();

    const [product, setProduct] = useState(Product1);

    const [artisan, setArtisan] = useState(Artisan1);

    const [department, setDepartment] = useState(Department1);

    const [bigPicture, setBigPicture] = useState(0);


    function changePicture(next){
        let newValue = next? bigPicture + 1 : bigPicture - 1
        if(newValue < 0) newValue += 3
        setBigPicture(newValue%3)
    }

    useEffect(() => {
        setProduct(Products.find(prod => prod._id == params._id) || Product1)
    }, [params._id])

    useEffect(() => {
        setArtisan(Artisans.find(art => art._id === product.artisan) || Artisan1)
    }, [product])

    useEffect(() => {
        setDepartment(Departments.find(dept => dept.name === artisan.department))
    }, [artisan])

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })

    return (
        <React.Fragment>
            <Navbar/>
            <div id="ProductDetail">
                <Bread pathName={intl.formatMessage({id: "Products"})} path="/productos" name={product.name}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block">
                            <img id="productDetail-main-image" src={product.media[0]["Photo1"]} alt="Front Product Image"/>
                        </div>
                        <div className="col-12 col-lg-6" id="productDetail-productDescription-col">
                            <div id="productDetail-productDescription-container">
                                <p>{artisan.name}</p>
                                <h1>{product.name}</h1>
                                <p>{context.languageSettings.locale.startsWith("en") ? product.descriptionEN: product.descriptionES}</p>
                                <p>
                                    <span className="productDetail-productTag">
                                        <FormattedMessage id="Type"/></span> - <FormattedMessage id={product.productType}/><br/>
                                    <span className="productDetail-productTag">
                                        <FormattedMessage id="Labour"/> </span> - <FormattedMessage id={product.productLabour}/><br/>
                                    <span className="productDetail-productTag">
                                        <FormattedMessage id="Technique"/></span> - {context.languageSettings.locale.startsWith("en") ? product.techniqueEN : product.techniqueES}<br/>
                                    <span className="productDetail-productTag">
                                        <FormattedMessage id="ElaborationTime"/></span> - {product.fabricationDays} <FormattedMessage id="Days"/>
                                </p>
                                <p className='productDetail-price'>${product.price}</p>
                                <div id="productDetail-buttonOrange-container">
                                    <ButtonOrange path="cart" text="AddToCart"/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row" id="productDetail-images-row">
                        <div className="col-12 col-lg-4">
                            <img src={product.media[0]["Photo1"]} alt="Foto Producto"/>
                        </div>
                        <div className="col-12 col-lg-4">
                            <img src={product.media[0]["Photo2"]} alt="Foto Producto"/>
                        </div>
                        <div className=" col-12 col-lg-4">
                            <img src={product.media[0]["Photo3"]} alt="Foto Producto"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7 col-lg-4">
                            <img id="productDetail-map" src={department.mapColorRegion} alt="Mapa Colombia"/>
                        </div>
                        <div className="col-5 d-block d-lg-none">
                            <div id="productDetail-subtitle-container">
                                <h2>
                                    <FormattedMessage id="TheWorldOfArtisans" values={{
                                        span: (chunks) => <span className="productDetail-italic">{chunks}</span>
                                    }}/>
                                </h2>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8">
                            <h2 className="d-none d-lg-block">
                                <FormattedMessage id="TheWorldOfArtisans" values={{
                                    span: (chunks) => <span className="productDetail-italic">{chunks}</span>
                                }}/>
                            </h2>
                            <p id="productDetail-artisan-description">
                                {context.languageSettings.locale.startsWith("en") ? artisan.shortDescriptionEN || Artisan1.shortDescriptionEN : artisan.shortDescriptionES || Artisan1.shortDescriptionES}
                            </p>
                            <Link to={"/artesanos/" + artisan._id} id="productDetail-link-artisan">
                                <p className='productDetail-artisans-description'>
                                    <FormattedMessage id="LearnMoreAbout" values={{
                                        span: (chunks) => <span id="productDetail-link-bold">{artisan.name}</span>
                                    }}/>
                                    <img id="productDetail-arrow" src="/Assets/Icons/rightarrow.svg" alt="Flecha"/>
                                </p>
                            </Link>
                            <div className='row' id="productDetail-artisans-images-row">
                                <div className='col-12 col-lg-6'>
                                    <img src={artisan.media[1]} alt="Artisans photo 1"/>
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <img src={artisan.media[2]} alt="Artisans photo 2"/>
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