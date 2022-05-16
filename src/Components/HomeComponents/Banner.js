import React from 'react'
import { FormattedMessage } from 'react-intl';
import "./Banner.css"; 

function Banner() {
    return (
        <div id="Banner">
            <div id="banner-right">
                <img id="banner-image" src="/Assets/Photos/HomePage/photoBanner.jpg" alt="Banner Photo ITTI" />
                <div id="banner-white-extrusion"/>
            </div>
            <div id="banner-left">
                <div id="banner-left-text">
                    <p className="banner-left-firstRow"><FormattedMessage id="At"/> IT<span className='letter-rotation'>T</span>I</p>
                    <h3 className="banner-left-subtitle"><FormattedMessage id="BannerSlogan"/></h3>
                    <p className="banner-left-description"><FormattedMessage id="BannerDescription"/></p>
                </div>
            </div>

        </div>
    )
}

export default Banner
