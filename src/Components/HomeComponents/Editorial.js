import React, {useState} from 'react'
import { FormattedMessage } from 'react-intl';
import { Rating } from 'react-simple-star-rating'
import "./Editorial.css"; 

function Editorial() {

    const [rating1, setRating1] = useState(0)
    const [rating2, setRating2] = useState(0)
    const [rating3, setRating3] = useState(0)

    const handleRating1 = (rate) => {
        setRating1(rate)
        // TODO save rating related to product
    }
    const handleRating2 = (rate) => {
        setRating2(rate)
        // TODO save rating related to product
    }
    const handleRating3 = (rate) => {
        setRating3(rate)
        // TODO save rating related to product
    }

    return (
        <div className="Editorial">
            <div className="editorial-col1">
                <div className="editorial-tit">
                    <FormattedMessage id="EditorialTitle1"/>
                    <span><FormattedMessage id="EditorialTitleSpan"/></span>
                </div>
                <img className="editorial-img" id="editorial-img1" src={"/Images/Mockup/Product/Product8/Foto1.png"} alt="editorial1" />
                <div className="editorial-content">
                    <p><span>Maconbe</span> - Apoyar comunidades indígenas</p>
                    <Rating className='editorial-rating' onClick={handleRating1} ratingValue={rating1} fillColor='#BF522A' emptyColor='transparent' size={25} />
                </div>
            </div>
            <div className="editorial-col2">
                <img  className="editorial-img" src={"/Images/Mockup/Product/Product3/Foto1.png"} alt="editorial2" />
                <div className="editorial-content">
                    <p><span>Misyuú</span> - Empoderar mujeres artesanas Wayuu</p>
                    <Rating className='editorial-rating' onClick={handleRating2} ratingValue={rating2} fillColor='#BF522A' emptyColor='transparent' size={25} />
                </div>
            </div>
            <div className="editorial-col3">
                <img  className="editorial-img" src={"/Images/Mockup/Product/Product7/Foto1.png"} alt="editorial3" />
                <div className="editorial-content">
                    <p><span>Portia</span> - Resaltar las regiones de nuestra tierra</p>
                    <Rating className='editorial-rating' onClick={handleRating3} ratingValue={rating3} fillColor='#BF522A' emptyColor='transparent' size={25} />
                </div>
            </div>
        </div>
    )
}

export default Editorial
