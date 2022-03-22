import React from 'react'
import "./Favorites.css"

function WeeklyFavorite(props) {
  return (
    <div className='favorites-detail'>
        <p className="favorites-number">{props.number}</p>
        <div className="favorites-block">
            <img className="favorites-img1" src={"/Assets/Photos/HomePage/Favorites/Favorites"+props.number+".png"} alt="top1" />
            <p className="favorites-name">{props.title}</p>
            <p className="favorites-desc">{props.description}</p>
        </div>
    </div>
  )
}

export default WeeklyFavorite