import './Artisans.css';
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useState} from "react";
import ArtisansMockup from "../../Mockup/Artisan/Artisans";
import {FormattedMessage} from "react-intl";
import completeMap from '../../Assets/Map/CompleteMap.svg';




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
                    <p className="text-artisans"><FormattedMessage id="ArtisansDescription"/></p>
                    <div className="filter-artisans">
                        <h3 className="orange text-artisans text-uppercase"><FormattedMessage id="Filters"/></h3>
                    </div>
                </div>
                <div className="col-6">
                    <div className="float-end">
                        <img id="colombia_map" src={completeMap} alt="colombia-map"/>
                    </div>
                </div>
            </div>
            <div className="artisans-section row float-left">
                {artisans.map((artisan,i) =>{
                    return <img className="col-4" src={artisan.profilePhoto} alt={"artisan"+i} key={"artisan"+i}/>
                })}
            </div>
        </div>
    )
}


export default Artisans;