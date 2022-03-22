import './Artisans.css';
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useState} from "react";
import ArtisansMockup from "../../models_mockup/Artisan/Artisans";
import {FormattedMessage} from "react-intl";
require("../../Assets/Map/")




function Artisans(){

    const [artisans, setArtisans] = useState(ArtisansMockup)

    useEffect(()=>{
        console.log(artisans)
    }, [artisans])


    return(
        <div id="Artisans">
            <Topbar/>
            <Navbar/>
            <div className="row intro-artisans">
                <div className="col-6 description-artisans">
                    <h1 id="title-artisans"><FormattedMessage id="Artisans"/></h1>
                    <p className="normal-text"><FormattedMessage id="ArtisansDescription"/></p>
                    <div className="filter-artisans">
                        <h3 className="orange normal-text text-uppercase"><FormattedMessage id="Filters"/></h3>
                    </div>
                </div>
                <div className="col-6">
                    <img/>
                </div>
            </div>
            <div className="artisans-section row">
                {artisans.map((artisan,i) =>{
                    return <img className="col-4" src={artisan.profilePhoto} alt={"artisan"+i} key={"artisan"+i}/>
                })}
            </div>
        </div>
    )
}


export default Artisans;