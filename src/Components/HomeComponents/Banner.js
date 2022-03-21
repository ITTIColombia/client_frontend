import React from 'react'
import photo from "../../Assets/Photos/photoBanner.jpg";
import itti from "../../Assets/Logos/miniItti.svg";
import "./Banner.css"; 

function Banner() {
    return (
        <div className="Banner">
            <div className="banner-left">
                <div className="banner-left-text">
                    <img className="banner-left-img" src={itti} alt="En ITTI"/>
                    <h3>Creemos en el talento de los artesanos colombianos</h3>
                    <p>Descubre un mundo lleno de tesoros e historias de cada rincón de Colombia mientras apoyas un comercio local, justo, sostenible y a baja escala.</p>
                </div>
            </div>
            <div className="banner-right">
                <img className="banner-img" src={photo} alt="Foto Banner ITTI" />
            </div>
        </div>
    )
}

export default Banner
