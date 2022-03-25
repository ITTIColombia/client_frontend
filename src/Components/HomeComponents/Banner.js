import React from 'react'
import { FormattedMessage } from 'react-intl';
import "./Banner.css"; 

function Banner() {
    return (
        <div className="Banner">
            <div className="banner-left">
                <div className="banner-left-text">
                    <div className="banner-left-firstRow"><p><FormattedMessage id="At"/> IT</p><p className='letter-rotation'>T</p><p>I</p></div>
                    <h3 className="banner-left-subtitle"><FormattedMessage id="BannerSlogan"/></h3>
                    <p className="banner-left-description"><FormattedMessage id="BannerDescription"/></p>
                </div>
            </div>
            <div className="banner-right">
                <img className="banner-img" src="/Assets/Photos/HomePage/photoBanner.jpg" alt="Foto Banner ITTI" />
            </div>
        </div>
    )
}

export default Banner
