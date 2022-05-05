import React from 'react'
import { FormattedMessage } from 'react-intl';
import "./Footer.css"; 

function Footer() {
    return (
        <React.Fragment>
            <div id="Footer" className="container-fluid">
                <div className="row footer-row">
                    <div className="col-lg-4 col-sm-12 col-xs-12 footer-icon-col footer-col">
                        <img className="img" src="/Assets/Logos/logoFooter.svg" alt="ITTI"/>
                        <div id="footer-copyright-region">
                            <img className="copy" src="/Assets/Icons/copyright.svg" alt="copyright"/>
                            <span>2021 ITTI. <FormattedMessage id="AllRightsReserved"/></span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12 col-xs-12 footer-col">
                        <p className="footer-section-title"><FormattedMessage id="MeetUs"/></p>
                        <p className="footer-section-content"><FormattedMessage id="AboutUsFooter"/></p>
                        <p className="footer-section-content"><FormattedMessage id="FAQ"/></p>
                    </div>
                    <div className=" col-lg-3 col-sm-12 col-xs-12  footer-col">
                        <p className="footer-section-title"><FormattedMessage id="ContactUs"/></p>
                        <p className="footer-section-content"><a href="mailto:somositti@gmail.com">somositti@gmail.com</a></p>
                        <p className="footer-section-content"><a href="tel:+573144840591">+57 314 4840591</a></p>
                    </div>
                    <div className="col-lg-2 col-sm-12 col-xs-12 footer-col">
                        <p className="footer-section-title"><FormattedMessage id="FollowUs"/></p>
                        <p className="footer-section-content"><a href="https://www.instagram.com/somositti/" target="_blank" rel="noreferrer">Instagram</a></p>
                        <p className="footer-section-content"><a href="https://www.youtube.com/channel/UC67QLsZD9ftLuXyVH4e-fkA" target="_blank" rel="noreferrer">Youtube</a></p>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Footer
