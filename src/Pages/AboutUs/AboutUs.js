import "./AboutUs.css";
import React, {useLayoutEffect} from 'react';
import {FormattedMessage} from "react-intl";
import {Carousel} from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

function AboutUs() {

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })


  return (
      <React.Fragment>
          <Navbar/>
          <div id="AboutUs">
              <div className="container-fluid">
                  <div className="aboutUs-banner row">
                      <div className="col-12 aboutUs-banner-col">
                          <img className="aboutUs-banner-img" src="/Assets/Photos/AboutUs/Banner.png" alt="Banner artisan" />
                          <div id="aboutUs-banner-helper">
                              <h1><FormattedMessage id="TitleAboutUs"/></h1>
                          </div>
                      </div>
                  </div>
                  <div className="aboutUs-motivation row align-items-center">
                      <div className="col-12 col-lg-6">
                          <h2>
                              <FormattedMessage id="SubtitleAboutUs" values={{
                                  span: (chunks) => <span className='text-italic'>{chunks}</span>
                              }}/>
                          </h2>
                      </div>
                      <div className="col-12 col-lg-6 center-content">
                          <p><FormattedMessage id="ParagraphDream1"/></p>
                          <p><FormattedMessage id="ParagraphDream2"/></p>
                      </div>
                  </div>
                  <div className="aboutUs-artisans row align-items-center">
                      <div className="col-12 d-block d-lg-none">
                          <img id="aboutUs-artisans-small-image" src="/Assets/Photos/AboutUs/Artisans.png" alt="Artisan"/>
                      </div>
                      <div className="aboutUs-artisans-txt col-12 col-lg-5">
                          <h3>
                              <FormattedMessage id="WhoAreTheArtisans" values={{
                                  span: (chunks) => <span className="text-italic">{chunks}</span>
                              }}/>
                          </h3>
                          <p><FormattedMessage id="ArtisansExplanation1"/></p>
                          <p><FormattedMessage id="ArtisansExplanation2"/></p>
                          <p className='text-bold'><FormattedMessage id="ArtisansExplanation3"/></p>
                      </div>
                      <div className="col-lg-7 d-none d-lg-block text-center ">
                          <img src="/Assets/Photos/AboutUs/Artisans.png" alt="Artisan" className="aboutUs-artisans-img"/>
                      </div>
                  </div>
                  <div className="aboutUs-behindITTI row">
                      <div className="col-12">
                          <h3 id="aboutUs-WhoAreWe">
                              <FormattedMessage id="WhoAreWeBehindITTI"/>
                          </h3>
                      </div>

                      <div className="col-12 col-lg-6 text-center">
                          <img id="team1imageSmall" src="/Assets/Photos/AboutUs/Team1.png" alt="ITTI Team #1" className="d-block d-lg-none"/>
                          <p><FormattedMessage id="TeamITTI"/></p>
                          <img id="team1image" src="/Assets/Photos/AboutUs/Team1.png" alt="ITTI Team #1" className="d-none d-lg-block"/>
                      </div>
                      <div className="col-lg-6 text-center aboutUs-team2-col d-none d-lg-block">
                          <img id="team2image" src="/Assets/Photos/AboutUs/Team2.png" alt="ITTI Team #2"/>
                      </div>
                  </div>
              </div>

          </div>
          <Footer/>
      </React.Fragment>

  )
}

export default AboutUs