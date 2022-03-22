import React from 'react'
import "./ProductsPage.css"
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import ProductCard from '../../Components/ProductCard/ProductCard'


function ProductsPage() {

    const productos = [
        {name: "Chaleco Cumbal",
         price: 300000},
         {name: "Anillo filigrana",
         price: 80000},
        {name: "Set de anillos",
         price: 50000},
        {name: "Anillo amatista",
         price: 100000},
        {name: "Mochila wayuu",
         price: 200000},
        {name: "Aretes filigrana",
         price: 90000},
        {name: "Collar chaquiras",
         price: 40000},
        {name: "Carteras wayuu",
         price: 70000},
        {name: "Mochilas",
         price: 150000},
        {name: "Sombrero decorado",
         price: 40000},
        {name: "Cadenas en oro",
         price: 110000},
        {name: "Gorra artesanal",
         price: 40000},
        {name: "Sombreros vueltiao",
         price: 120000},
        {name: "Pulseras artesanales",
         price: 80000},
        {name: "Set de anillos",
         price: 65000},
        {name: "Sombrero azul",
         price: 145000},
        {name: "Candongas filigrana",
         price: 175000},
        {name: "Anillo plata",
         price: 82000},
        {name: "Cartera vinotinto",
         price: 220000},
        {name: "Set de cadenas",
         price: 80000},
        {name: "Mochila arhuaca",
         price: 150000},
         {name: "Aretes tejidos",
         price: 60000},
        {name: "Aretes flor",
         price: 70000},
        {name: "Mochila chaquiras",
         price: 400000},
        {name: "Ruana cruzada",
         price: 200000},
        {name: "Mochilas wayuu",
         price: 160000},
        {name: "Set de cadenas",
         price: 80000},
        {name: "Mochila wayuu",
         price: 180000}
    ]
        

    return (
        <div className='Products'>
            <Topbar/>
            <Navbar/>
            <div className="products-header">
                <h3>Productos</h3>
                <p>Antójate de las mejores artesanías diseñadas y fabricadas en Colombia.</p>
            </div>
            <div className="products-filters">
                <p className="products-filters-tit">FILTROS</p>
                <div className="products-filters-content" >
                    <select id="inputState" className="form-control" name="tipo" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Tipo</option>
                        <option value="form-artesania-indigena">Artesanía indígena</option>
                        <option value="form-artesania-tradicional">Artesanía tradicional</option>
                        <option value="form-artesania-contemporanea">Artesanía contemporánea</option>
                    </select>
                    <select id="inputState" className="form-control" name="tipo" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Oficio</option>
                        <option value="form-joyeria">Joyería y bisutería</option>
                        <option value="form-tejeduria">Tejeduría y bordado</option>
                        <option value="form-cesteria">Cestería y sombrería</option>
                        <option value="form-ceramica">Cerámica y vidrio</option>
                        <option value="form-marroquinera">Marroquinería</option>
                        <option value="form-marqueteria">Marquetería</option>
                    </select>
                    <select id="inputState" className="form-control" name="tipo" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Región</option>
                        <option value="form-caribe">Caribe</option>
                        <option value="form-pacifica">Pacífica</option>
                        <option value="form-andina">Andina</option>
                        <option value="form-orinoquia">Orinoquía</option>
                        <option value="form-amazonia">Amazonía</option>
                    </select>
                    <button type="submit" className="btn">Filtrar</button>
                </div>
            </div>
            <div className='products-container'>
                {productos.map((producto, index) =>
                    <div className='products-container-row' key={index}><ProductCard index={index+1} name={producto.name} price={producto.price} key={index} /></div>
                )}
            </div>
            <Footer/>
        </div>
    )
}

export default ProductsPage
