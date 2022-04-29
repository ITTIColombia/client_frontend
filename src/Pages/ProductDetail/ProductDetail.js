import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import "./ProductDetail.css"
import Product1 from "../../Mockup/Product/Product1/Product1.json";
import Artisan1 from "../../Mockup/Artisan/Artisan1/Artisan1.json";
import Department1 from '../../Mockup/Department/Department1/Department1.json';
import Bread from '../../Components/Breadcrumbs/Breadcrumbs';
import ButtonOrange from '../../Components/Buttons/ButtonOrange';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Topbar from '../../Components/Topbar/Topbar';
import Products from "../../Mockup/Product/Products";
import Departments from "../../Mockup/Department/Departments";
import Artisans from "../../Mockup/Artisan/Artisans";
import {FormattedMessage, useIntl} from "react-intl";
import AppContext from "../../AppContext";
import {useContext} from "react";


function ProductDetail() {

    const context = useContext(AppContext)

    const intl = useIntl();

    let userLang = navigator.language || navigator.userLanguage;

    const english = userLang.startsWith('en') ? true : !userLang.startsWith('es');

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

    return (
        <div className='ProductDetail'>
            <Topbar/>
            <Navbar/>
            <Bread pathName={intl.formatMessage({id: "Products"})} path="/productos" name={product.name}/>
            <div className='productDetail-container'>
                <div className='productDetail-container-first'>
                    <img className="productDetail-img-princ" src={product.media[0]["Photo1"]} alt="Photo Product"/>
                    <div className='productDetail-container-first-right'>
                        <p className='productDetail-brandName'>{artisan.name}</p>
                        <h3 className='productDetail-productName'>{product.name}</h3>
                        <p className='productDetail-description'>{context.languageSettings.locale.startsWith("en") ? product.descriptionEN: product.descriptionES}</p>
                        <div className='productDetail-details'>
                            <p className='productDetail-details-txt'><span className="text-uppercase">
                                <FormattedMessage id="Type"/></span> - <FormattedMessage id={product.productType}/>
                            </p>
                            <p className='productDetail-details-txt'><span className="text-uppercase">
                                <FormattedMessage id="Labour"/></span> - <FormattedMessage id={product.productLabour}/>
                            </p>
                            <p className='productDetail-details-txt'><span className="text-uppercase">
                                <FormattedMessage
                                    id="Technique"/></span> - {context.languageSettings.locale.startsWith("en") ? product.techniqueEN : product.techniqueES}
                            </p>
                            <p className='productDetail-details-txt'>
                                <span className="text-uppercase">
                                    <FormattedMessage id="ElaborationTime"/>
                                </span> - {product.fabricationDays} <FormattedMessage id="Days"/></p>
                        </div>
                        <p className='productDetail-price'>{product.price}</p>
                        <ButtonOrange path="/" text="AddToCart"/>
                    </div>
                </div>
                <div className='productDetail-container-second'>
                    <img className="productDetail-img" src={product.media[0]["Photo1"]} alt="Foto Producto"/>
                    <img className="productDetail-img" src={product.media[0]["Photo2"]} alt="Foto Producto"/>
                    <img className="productDetail-img" src={product.media[0]["Photo3"]} alt="Foto Producto"/>
                </div>
                <div className='productDetail-container-third'>
                    <img id="productDetail-Map" className="product-img" src={department.mapColorRegion}
                         alt="Mapa Colombia"/>
                    <div className='productDetail-container-third-right'>
                        <p className='productDetail-productNameBrand'><FormattedMessage id="TheWorldOf"/>
                            <span> <FormattedMessage id="Artisans"/>...</span></p>
                        <p className='productDetail-artisans-description'>
                            {context.languageSettings.locale.startsWith("en") ? artisan.shortDescriptionEN || Artisan1.shortDescriptionEN : artisan.shortDescriptionES || Artisan1.shortDescriptionES}
                        </p>
                        <Link to={"/artesanos/" + artisan._id}>
                            <p className='productDetail-artisans-description'><FormattedMessage id="LearnMoreAbout"/>
                                <span className="text-bold"> {artisan.name} </span> <span
                                    className="text-lowercase"><FormattedMessage id="Here"/></span> <img
                                    className="productDetail-arrow" src="/Assets/Icons/rightarrow.svg" alt="Flecha"/>
                            </p>
                        </Link>
                        <div className='productDetail-artisans'>
                            <img className="productDetail-artisans-img" id="right" src={artisan.media[1]}
                                 alt="Foto Artesano 1"/>
                            <img className="productDetail-artisans-img" src={artisan.media[2]} alt="Foto Artesano 2"/>
                        </div>
                    </div>

                </div>

            </div>
            <Footer/>
        </div>

    )
}

export default ProductDetail
