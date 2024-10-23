import { useState , useEffect } from "react"
import { useGetAllOrdersQuery, useGetAnOrderQuery } from "../../slices/apiSlice"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import { Link } from "react-router-dom"
import { FaDotCircle } from "react-icons/fa"
import axios from "axios"

const AdminOrder = () => {

    const params = useParams()
    const {data : order , isLoading , isError} = useGetAnOrderQuery(params.order_id)

    const [update , setUpdate] = useState(false)
    const [status , setStatus] = useState(0)

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
  

    const onChange = async (e) => {

        if(e.target.value === 'accept' && status < 1 ){
            setStatus(1)
            const response = await axios.put(`http://localhost:5000/admin/update-status/${params.order_id}/${e.target.value}` ,{} , {withCredentials : true})
        console.log(response.data);
        console.log("update Stocks");
            
        }
        if(e.target.value === 'processing' && status < 2){
            setStatus(2)
            const response = await axios.put(`http://localhost:5000/admin/update-status/${params.order_id}/${e.target.value}` ,{} , {withCredentials : true})
        console.log(response.data);
        console.log("update Stocks");
         
        }
        if(e.target.value === 'dispatch' && status < 3){
            setStatus(3)
            const response = await axios.put(`http://localhost:5000/admin/update-status/${params.order_id}/${e.target.value}` ,{} , {withCredentials : true})
        console.log(response.data);
        console.log("update Stocks");
           
        }
        if(e.target.value === 'transporting' && status < 4){
            setStatus(4)
            const response = await axios.put(`http://localhost:5000/admin/update-status/${params.order_id}/${e.target.value}` ,{} , {withCredentials : true})
        console.log(response.data);
        console.log("update Stocks");
            
        }
        if(e.target.value === 'nearby' && status < 5){
            setStatus(5)
            const response = await axios.put(`http://localhost:5000/admin/update-status/${params.order_id}/${e.target.value}` ,{} , {withCredentials : true})
        console.log(response.data);
        console.log("update Stocks");
            
        }
        if(e.target.value === 'out-for-delivery' && status < 6){
            setStatus(6)
            const response = await axios.put(`http://localhost:5000/admin/update-status/${params.order_id}/${e.target.value}` ,{} , {withCredentials : true})
        console.log(response.data);
        console.log("update Stocks");
            
        }
        if(e.target.value === 'delivered' && status < 7){
            setStatus(7)
            const response = await axios.put(`http://localhost:5000/admin/update-status/${params.order_id}/${e.target.value}` ,{} , {withCredentials : true})
        console.log(response.data);
        console.log("update Stocks");
        }
            
    }

    if(isLoading){
        console.log("loading...");
    }else{
       
        
        return(
        <>
        <Header/>

        <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'70%' , margin:'auto' , marginTop:'30px'}} >Order ({params.order_id}) </h1>

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

    <div className="order-cust-details">
        <div className="cust-box">

        <h2>Customer</h2>
        <h3>Name : {order.user.name}</h3>
        <h3>Email : {order.user.email}</h3>
        {/* <h3>Phone Number : {order.user.phoneNumber}</h3> */}
        <h3>Order placed at : {order.createdAt}</h3>
        </div>
    </div>


    <div className="add-pay-box">


    <div className="order-address">
        <h2>Address </h2>
        <h3>{order.address.particulars}/{order.address.city}/{order.address.pincode}/{order.address.state}</h3>
    </div>

    <div className="order-payment">
        <h2>Payment method : Cash on delivery</h2>
        <h2>Payment status : Collect ${order.grandTotal} </h2>
    </div>
    </div>

    <div className="order-status">

        {update ? <>

        <h2>Status Update</h2>

            <div className="bbn" style={{display:'flex' , flexDirection:'column'}} >
                
                <div className="a1">
            <input type="checkbox" onChange={onChange} value="accept" checked={status >=1}  /> <span>Accept & Update Stocks</span>

                </div>
                <div className="a1">

            <input type="checkbox" onChange={onChange} value="processing" checked={status >=2} /> <span>Processing</span>
                </div>
                <div className="a1">
            <input type="checkbox" onChange={onChange} value="dispatch" checked={status >=3} /> <span>Dispatching</span>

                </div>
                <div className="a1">
            <input type="checkbox" onChange={onChange} value="transporting" checked={status >=4} /> <span>Transporting</span>

                </div>
                <div className="a1">

            <input type="checkbox" onChange={onChange} value="nearby" checked={status >=5} /> <span>Nearby Facility</span>
                </div>
                <div className="a1">
            <input type="checkbox" onChange={onChange} value="out-for-delivery" checked={status >=6} /> <span>Out for delivery</span>

                </div>
                <div className="a1">
            <input type="checkbox" onChange={onChange} value="delivered" checked={status >=7} /> <span>Delivered</span>

                </div>
      
            </div>

        
        <button onClick={() => setUpdate(!update)} >Save</button>

        </> : <>
        
        <h2>Order Status (Updated At : {order.createdAt})</h2>

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

        <button onClick={() => setUpdate(!update)} >Update</button>

        </> }
    </div>

    </>
)
}
}
export default AdminOrder