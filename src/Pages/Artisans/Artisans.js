import './Artisans.css';
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useLayoutEffect, useState} from "react";
import ArtisansMockup from "../../Mockup/Artisan/Artisans";
import {FormattedMessage} from "react-intl";
import Filter from "../../Components/Filters/Filter";
import Footer from "../../Components/Footer/Footer";
import {Link} from "react-router-dom";


function Artisans(){

    const optionsSearchForm = {"Region": ["Pacific", "Caribbean", "Andean", "Orinoquia", "Amazonian"],
        "Type": ["Indigenous", "PopularTraditional", "Contemporary"],
        "Job": ["JewelerySilversmith", "PotteryCeramicGlass", "KnittingEmbroidery", "BasketryHats", "WoodWork", "Leather"]}

    const [artisans, setArtisans] = useState(ArtisansMockup)

    const [searchForm, setSearchForm] = useState(
        {"Region":"DEFAULT", "Type": "DEFAULT", "Job": "DEFAULT"})

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })

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
                        <Filter options={optionsSearchForm} state={searchForm} setState={setSearchForm}/>
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
                    return (
                        <Link to={"/artesanos/"+artisan._id} key={"artisan"+i}  className="col-4">
                            <img src={artisan.profilePhoto} alt={"artisan"+i}/>
                        </Link>)
                })}
            </div>
            <Footer/>
        </div>
    )
}


export default Artisans;