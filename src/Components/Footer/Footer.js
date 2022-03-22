import React from 'react'
import "./Footer.css"; 

function Footer() {
    return (
        <div className="Footer">
            <div className="footer-content">
            <div className="footer-logo">
                <img className="img" src="/Assets/Logos/logoFooter.svg" alt="ITTI" />
                <div className="footer-copy">
                    <img className="copy" src="/Assets/Icons/copyright.svg" alt="copyright"/>
                    <p>2021 ITTI. All Rights Reserved.</p>
                </div>
            </div>
            <div className="footer-info">
                <div className="footer-info-item">
                    <p className="footer-info-tit">CONÓCENOS</p>
                    <p>Sobre nosotros</p>
                    <p>Preguntas frecuentes</p>
                </div>
                <div className="footer-info-item">
                    <p className="footer-info-tit">CONTÁCTANOS</p>
                    <a href="mailto:somositti@gmail.com">somositti@gmail.com</a>
                    <a href="tel:+573144840591">+57 314 4840591</a>
                </div>
                <div className="footer-info-item">
                    <p className="footer-info-tit">SÍGUENOS</p>
                    <a href="https://www.instagram.com/somositti/" target="_blank" rel="noreferrer">Instagram</a>
                    <a href="https://www.youtube.com/channel/UC67QLsZD9ftLuXyVH4e-fkA" target="_blank" rel="noreferrer">Youtube</a>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Footer
