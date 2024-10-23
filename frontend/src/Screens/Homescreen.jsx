import { useGetProductsQuery  } from "../slices/apiSlice"
import { Link } from "react-router-dom"
import Buffer from "../components/Buffer"
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Swiper from "../components/Swiper"
import Footer from "../components/Footer"
import { FaExclamationTriangle } from "react-icons/fa"

const Homescreen = () => {

    const {data:products  , isLoading , error} = useGetProductsQuery()
    

    if(isLoading){
        return<Buffer/>

    }else{

    if(!products){
        return(
            <>

            <div className="header">
        <h2 style={{marginBottom:'5px'}} >Trendigo</h2>
        </div>
        <h2 style={{textAlign:'center' ,
            fontSize : '45px' ,
            fontWeight: '300',
            color:'white',
            marginTop:'150px'}} >Something went wrong <FaExclamationTriangle style={{fontSize:'35px'}} /></h2>
            </>
        )
    }else{

        
        return(
            <>
            <Header/>
            <Navbar/>
            <div className="box">
            <div className="b1">
                <Swiper/>
  
            </div>
               
            <div className="grid">
                {
                    products.map((x) => (
                        
                        <Link to={`/product/${x._id}`} key={x._id} className="swip-category" >
                        <div className="grid-card" >
                            <img src={x.image} alt="" />
                            <div className="grid-info">
                            <h2>{x.brand} {x.title} {x.description}</h2>
                            <h3 style={{ color:"orange"}} >-{(((Number(x.mrp) - Number(x.price))*100)/Number(x.mrp)).toFixed(0)}% ${x.price}</h3>
                            <h3 style={{textDecoration:'line-through'}} >M.R.P. ${x.mrp}</h3>
                            </div> 
                        </div>
                        </Link>
                    ))
                }


            </div>
        </div>
        <Footer/>
                    </>
        )}
    }
       
}

export default Homescreen
