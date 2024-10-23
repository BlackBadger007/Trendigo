import { useGetAllOrdersQuery } from "../../slices/apiSlice"
import { Link, useNavigate } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa"
import Buffer from "../../components/Buffer"
import Header from "../../components/Header"

const AdminOrders = () => {

    const {data : orders , isLoading , isError} = useGetAllOrdersQuery()

    const navigate = useNavigate()

    const onSelect = (e) => {
        console.log("hih");
        console.log(e.target.value);
    }
    const onChange = (e) => {
        console.log("hih");
        console.log(e.target.value);
    }


    if(isLoading){
        return <Buffer/>
    }else{
        console.log(orders);

        return(
            <>
        <Header/>

            <div className="admin-orders">
            <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'60%' , margin:'auto' , marginTop:'30px'}} >({orders.length}) Orders</h1>

            {

orders.map((order) => (

        <div className="ord-smr" style={order.status === 'delivered' ? {opacity : '0.6'} : {}} >
            <div className="ord-head">

<h1>Placed on {order.createdAt} ({order.status}) </h1>
<button onClick={() => navigate(`/admin/order/${order._id}`)} ><FaChevronRight/></button>
            </div>
{
order.product.map((x) => (
    <div className="ord-smr-card"  >
        <img src={x.image} alt="" />
        <h3>{x.brand} {x.title} </h3>
        <h3>{x.qty}qty x ${x.price} : {x.totalPrice}</h3>
    </div>
))

}

<div className="ord-smr-total">
</div>
</div>
    

))
}
                <div className="ad-ord-card">

                </div>
            </div>

       


        </>
    )
    }
}
export default AdminOrders