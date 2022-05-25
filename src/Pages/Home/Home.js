import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/HomeComponents/Banner'
import Footer from '../../Components/Footer/Footer'
import './Home.css'
import Favorites from '../../Components/HomeComponents/Favorites'
import Editorial from '../../Components/HomeComponents/Editorial'
import PopularArtisans from '../../Components/HomeComponents/PopularArtisans'
import Quiz from '../../Components/HomeComponents/Quiz'
import {useLayoutEffect} from "react";
import React from "react";

function Home(){

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })

    return (
        <React.Fragment>
            <Navbar/>
            <div id='Home'>
                <Banner/>
                <Favorites/>
                <Quiz/>
                <PopularArtisans/>
                <Editorial/>
            </div>
            <Footer/>
        </React.Fragment>

    )
}


export default Home;