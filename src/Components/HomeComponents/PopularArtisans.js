import React from 'react'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import "./PopularArtisans.css"; 

function PopularArtisans() {
    return (
        <div className="PopularArtisans" id="popularArtisans">
            <div className="popularArtisans-tit">
                <h3><FormattedMessage id="PopularArtisansTitle1"/><span><FormattedMessage id="PopularArtisansTitleSpan"/></span></h3>
            </div>
            <div className="popularArtisans-content">
                <img className="img" src={"/Images/Mockup/Artisan/Artisan1.png"} alt="Artesano 1" />
                <img className="img" src={ "/Images/Mockup/Artisan/Artisan2.png"} alt="Artesano 2" />
                <img className="img" src={ "/Images/Mockup/Artisan/Artisan3.png"} alt="Artesano 3" />
                <img className="img" src={ "/Images/Mockup/Artisan/Artisan4.png"} alt="Artesano 4" />
            </div>
            <div className="popularArtisans-but-container">
                    <div className="popularArtisans-but-line">
                        <hr/>
                    </div>
                    <Link to="/marcas">
                        <span className='popularArtisans-seeAll'><FormattedMessage id="SeeAll"/></span>
                    </Link>
                    <div className="popularArtisans-but-line">
                        <hr/>
                    </div>
            </div>
        </div>
    )
}

export default PopularArtisans
