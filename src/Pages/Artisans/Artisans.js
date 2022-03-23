import './Artisans.css';
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useState} from "react";
import ArtisansMockup from "../../Mockup/Artisan/Artisans";
import {FormattedMessage} from "react-intl";
import ReusableFilter from "../../Components/Filters/ReusableFilter";


function Artisans(){

    const optionsSearchForm = {"Region": ["Pacific", "Caribbean", "Andean", "Orinoquia", "Amazonian"],
        "Type": ["Indigenous", "PopularTraditional", "Contemporary"],
        "Job": ["JewelerySilversmith", "PotteryCeramicGlass", "KnittingEmbroidery", "BasketryHats", "WoodWork", "Leather"]}

    const [artisans, setArtisans] = useState(ArtisansMockup)

    const [searchForm, setSearchForm] = useState(
        {"Region":"DEFAULT", "Type": "DEFAULT", "Job": "DEFAULT"})

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
                        <ReusableFilter options={optionsSearchForm} state={searchForm} setState={setSearchForm}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="float-end">
                        <img id="colombia_map" src='/Assets/Map/MapRegions.png' alt="colombia-map"/>
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