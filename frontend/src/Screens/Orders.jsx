import Header from "../components/Header"
import { useGetOrdersQuery } from "../slices/apiSlice"
import { useParams } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa"
import Buffer from "../components/Buffer"

const Orders = () => {

    const params = useParams()
    const navigate = useNavigate()

    const {data : orders , isLoading , isError} = useGetOrdersQuery(params._id)

    if(isLoading){
        return <Buffer/>
    }else{
 
        return(
            <>
            <Header/>

            {orders.length === 0 ? <><h1 style={{fontSize:'40px' , fontWeight:'300',textAlign:'center' , color:'white' , marginTop:'100px'}}>No Order Placed !</h1></> : <>
            
            

        <div className="wishlist">
            <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'60%' , margin:'auto' , marginTop:'30px'}} >Your Orders</h1>
            {

                orders.map((order) => (

                        <div className="ord-smr" key={order._id} style={order.status === 'delivered' ? {opacity : '0.6'} : {}} >
                        <div className="ord-head">

                        <h1>Placed on {order.createdAt} ({order.status}) </h1>
                        <button onClick={() => navigate(`/order/${order._id}`)} ><FaChevronRight/></button>
                        </div>
            {
                order.product.map((x) => (
                    <div className="ord-smr-card" key={x._id} >
                        <img src={x.image} alt="" />
                        <h3>{x.brand} {x.title} </h3>
                        <h3>{x.qty}qty x $5000 : {x.qty * 5000}</h3>
                    </div>
                ))
            
            }
           
            <div className="ord-smr-total">
 
            </div>
        </div>
                    

                ))
            }
        </div>
        </>}
        </>
    )
}
        
    
}
export default Orders