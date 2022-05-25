import "./ArtisanDetail.css";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useLayoutEffect, useState} from "react";
import Artisan1 from '../../Mockup/Artisan/Artisan1/Artisan1.json';
import Department1 from '../../Mockup/Department/Department1/Department1.json';
import {FormattedMessage} from "react-intl";
import Footer from "../../Components/Footer/Footer";
import {useParams} from "react-router-dom";
import ArtisansFinal from "../../Mockup/Artisan/ArtisansFinal";
import Departments from "../../Mockup/Department/Departments";
import Products from "../../Mockup/Product/Products";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {useContext} from "react";
import appContext from "../../AppContext";
import React from "react";
import RightArrow from "../../Components/RightArrow/RightArrow";
import {Carousel} from "react-bootstrap";

function ArtisanDetail(props) {

    let context = useContext(appContext)

    const [artisan, setArtisan] = useState(Artisan1);

    const [department, setDepartment] = useState(Department1)

    const [products, setProducts] = useState(Products)

    const parameters = useParams();

    useEffect(() => {
        setArtisan(ArtisansFinal.find(art => art._id === parameters._id) || Artisan1)
    })

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    })

    useEffect(() => {
        setDepartment(Departments.find(dept => dept.name === artisan.department))
        const posibleProducts = Products.filter(prod => prod.artisan === artisan._id)
        if (posibleProducts && posibleProducts.length > 0) {
            setProducts(posibleProducts)
        } else {
            setProducts(products.slice(0, 4))
        }
    }, [artisan])

    return (
        <React.Fragment>
            <Navbar/>
            <div id="ArtisanDetail">
                <Breadcrumbs path="/artesanos"
                             name={artisan.name}
                             pathName={<FormattedMessage id="Artisans"/>}/>
                <div className="container-fluid">
                    {/* <div className="row artisan-navigation artisan-row">
                    <div className="col-12">
                        <Breadcrumbs path="/artesanos" name={artisan.name} pathName={<FormattedMessage id="Artisans"/>}/>
                        <p className="inline"><FormattedMessage id="Artisans"/><ChevronRight path=""/> {artisan.name || Artisan1.name} </p>
                    </div>
    </div>*/}
                    <div className='row artisan-intro artisan-row'>
                        <div className="col-lg-5 col-xl-5 col-sm-12 artisan-intro artisan-left">
                            <h1 className="title-text-artisan orange">{artisan.name || Artisan1.name}</h1>
                            <p className="normal-text-artisan">{context.languageSettings.locale.startsWith(
                                "en") ? artisan.shortDescriptionEN ||
                                Artisan1.shortDescriptionEN : artisan.shortDescriptionES ||
                                Artisan1.shortDescriptionES}</p>
                            <p>
                                <a className="normal-text-artisan artisan-adjust-flex" href="#artisan-product-region">
                                    <span id="artisanDetail-container-seeProducts"><FormattedMessage id="SeeProducts"/></span><RightArrow/>
                                </a>
                            </p>
                        </div>

                        <div className="col-lg-7 col-xl-7 col-sm-12 artisan-intro- artisan-right">
                            <video autoPlay
                                   controls
                                   name="media">
                                <source src={artisan.media && artisan.media.length >
                                0 ? artisan.media[0] : Artisan1.media[0]}
                                        type="video/mp4"/>
                            </video>
                        </div>
                    </div>

                    <div className='row artisan-region artisan-row'>
                        <div className="col-lg-5 artisan-intro artisan-left d-none d-lg-block">
                            <img id="map-artisan"
                                 src={"/Assets/Map/Color/" + artisan.department + ".svg"}
                                 alt="map artisan"/>
                        </div>

                        <div className="col-12 col-lg-7 artisan-intro artisan-right">
                            <div className='row'>
                                <div className="col-6 artisan-intro artisan-left d-block d-lg-none">
                                    <img id="map-artisan-small"
                                         src={"/Assets/Map/Color/" + artisan.department + ".svg"}
                                         alt="map artisan"/>
                                </div>

                                <div className="col-6 col-sm-6 col-lg-12 my-auto center-horizontally-small reduced-container">
                                    <p className="black title-text-artisan">The corner of Colombia</p>
                                    <p className="normal-text-artisan">
                                        <span className="text-uppercase orange"><FormattedMessage id="Region"/></span> - <FormattedMessage id={department.region}/>
                                        <br/>
                                        <span className="text-uppercase orange"><FormattedMessage id="Department"/></span> - {artisan.department}
                                        <br/>
                                        <span className="text-uppercase orange"><FormattedMessage id="Community"/></span> - {artisan.city}
                                    </p>
                                </div>
                            </div>
                            <p className="normal-text-artisan reduced-container col-12 col-lg-12">
                                {context.languageSettings.locale.startsWith("en") ? department.descriptionEN ||
                                    Department1.descriptionEN : department.descriptionES ||
                                    Department1.descriptionES}
                            </p>

                        </div>
                    </div>

                    <div className='row artisan-technique artisan-row'>
                        <h2 className="col-12 black title-text-artisan text-center"><FormattedMessage id="TheTechnique"/></h2>
                        <p className="col-12 black normal-text-artisan">{context.languageSettings.locale.startsWith(
                            "en") ? artisan.detailedDescriptionEN ||
                            Artisan1.detailedDescriptionEN : artisan.detailedDescriptionES ||
                            Artisan1.detailedDescriptionES}</p>
                        <div className="col-12 col-lg-6">
                            <img className="technique-figure"
                                 src={artisan.media && artisan.media.length > 0 ? artisan.media[1] : Artisan1.media[1]}
                                 alt="technique-1"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <img className="technique-figure"
                                         src={artisan.media && artisan.media.length >
                                         0 ? artisan.media[2] : Artisan1.media[2]}
                                         alt="technique-2"/>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <img className="technique-figure"
                                         src={artisan.media && artisan.media.length >
                                         0 ? artisan.media[3] : Artisan1.media[3]}
                                         alt="technique-3"/>
                                </div>
                                <div className="col-12">
                                    <img className="technique-figure"
                                         src={artisan.media && artisan.media.length >
                                         0 ? artisan.media[4] : Artisan1.media[4]}
                                         alt="technique-4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="artisan-product-region"
                         className='row artisan-products artisan-row'>
                        <h2 className="col-12 black title-text-artisan text-center"><FormattedMessage id="Products"/></h2>
                        <p className="col-12 black normal-text-artisan "> Explore all the handicrafts
                            of <span className="normal-text-artisan-span">{artisan.name || Artisan1.name}</span> and
                            discover more about their culture.</p>
                        <div className="artisan-row-photos col-12 d-none d-lg-block">

                            {products.map((product, i)=>
                                <img className="product-figure"
                                     src={product.media[0]["Photo1"]}
                                     alt={"product-"+i}
                                     key={i}/>
                            )}
                        </div>
                        <Carousel className='d-block d-lg-none'>
                            {products.map((product, i)=>
                                <Carousel.Item interval={1000} key={i}>
                                    <img
                                        className="d-block w-100 product-figure"
                                        src={product.media[0]["Photo1"]}
                                        alt={"product-"+i}
                                    />
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>

    )
}

export default ArtisanDetail;