import React from 'react'
import "./Banner.css"; 

function Banner() {
    return (
        <div className="Banner">
            <div className="banner-left">
                <div className="banner-left-text">
                    <div className="banner-left-firstRow"><p>En IT</p><p className='letter-rotation'>T</p><p>I</p></div>
                    <h3 className="banner-left-subtitle">Creemos en el talento de los artesanos colombianos</h3>
                    <p className="banner-left-description">Descubre un mundo lleno de tesoros e historias de cada rincón de Colombia mientras apoyas un comercio local, justo, sostenible y a baja escala.</p>
                </div>
            </div>
            <div className="banner-right">
                <img className="banner-img" src="/Assets/Photos/HomePage/photoBanner.jpg" alt="Foto Banner ITTI" />
            </div>
        </div>
    )
}

export default Banner
