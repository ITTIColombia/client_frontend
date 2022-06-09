import React, {useEffect, useState} from 'react'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import "./PopularArtisans.css"; 

function PopularArtisans() {

    const [artisans, setArtisans] = useState([])



    useEffect(()=> {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/artisans/sample?qty=4`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((res)=>{
            if(res.status === 200){
                res.json().then(json=>{
                    setArtisans(json)
                }).catch(err=>{
                    console.log("Error extracting json:", err)
                })
            }else if(res.status === 204){
                setArtisans([])
            }
        }).catch(err=>{
            console.log("Error receiving artisans:", err)
        })
    }, [])


    return (
        <div className="PopularArtisans" id="popularArtisans">
            <div className="popularArtisans-tit">
                <h3><FormattedMessage id="PopularArtisansTitle" values={{
                    span: (chunks) => <span>{chunks}</span>
                }}/></h3>
            </div>
            <div className="popularArtisans-content">
                {artisans.map((artisan,i)=>{
                    const contentURL = `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/artisans/${artisan['_id']}`
                    return(
                        <Link to={`/artesanos/${artisan["_id"]}`}>
                            <img className="img" src={`${contentURL}/${artisan.media?.profile}`} alt="Artesano 1" />
                        </Link>
                    )
                })}
            </div>
            <div className="popularArtisans-but-container">
                    <div className="popularArtisans-but-line">
                        <hr/>
                    </div>
                    <Link to="/artesanos">
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
