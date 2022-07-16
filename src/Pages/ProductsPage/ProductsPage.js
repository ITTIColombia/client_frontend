import React, {useEffect, useLayoutEffect, useState} from 'react'
import "./ProductsPage.css"
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Filter from "../../Components/Filters/Filter";
import {FormattedMessage} from "react-intl";

function ProductsPage() {

    const [products, setProducts] = useState([]);

    const optionsSearchForm = {"Region": ["Pacific", "Caribbean", "Andean", "Orinoquia", "Amazonian"],
        "Type": ["Indigenous", "PopularTraditional", "Contemporary"],
        "Job": ["JewelerySilversmith", "PotteryCeramicGlass", "KnittingEmbroidery", "BasketryHats", "WoodWork", "Leather"]}

    const [searchForm, setSearchForm] = useState(
        {"Region":"DEFAULT", "Type": "DEFAULT", "Job": "DEFAULT"})

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    })

    // Retrieve artisans from backend
    useEffect(()=> {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((res)=>{
            if(res.status === 200){
                res.json().then(json=>{
                    setProducts(json)
                }).catch(err=>{
                    console.log("Error extracting json:", err)
                })
            }else if(res.status === 204){
                setProducts([])
            }
        }).catch(err=>{
            console.log("Error receiving artisans:", err)
        })
    }, [])



    return (
        <React.Fragment>
            <Navbar/>
            <div id='Products'>
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
                    {products.map((product, index) =>
                        <div className='products-container-row' key={index}>
                            <ProductCard index={index+1} name={product.name} price={product.price} key={index} product={product}
                                         image={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_ID}/artisans/${product.artisan}/`+product.media.photos[0]}/>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </React.Fragment>

    )
}

export default ProductsPage
