import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useGetSearchProductQuery } from "../slices/apiSlice"
import Buffer from "../components/Buffer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchProduct = () => {

    const params = useParams()

    const {data:product , isLoading , isError} = useGetSearchProductQuery(params.product)

    if(isLoading){
        return<Buffer/>
    }else{
         
        return(
            <>
        <Header/>
        <Navbar/>

            {product.length === 0 ? <>

                <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'fit-content' , margin:'auto' , marginTop:'100px'}} >Nothing Found !</h1>
            </> : <>

        <div className="listings">
            <div className="l1">
                <h1>({product.length}) Result's found for {params.product}</h1>
            </div>
            <div className="l2"  >
                {        
                    product.map((x) => (
                        
                        <Link to={`/product/${x._id}` } key={x._id} className="swip-category">

                        <div className="l2-card"  >
                        <div className="l2-card-img">
                        <img src={x.image} alt="" />

                        </div>
                        <div className="l2-card-info">

                        <h2 >{x.brand} {x.title} {x.description} {x.specification} </h2>
                       
                        <h3 style={{color:'orange'}} >-{(((Number(x.mrp) - Number(x.price))*100)/Number(x.mrp)).toFixed(0)}%% ${x.price}</h3>
                        <h3 style={{textDecorationLine:'line-through'}} >M.R.P. ${x.mrp}</h3>
                        <h3>In Stock : {x.inStock}</h3>
                        </div>
                        </div>
                        </Link>
                    
 ))
} 
            </div>
        </div>
        </>}
        </>
    )
}
}
export default SearchProduct