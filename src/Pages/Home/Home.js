import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/HomeComponents/Banner'
import Footer from '../../Components/Footer/Footer'
import './Home.css'
import Favorites from '../../Components/HomeComponents/Favorites'

function Home(){
    return (
        <div className='Home'>
            <Topbar/>
            <Navbar/>
            <Banner/>
            <Favorites/>
            <Footer/>


        </div>
    )
}


export default Home;