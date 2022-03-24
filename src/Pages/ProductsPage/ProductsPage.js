import React, {useState} from 'react'
import "./ProductsPage.css"
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Filter from "../../Components/Filters/Filter";
import Products from "../../Mockup/Product/Products";

function ProductsPage() {

    const [products, setProducts] = useState(Products);

    const optionsSearchForm = {"Region": ["Pacific", "Caribbean", "Andean", "Orinoquia", "Amazonian"],
        "Type": ["Indigenous", "PopularTraditional", "Contemporary"],
        "Job": ["JewelerySilversmith", "PotteryCeramicGlass", "KnittingEmbroidery", "BasketryHats", "WoodWork", "Leather"]}

    const [searchForm, setSearchForm] = useState(
        {"Region":"DEFAULT", "Type": "DEFAULT", "Job": "DEFAULT"})


    return (
        <div className='Products'>
            <Topbar/>
            <Navbar/>
            <div className="products-header">
                <h3>Productos</h3>
                <p>Antójate de las mejores artesanías diseñadas y fabricadas en Colombia.</p>
            </div>
            <div className="filter-container">
                <Filter options={optionsSearchForm} state={searchForm} setState={setSearchForm}/>
                <button type="submit" className="btn">Filtrar</button>
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
