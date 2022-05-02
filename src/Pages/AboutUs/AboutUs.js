import "./AboutUs.css";
import React from 'react';
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import {FormattedMessage} from "react-intl";
import {Carousel} from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";

function AboutUs() {


  return (
    <div id="AboutUs">
      <Topbar/>
      <Navbar/>
      <div className="container-fluid">
        <div className="aboutUs-banner row">
            <Carousel indicators={false}>
                <Carousel.Item>
                    <img className="d-block w-100" src="/Assets/Photos/AboutUs/Banner.png" alt="Banner artisan" />
                    <Carousel.Caption>
                        <h1>
                            <FormattedMessage id="TitleAboutUs"/>
                        </h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
        <div className="aboutUs-motivation row align-items-center">
          <div className="col-6 center-content">
              <h2>
                  <FormattedMessage id="SubtitleAboutUs" values={{
                  span: (chunks) => <span className='text-italic'>{chunks}</span>
                  }}/>
              </h2>
          </div>
          <div className="col-6 center-content">
              <p><FormattedMessage id="ParagraphDream1"/></p>
              <p><FormattedMessage id="ParagraphDream2"/></p>
          </div>
        </div>
        <div className="aboutUs-artisans row align-items-center">
            <div className="aboutUs-artisans-txt col-5 center-content">
                <h3>
                    <FormattedMessage id="WhoAreTheArtisans" values={{
                        span: (chunks) => <span className="text-italic">{chunks}</span>
                    }}/>
                </h3>
                <p><FormattedMessage id="ArtisansExplanation1"/></p>
                <p><FormattedMessage id="ArtisansExplanation2"/></p>
                <p className='text-bold'><FormattedMessage id="ArtisansExplanation3"/></p>
            </div>
            <div className="col-7 text-center ">
                <img src="/Assets/Photos/AboutUs/Artisans.png" alt="Artisan" className="aboutUs-artisans-img"/>
            </div>
        </div>
        <div className="aboutUs-behindITTI row">
            <div className="col-12">
                <h3 id="aboutUs-WhoAreWe">
                    <FormattedMessage id="WhoAreWeBehindITTI"/>
                </h3>
            </div>

            <div className="col-6 text-center">
                <p><FormattedMessage id="TeamITTI"/></p>
                <img id="team1image" src="/Assets/Photos/AboutUs/Team1.png" alt="ITTI Team #1"/>
            </div>
            <div className="col-6 text-center aboutUs-team2-col">
                <img id="team2image" src="/Assets/Photos/AboutUs/Team2.png" alt="ITTI Team #2"/>
            </div>
        </div>
      </div>
        <Footer/>
    </div>
  )
}

export default AboutUs