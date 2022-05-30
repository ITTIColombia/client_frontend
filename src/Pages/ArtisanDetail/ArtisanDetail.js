import "./ArtisanDetail.css";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useLayoutEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import Footer from "../../Components/Footer/Footer";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {useContext} from "react";
import appContext from "../../AppContext";
import React from "react";
import RightArrow from "../../Components/RightArrow/RightArrow";
import {Carousel} from "react-bootstrap";

function ArtisanDetail(props) {

    let context = useContext(appContext)

    const [artisan, setArtisan] = useState({});

    const [department, setDepartment] = useState({});

    const [contentURL, setContentURL] = useState(undefined);

    const [products, setProducts] = useState([]);

    const parameters = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/artisans/${parameters._id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(json => {
                    setArtisan(json)
                }).catch(err => {
                    console.log("Error extracting json:", err)
                })
            } else if (res.status === 204) {
                setArtisan({})
            }
        }).catch(err => {
            console.log("Error receiving artisans:", err)
        })
    }, [parameters._id])

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
                } else if (res.status === 204) {
                    setDepartment({})
                }
            }).catch(err => {
                console.log("Error receiving artisans:", err)
            })
        }
    }, [artisan])


    useEffect(() => {
        if (artisan._id) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/artisans/${artisan._id}/products/sample?` +
                new URLSearchParams({qty: "4"}), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(json => {
                        setProducts(json)
                        console.log(json)
                    }).catch(err => {
                        console.log("Error extracting json:", err)
                    })
                } else {
                    setProducts([])
                }
            }).catch(err => {
                console.log("Error receiving artisans:", err)
            })
        }
    }, [artisan])


    useEffect(() => {
        if (artisan['_id']) {
            setContentURL(`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/artisans/${artisan['_id']}`)
        } else {
            setContentURL(undefined)
        }
    }, [artisan])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    })

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
                            <h1 className="title-text-artisan orange">{artisan.name}</h1>
                            <p className="normal-text-artisan">{context.languageSettings.locale.startsWith(
                                "en") ? artisan.shortDescriptionEN : artisan.shortDescriptionES}</p>
                            <p>
                                <a className="normal-text-artisan artisan-adjust-flex"
                                   href="#artisan-product-region">
                                    <span id="artisanDetail-container-seeProducts"><FormattedMessage id="SeeProducts"/></span><RightArrow/>
                                </a>
                            </p>
                        </div>

                        <div className="col-lg-7 col-xl-7 col-sm-12 artisan-intro- artisan-right">
                            <video autoPlay
                                   controls
                                   name="media">
                                <source src={artisan.media?.video ? `${contentURL}/${artisan.media.video}` : ""}
                                        type="video/mp4"/>
                            </video>
                        </div>
                    </div>

                    <div className='row artisan-region artisan-row'>
                        <div className="col-lg-5 artisan-intro artisan-left d-none d-lg-block">
                            <img id="map-artisan"
                                 src={department.mapColorRegion ? `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/frontend/departments/${department.mapColorRegion}` : ""}
                                 alt="map artisan"/>
                        </div>

                        <div className="col-12 col-lg-7 artisan-intro artisan-right">
                            <div className='row'>
                                <div className="col-6 artisan-intro artisan-left d-block d-lg-none">
                                    <img id="map-artisan-small"
                                         src={department.mapColorRegion ? `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/frontend/departments/${department.mapColorRegion}` : ""}
                                         alt="map artisan"/>
                                </div>

                                <div className="col-6 col-sm-6 col-lg-12 my-auto center-horizontally-small reduced-container">
                                    <p className="black title-text-artisan">The corner of Colombia</p>
                                    <p className="normal-text-artisan">
                                        <span className="text-uppercase orange"><FormattedMessage id="Region"/></span> - {department.region}
                                        <br/>
                                        <span className="text-uppercase orange"><FormattedMessage id="Department"/></span> - {department.name}
                                        <br/>
                                        <span className="text-uppercase orange"><FormattedMessage id="Community"/></span> - {artisan.city}
                                    </p>
                                </div>
                            </div>
                            <p className="normal-text-artisan reduced-container col-12 col-lg-12">
                                {context.languageSettings.locale.startsWith(
                                    "en") ? department.descriptionEN : department.descriptionES}
                            </p>

                        </div>
                    </div>

                    <div className='row artisan-technique artisan-row'>
                        <h2 className="col-12 black title-text-artisan text-center">
                            <FormattedMessage id="TheTechnique"/></h2>
                        <p className="col-12 black normal-text-artisan">{context.languageSettings.locale.startsWith(
                            "en") ? artisan.detailedDescriptionEN : artisan.detailedDescriptionES}</p>
                        <div className="col-12 col-lg-6">
                            <img className="technique-figure"
                                 src={`${contentURL}/${artisan.media?.technique[0]}`}
                                 alt="technique-1"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <img className="technique-figure"
                                         src={`${contentURL}/${artisan.media?.technique[1]}`}
                                         alt="technique-2"/>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <img className="technique-figure"
                                         src={`${contentURL}/${artisan.media?.technique[2]}`}
                                         alt="technique-3"/>
                                </div>
                                <div className="col-12">
                                    <img className="technique-figure"
                                         src={`${contentURL}/${artisan.media?.technique[3]}`}
                                         alt="technique-4"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="artisan-product-region"
                         className='row artisan-products artisan-row'>
                        <h2 className="col-12 black title-text-artisan text-center"><FormattedMessage id="Products"/>
                        </h2>
                        <p className="col-12 black normal-text-artisan ">
                            <FormattedMessage id="InvitationExploreProducts"
                                              values={{
                                                  span: (chunks) =>
                                                      <span className="normal-text-artisan-span">{artisan.name}</span>
                                              }}/>
                        </p>
                        <div className="artisan-row-photos col-12 d-none d-lg-block">

                            {products.map((product, i) => {
                                    const size = products.length > 0 ? 100 / products.length : 100;
                                    return (
                                        <img className="product-figure"
                                             src={`${contentURL}/${product.media?.photos?.[0]}`}
                                             alt={"product-" + i}
                                             key={i}
                                             style={{maxWidth: size + "%"}}/>
                                    )
                                }
                            )}
                        </div>
                        <Carousel className='d-block d-lg-none'>
                            {products.map((product, i) =>
                                <Carousel.Item interval={1000}
                                               key={i}>
                                    <img
                                        className="d-block w-100 product-figure"
                                        src={`${contentURL}/${product.media?.photos?.[0]}`}
                                        alt={"product-" + i}
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