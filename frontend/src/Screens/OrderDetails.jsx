import { useParams } from "react-router-dom"
import { useGetOrderDetailsQuery } from "../slices/apiSlice"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { FaDotCircle } from "react-icons/fa"
import { useEffect, useState } from "react"
import Buffer from "../components/Buffer"

const OrderDetails = () => {

    const params = useParams()
    const {data : order , isLoading , isError} = useGetOrderDetailsQuery(params._id)
    const [status , setStatus] = useState(0)
    console.log(order);

    useEffect(() => {
        if(order){

            if(order.status === 'accept'){
                setStatus(1)
            }
            if(order.status === 'processing'){
                setStatus(2)
            }
            if(order.status === 'dispatch'){
                setStatus(3)
        }
        if(order.status === 'transporting'){
            setStatus(4)
        }
        if(order.status === 'nearby'){
            setStatus(5)
        }
        if(order.status === 'out-for-delivery'){
            setStatus(6)
        }
        if(order.status === 'delivered'){
            setStatus(7)
        }
    }
    } , [order])

    if(isLoading){
        return<Buffer/>
    }else{
    console.log(order);

        return(
            <>
            <Header/>

            <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'70%' , margin:'auto' , marginTop:'30px'}} >Your Order</h1>

        <div className="order-smr">
            {
                order.product.map((x) => (
                    <div className="order-smr-card">
                        <div className="order-smr-img">

                        <img src={x.image} alt="" />
                        </div>
                        <div className="order-smr-info">
                            <h2>{x.brand} {x.title} <Link to={`/product/${x._id}`} >visit</Link> </h2>
                            <h3>${x.price}</h3>
                            <h3>Quantity : {x.qty}</h3>
                            <h3>Total | {x.qty}qty x ${x.price} | : ${Number(x.qty) * Number(x.price)}</h3>
                        </div>
                    </div>
                ))
            }
            <div className="order-total">
                <h2>Grand Total : ${order.grandTotal}</h2>
            </div>
        </div>

        <div className="add-pay-box">


        <div className="order-address">
            <h2>Address </h2>
            <h3>{order.address.particulars}/{order.address.city}/{order.address.pincode}/{order.address.state}</h3>
        </div>

        <div className="order-payment">
            <h2>Payment method : Cash on delivery</h2>
            <h2>Payment status : Pay ${order.grandTotal} </h2>
        </div>
        </div>

        <div className="order-status">

            <h2>Order Status (Updated At : {order.updatedAt}) </h2>

            <div className="order-status-box">

            <h3 style={status >= 0 ? {color : 'orange'} : {}} ><FaDotCircle/> Order Placed</h3>
            <h3 style={status >= 1 ? {color : 'orange'} : {}}><FaDotCircle/> Order Accepted</h3>
            <h3 style={status >= 2 ? {color : 'orange'} : {}}><FaDotCircle/> Order Processed</h3>
            <h3 style={status >= 3 ? {color : 'orange'} : {}}><FaDotCircle/> Order Dispatched</h3>
            <h3 style={status >= 4 ? {color : 'orange'} : {}}><FaDotCircle/> Transporting</h3>
            <h3 style={status >= 5 ? {color : 'orange'} : {}}><FaDotCircle/> Order Arrived at Nearby Facility</h3>
            <h3 style={status >= 6 ? {color : 'orange'} : {}}><FaDotCircle/> Out for delivery</h3>
            <h3 style={status >= 7 ? {color : 'orange'} : {}}><FaDotCircle/> Delivered</h3>
            </div>
        </div>

        </>
    )
    }
}
export default OrderDetails