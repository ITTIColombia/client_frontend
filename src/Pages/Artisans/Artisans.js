import './Artisans.css';
import Navbar from "../../Components/Navbar/Navbar";
import {useEffect, useLayoutEffect, useState} from "react";
import ArtisansMockup from "../../Mockup/Artisan/Artisans";
import {FormattedMessage} from "react-intl";
import Filter from "../../Components/Filters/Filter";
import Footer from "../../Components/Footer/Footer";
import {Link} from "react-router-dom";
import React from "react";


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
        <React.Fragment>
            <Navbar/>
            <div id="Artisans" className="container-fluid">
                <div className="row intro-artisans">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 description-artisans">
                        <h1 id="title-artisans"><FormattedMessage id="Artisans"/></h1>
                        <p className="text-artisans"><FormattedMessage id="ArtisansDescription"/></p>
                        <div className="filter-artisans">
                            <Filter options={optionsSearchForm} state={searchForm} setState={setSearchForm}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 d-none d-lg-block d-xl-block">
                        <div className="float-end">
                            <img id="colombia_map" src='/Assets/Map/MapRegions.png' alt="colombia-map"/>
                        </div>
                    </div>
                </div>
                <div className="artisans-section row">
                    {artisans.map((artisan,i) =>{
                        return (
                            <Link to={"/artesanos/"+artisan._id} key={"artisan"+i}  className="col-lg-4 col-xl-4 col-sm-12 col-xs-12 artisans-col">
                                <img src={artisan.profilePhoto} alt={"artisan"+i}/>
                            </Link>)
                    })}
                </div>
            </div>
            <Footer/>
        </React.Fragment>

    )
}


export default Artisans;