import React from 'react'
import WeeklyFavorite from './WeeklyFavorite'
import "./Favorites.css"
import { FormattedMessage } from 'react-intl'

const favorites = [
    {title: "Bereke",
     description: "Pulseras artesanales con toque moderno hechas a mano"},
    {title: "Camellet",
    description: "Cartera en piedras hecha a mano"},
    {title: "Monarda",
    description: "Sombrero Marino 100% paja azul con dorado"},
    {title: "Filpox",
    description: "Aretes de oro en filigrana de Mompox"}
]

function Favorites() {
  return (
    <div className="Favorites">
         <div className="favorites-title">
            <h3><FormattedMessage id="FavoritesSlogan1"/> <span><FormattedMessage id="FavoritesSloganSpan"/></span><FormattedMessage id="FavoritesSlogan2"/></h3>
        </div>
        <div className="favorites-content">
            {favorites.map((favorite, index) =>
                <div key={index}><WeeklyFavorite number={index+1} img={index+1} title={favorite.title} description={favorite.description} /></div>
            )}
        </div>
    </div>
  )
}

export default Favorites