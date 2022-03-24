import "./ArtisanDetail.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {useState} from "react";
import Artisan1 from '../../Mockup/Artisan/Artisan1/Artisan1.json';
import {FormattedMessage} from "react-intl";
import ChevronRight from "../../Components/ChevronRight/ChevronRight";
import Footer from "../../Components/Footer/Footer";

function ArtisanDetail(){
    const [artisan, setArtisan] = useState(Artisan1);



    return (
        <div id="ArtisanDetail">
            <Topbar/>
            <Navbar/>

            <div className="container-fluid">
                <div className="row artisan-navigation artisan-row">
                    <div className="col-12">
                        <p className="inline"><FormattedMessage id="Artisans"/><ChevronRight path=""/> Tejidos Machines </p>
                    </div>
                </div>
                <div className='row artisan-intro artisan-row'>
                    <div className="col-6 artisan-intro artisan-left">
                        <h1 className="title-text-artisan orange">Tejidos Machines</h1>
                        <p className="normal-text-artisan">Fabrics Machines is a community of 35 artisans from the municipality of Cumbal, Pasto in Nariño who have the purpose of starting to market their work. They currently have more than 50 ancestral designs that they weave into rugs, chumbes, blankets, bags, backpacks, fabrics, and ruanas.</p>
                        <p className="normal-text-artisan"><FormattedMessage id="SeeProducts"/></p>
                        <img id="map-artisan" src='/Assets/Map/MapRegions.png' alt="map artisan"/>
                    </div>

                    <div className="col-6 artisan-intro- artisan-right">
                        <video autoPlay controls name="media">
                            <source src= "/Images/Mockup/Artisan1/Video.mp4" type="video/mp4" />
                        </video>
                        <div className="reduced-container">
                            <h2 className="black title-text-artisan">The corner of Colombia</h2>
                            <p className="normal-text-artisan">
                                <span className="text-uppercase orange"><FormattedMessage id="Region"/></span> - <FormattedMessage id="Pacific"/>
                                <br/>
                                <span className="text-uppercase orange"><FormattedMessage id="Department"/></span> - Nariño
                                <br/>
                                <span className="text-uppercase orange"><FormattedMessage id="Community"/></span> - Cumbal
                            </p>
                            <p className="normal-text-artisan">
                                This artisan group is located in the southwest corner of Colombia, the department of Nariño, between mountains, jungles and sea. Pasto is the capital of this culturally rich department that borders Ecuador. Since pre-Columbian times, Nariño has been inhabited by numerous indigenous tribes, including the Pastos, Quillacingas, Awá, Iscuandés, Telembíes, Tumas, Tabiles, Abadaes, Chinchillas, Chapanchicas, and Pichilimbíes.
                            </p>
                        </div>

                    </div>
                </div>
                <div className='row artisan-technique artisan-row'>
                    <h2 className="black title-text-artisan text-center"><FormattedMessage id="TheTechnique"/></h2>
                    <p className="black normal-text-artisan">Processing sheep's wool takes time and skill. Each fleece weighs between one and two kilos, and the process can take up to 15 days. Blanca Alicia Tarapues must chalk or open the wool with her hands. She then spins it depending on the type of yarn she needs. Thick for blankets and thin for fabrics, ruanas and cloths. The strands are then passed to the winding machine, which unites the wool, and to the reel, where the skein is formed.</p>
                    <div className="col-6">
                        <img className="technique-figure" src='/Images/Mockup/Artisan1/Technique1.png' alt="technique-1"/>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <img className="technique-figure" src='/Images/Mockup/Artisan1/Technique2.png' alt="technique-2"/>
                            </div>
                            <div className="col-6">
                                <img className="technique-figure" src='/Images/Mockup/Artisan1/Technique3.png' alt="technique-3"/>
                            </div>
                            <div className="col-12">
                                <img className="technique-figure" src='/Images/Mockup/Artisan1/Technique4.png' alt="technique-4"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row artisan-products artisan-row'>
                    <h2 className="black title-text-artisan text-center"><FormattedMessage id="Products"/></h2>
                    <p className="black normal-text-artisan text-center"> Explore all the handicrafts of Tejidos Machines and discover more about their culture.</p>
                    <div className="col-3">
                        <img className="product-figure" src='/Images/Mockup/Product/Product1/Foto1.png' alt="product-1"/>
                    </div>
                    <div className="col-3">
                        <img className="product-figure" src='/Images/Mockup/Product/Product2/Foto1.png' alt="product-2"/>
                    </div>
                    <div className="col-3">
                        <img className="product-figure" src='/Images/Mockup/Product/Product3/Foto1.png' alt="product-3"/>
                    </div>
                    <div className="col-3">
                        <img className="product-figure" src='/Images/Mockup/Product/Product4/Foto1.png' alt="product-4"/>
                    </div>
                </div>
            </div>
            <Footer/>

        </div>
    )
}

export default ArtisanDetail;