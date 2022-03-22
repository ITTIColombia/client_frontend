import React from 'react'
import { useParams, Link } from 'react-router-dom';
import "./ProductDetail.css"
import Bread from '../../Components/Breadcrumbs/Breadcrumbs';
import ButtonOrange from '../../Components/Buttons/ButtonOrange';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Topbar from '../../Components/Topbar/Topbar';
import right from "../../Assets/Icons/rightarrow.svg";

function ProductDetail() {

    let params = useParams();
    let index = params.id;
 
    console.log(params)

    const productos = [
        {name: "Chaleco Cumbal",
         price: "$350.000",
         departament: "Nariño", 
         brand: "Tejidos Machines", 
         brandDescription: "Tejidos Machines es un grupo de artesanos de Cumbal, Nariño, al sur del país, casi en la frontera con Ecuador. Los artesanos de Tejidos Machines se especializan en tejeduría en guanga y telar horizontal donde trabajan con lana de obeja e hilo para hacer ruanas, chalecos y cobijas.",
         description: "Chaleco cumbal tejido a mano en lana de oveja con hilo en tonos tierra con detalles rojos.",
         type: "Artesanía tradicional", 
         oficio: "Tejeduría", 
         tecnica: "Guanga y telar horizontal", 
         time: "Una semana"},
        {name: "Anillo filigrana",
         price: "$80.000"},
        {name: "Set de anillos",
         price: "$50.000"},
        {name: "Anillo amatista",
         price: "$100.000"},
        {name: "Mochila wayuu",
         price: "$200.000"},
        {name: "Aretes filigrana",
         price: "90.000"},
        {name: "Collar chaquiras",
         price: "$40.000"},
        {name: "Carteras wayuu",
         price: "$70.000"},
        {name: "Mochilas",
         price: "$150.000"},
        {name: "Sombrero decorado",
         price: "$40.000"},
        {name: "Cadenas en oro",
         price: "$110.000"},
        {name: "Gorra artesanal",
         price: "$40.000"},
        {name: "Sombreros vueltiao",
         price: "$120.000"},
        {name: "Pulseras artesanales",
         price: "$80.000"},
        {name: "Set de anillos",
         price: "$65.000"},
        {name: "Sombrero azul",
         price: "$145.000"},
        {name: "Candongas filigrana",
         price: "$175.000"},
        {name: "Anillo plata",
         price: "$82.000"},
        {name: "Cartera vinotinto",
         price: "$220.000"},
        {name: "Set de cadenas",
         price: "$40.000"},
        {name: "Mochila arhuaca",
         price: "$150.000"},
        {name: "Aretes tejidos",
         price: "$60.000"},
        {name: "Aretes flor",
         price: "$70.000"},
        {name: "Mochila chaquiras",
         price: "$400.000"},
        {name: "Ruana cruzada",
         price: "$200.000"},
        {name: "Mochilas wayuu",
         price: "$160.000"},
        {name: "Set de cadenas",
         price: "$80.000"},
        {name: "Mochila wayuu",
         price: "$180.000"}
    ]


    return (
        <div className='ProductDetail'>
            <Topbar/>
            <Navbar/>
            <Bread pathName="PRODUCTOS" path="/productos" name={productos[index-1].name}/>
            <div className='productDetail-container'>
                <div className='productDetail-container-first'>
                    <img className="productDetail-img-princ" src={require('../../Assets/Photos/Artisans/Artisan'+index+'/Product1/Foto1.png')} alt="Foto Producto" /> 
                    <div className='productDetail-container-first-right'>
                        <p className='productDetail-brandName'>{productos[index-1].brand}</p>
                        <h3 className='productDetail-productName'>{productos[index-1].name}</h3>
                        <p className='productDetail-description'>{productos[index-1].description}</p>
                        <div className='productDetail-details'>
                            <p className='productDetail-details-txt'><span>TIPO</span> - {productos[index-1].type}</p>
                            <p className='productDetail-details-txt'><span>OFICIO</span> - {productos[index-1].oficio}</p>
                            <p className='productDetail-details-txt'><span>TÉCNICA</span> - {productos[index-1].tecnica}</p>
                            <p className='productDetail-details-txt'><span>TIEMPO ELABORACIÓN</span> - {productos[index-1].time}</p>
                        </div>
                        <p className='productDetail-price'>{productos[index-1].price} + IVA</p>
                        <ButtonOrange path="/" text="COMPRAR" />
                    </div>
                </div>
                <div className='productDetail-container-second'>
                    <img className="productDetail-img" src={require('../../Assets/Photos/Artisans/Artisan'+index+'/Product1/Foto1.png')} alt="Foto Producto" /> 
                    <img className="productDetail-img" src={require('../../Assets/Photos/Artisans/Artisan'+index+'/Product1/Foto2.png')} alt="Foto Producto" /> 
                    <img className="productDetail-img" src={require('../../Assets/Photos/Artisans/Artisan'+index+'/Product1/Foto3.png')} alt="Foto Producto" /> 
                </div>
                <div className='productDetail-container-third'>
                    <img className="product-img" src={require('../../../assets/Map/Color/'+productos[index-1].departament+'.svg')} alt="Mapa Colombia" /> 
                    <div className='productDetail-container-third-right'>
                        <p className='productDetail-productNameBrand'>El mundo de los <span>artesanos...</span></p>
                        <p className='productDetail-artisans-description'>{productos[index-1].brandDescription}</p>
                        <Link to="/">
                            <p className='productDetail-artisans-description'>Conoce más sobre {productos[index-1].brand} aquí <img className="productDetail-arrow" src={right} alt="Flecha" /> </p>
                        </Link>
                        <div className='productDetail-artisans'>
                            <img className="productDetail-artisans-img" id="right" src={require('../../Assets/Photos/Artisans/Artisan'+index+'/Artisans1.png')} alt="Foto Artesano" /> 
                            <img className="productDetail-artisans-img" src={require('../../Assets/Photos/Artisans/Artisan'+index+'/Artisans2.png')} alt="Foto Artesano" /> 
                        </div>
                    </div>

                </div>

            </div>
            <Footer/>
        </div>
        
    )
}

export default ProductDetail
