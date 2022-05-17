import React from 'react'
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
            <h3><FormattedMessage id="FavoritesSlogan" values={{
                span: (chunks) => <span>{chunks}</span>
            }}/> </h3>
        </div>

        <div className="favorites-content">
            {favorites.map((favorite, index) =>
                <div className="favorite-container" key={index} >
                    <div className="favorite-container-image">
                        <p className="favorite-number">{index+1}</p>
                        <img className="favorite-image" src={"/Assets/Photos/HomePage/Favorites/Favorites"+(index+1)+".png"} alt="top1" />
                    </div>
                    <p className="favorite-name">{favorite.title}</p>
                    <p className="favorite-description">{favorite.description}</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Favorites