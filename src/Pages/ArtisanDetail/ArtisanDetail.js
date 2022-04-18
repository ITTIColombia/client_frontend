import "./ArtisanDetail.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useState} from "react";
import Artisan1 from '../../Mockup/Artisan/Artisan1/Artisan1.json';
import Department1 from '../../Mockup/Department/Department1/Department1.json';
import {FormattedMessage} from "react-intl";
import ChevronRight from "../../Components/ChevronRight/ChevronRight";
import Footer from "../../Components/Footer/Footer";
import {useLocation, useParams} from "react-router-dom";
import ArtisansFinal from "../../Mockup/Artisan/ArtisansFinal";
import Departments from "../../Mockup/Department/Departments";
import Products from "../../Mockup/Product/Products";
import { Breadcrumb } from "react-bootstrap";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

function ArtisanDetail(props){

    let userLang = navigator.language || navigator.userLanguage;

    const english = userLang.startsWith('en')? true: !userLang.startsWith('es');

    const [artisan, setArtisan] = useState(Artisan1);

    const [department, setDepartment] = useState(Department1)

    const [products, setProducts] = useState(Products)

    const parameters = useParams();

    useEffect(()=>{
        setArtisan(ArtisansFinal.find(art => art._id === parameters._id) || Artisan1)
    } )

    useEffect(()=>{
        setDepartment(Departments.find(dept => dept.name === artisan.department))
        const posibleProducts = Products.filter(prod => prod.artisan === artisan._id)
        if(posibleProducts && posibleProducts.length > 0){
            setProducts(posibleProducts)
        }else{
            setProducts(products.slice(0,4))
        }
    }, [artisan])

    return (
        <div id="ArtisanDetail">
            <Topbar/>
            <Navbar/>
            <Breadcrumbs path="/artesanos" name={artisan.name} pathName={<FormattedMessage id="Artisans"/>}/>
            <div className="container-fluid">
               {/* <div className="row artisan-navigation artisan-row">
                    <div className="col-12">
                        <Breadcrumbs path="/artesanos" name={artisan.name} pathName={<FormattedMessage id="Artisans"/>}/>
                        <p className="inline"><FormattedMessage id="Artisans"/><ChevronRight path=""/> {artisan.name || Artisan1.name} </p>
                    </div>
    </div>*/}
                <div className='row artisan-intro artisan-row'>
                    <div className="col-5 artisan-intro artisan-left">
                        <h1 className="title-text-artisan orange">{artisan.name || Artisan1.name}</h1>
                        <p className="normal-text-artisan">{english? artisan.shortDescriptionEN || Artisan1.shortDescriptionEN: artisan.shortDescriptionES || Artisan1.shortDescriptionES }</p>
                        {/*<p className="normal-text-artisan"><FormattedMessage id="SeeProducts"/></p>*/}
                    </div>

                    <div className="col-7 artisan-intro- artisan-right">
                        <video autoPlay controls name="media">
                            <source src={artisan.media && artisan.media.length > 0? artisan.media[0]: Artisan1.media[0]} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className='row artisan-region artisan-row'>
                    <div className="col-5 artisan-intro artisan-left">
                        <img id="map-artisan" src={"/Assets/Map/Color/"+artisan.department+".svg"} alt="map artisan"/>
                    </div>

                    <div className="col-7 artisan-intro- artisan-right">

                        <div className="reduced-container">
                            <h2 className="black title-text-artisan">The corner of Colombia</h2>
                            <p className="normal-text-artisan">
                                <span className="text-uppercase orange"><FormattedMessage id="Region"/></span> - <FormattedMessage id={department.region}/>
                                <br/>
                                <span className="text-uppercase orange"><FormattedMessage id="Department"/></span> - {artisan.department}
                                <br/>
                                <span className="text-uppercase orange"><FormattedMessage id="Community"/></span> - {artisan.city}
                            </p>
                            <p className="normal-text-artisan">
                                {english? department.descriptionEN || Department1.descriptionEN: department.descriptionES || Department1.descriptionES }
                            </p>
                        </div>
                    </div>
                </div>
                <div className='row artisan-technique artisan-row'>
                    <h2 className="black title-text-artisan text-center"><FormattedMessage id="TheTechnique"/></h2>
                    <p className="black normal-text-artisan">{english? artisan.detailedDescriptionEN || Artisan1.detailedDescriptionEN: artisan.detailedDescriptionES || Artisan1.detailedDescriptionES }</p>
                    <div className="col-6">
                        <img className="technique-figure" src={artisan.media && artisan.media.length > 0? artisan.media[1]: Artisan1.media[1]} alt="technique-1"/>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <img className="technique-figure" src={artisan.media && artisan.media.length > 0? artisan.media[2]: Artisan1.media[2]}alt="technique-2"/>
                            </div>
                            <div className="col-6">
                                <img className="technique-figure" src={artisan.media && artisan.media.length > 0? artisan.media[3]: Artisan1.media[3]} alt="technique-3"/>
                            </div>
                            <div className="col-12">
                                <img className="technique-figure" src={artisan.media && artisan.media.length > 0? artisan.media[4]: Artisan1.media[4]} alt="technique-4"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row artisan-products artisan-row'>
                    <h2 className="black title-text-artisan text-center"><FormattedMessage id="Products"/></h2>
                    <p className="black normal-text-artisan text-center"> Explore all the handicrafts of <span className="normal-text-artisan-span">{artisan.name || Artisan1.name}</span> and discover more about their culture.</p>
                    <div className="artisan-row-photos">
                        <img className="product-figure" src={products[0].media[0]["Photo1"]} alt="product-1"/>
                    
                        <img className="product-figure" src={products[1].media[0]["Photo1"]} alt="product-2"/>
                    
                        <img className="product-figure" src={products[2].media[0]["Photo1"]} alt="product-3"/>
                    
                        <img className="product-figure" src={products[3].media[0]["Photo1"]} alt="product-4"/>
                    </div>
                </div>
            </div>
            <Footer/>

        </div>
    )
}

export default ArtisanDetail;