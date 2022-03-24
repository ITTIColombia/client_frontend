import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/HomeComponents/Banner'
import Footer from '../../Components/Footer/Footer'
import './Home.css'
import Favorites from '../../Components/HomeComponents/Favorites'
import Editorial from '../../Components/HomeComponents/Editorial'
import PopularArtisans from '../../Components/HomeComponents/PopularArtisans'

function Home(){
    return (
        <div className='Home'>
            <Topbar/>
            <Navbar/>
            <Banner/>
            <Favorites/>
            <PopularArtisans/>
            <Editorial/>
            <Footer/>


        </div>
    )
}


export default Home;