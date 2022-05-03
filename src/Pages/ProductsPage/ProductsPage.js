import React, {useLayoutEffect, useState} from 'react'
import "./ProductsPage.css"
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Filter from "../../Components/Filters/Filter";
import Products from "../../Mockup/Product/Products";
import {FormattedMessage} from "react-intl";

function ProductsPage() {

    const [products, setProducts] = useState(Products);

    const optionsSearchForm = {"Region": ["Pacific", "Caribbean", "Andean", "Orinoquia", "Amazonian"],
        "Type": ["Indigenous", "PopularTraditional", "Contemporary"],
        "Job": ["JewelerySilversmith", "PotteryCeramicGlass", "KnittingEmbroidery", "BasketryHats", "WoodWork", "Leather"]}

    const [searchForm, setSearchForm] = useState(
        {"Region":"DEFAULT", "Type": "DEFAULT", "Job": "DEFAULT"})

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })


    return (
        <div className='Products'>
            <Topbar/>
            <Navbar/>
            <div className="container-fluid">
                <div className="row products-row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="products-header">
                            <h3><FormattedMessage id="Products"/></h3>
                            <p><FormattedMessage id="ProductsPageMessage"/></p>
                        </div>
                        <div className="filter-container">
                            <Filter options={optionsSearchForm} state={searchForm} setState={setSearchForm}/>
                        </div>
                    </div>
                    <div className="products-image-col col-lg-6 col-xl-6 d-none d-lg-block d-xl-block">
                        <img id="colombia_map" src="/Assets/Map/MapRegions.png"/>
                    </div>

                </div>
            </div>
            <div className='products-container'>
                {products.map((producto, index) =>
                    <div className='products-container-row' key={index}><ProductCard index={index+1} name={producto.name} price={producto.price} key={index} image={producto.media[0]["Photo1"]}/></div>
                )}
            </div>

            <Footer/>
        </div>
    )
}

export default ProductsPage
