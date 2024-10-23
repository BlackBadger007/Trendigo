import { useEffect, useState } from "react"
import Buffer from "../components/Buffer"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaTrash , FaEdit ,FaPlus , FaMinus ,FaCheck ,FaLink} from "react-icons/fa"
import { ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from 'sweetalert2';

import {FaUser , FaHeart , FaShoppingCart , FaMapMarkerAlt} from "react-icons/fa"
import Header from "../components/Header"

const Cart = () => {
    
    const navigate = useNavigate()
    const [cart , setCart] = useState('')
    const [loading , setLoading] = useState(true)
    const [show , setShow] = useState(false)
    const [edit , setEdit] = useState('')
    const [qty , setQty] = useState()
    const [total , setTotal] = useState(0)

    useEffect(() => {
        const cart = () =>{
            if(localStorage.getItem('Cart') === 'null'){
                setCart('')
            }else{
                let item = JSON.parse(localStorage.getItem('Cart'))
                setCart(item)
                let sum = 0;
                item.map((x) => (sum += Number(x.price)))
                setTotal(sum)
            }
        }
        cart()
        setLoading(false)
    },[])

    useEffect(() => { setQty(edit.qty) },[edit])

    const save = async (id) => {
        let items = JSON.parse(localStorage.getItem('Cart'))
        let old = await items.filter((x) => x._id === id)

        console.log(old[0].image);

        items = await items.filter((x) => x._id !== id)

        let modified = { _id : old[0]._id,
            qty : qty,
            brand : old[0].brand,
            name: old[0].name , 
            title : old[0].title , 
            image: old[0].image , 
            description: old[0].description,
            price : old[0].price,
            mrp : old[0].mrp,
        }

        items.push(modified)

        localStorage.setItem('Cart' , JSON.stringify(items))
        toast('Quantity Updated')

        setCart(items)

        
        setEdit('')
    }

    const remove = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then( async (result) =>  {
            if (result.isConfirmed) {

                let iteminStorage;

   
                    iteminStorage = JSON.parse(localStorage.getItem('Cart'))

                iteminStorage =await  iteminStorage.filter((x) => x._id !== id )
            

                localStorage.setItem('Cart' , JSON.stringify(iteminStorage))

                setCart(iteminStorage)
                toast('Product Removed') 
            }
        });

    }

    const signout = () => {

    }

    if(loading){
        return <Buffer/>
    }else{

        return(
            <>
            <ToastContainer style={{fontSize:'20px' , fontWeight:'300'}} />

            <Header/>

            
        <div className="cart"  >

            {
                !cart ? <><h1 style={{fontSize:'40px' , fontWeight:'300',textAlign:'center' , color:'white' , marginTop:'100px'}}>Nothing added to Cart !</h1></> : 
                <>
                <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'60%' , margin:'auto' , marginTop:'30px'}} >Your Cart</h1>
                {
                    cart.map((x) => (
                        
                        
                        <div className="l2-card" style={{marginTop:'5px' , marginBottom:'20px' , width:'60%'}} >
    
                        <div className="l2-card-img" style={{width:'45%'}} >
                        <img src={x.image} alt="" />

                        </div>
                        <div className="l2-card-info" style={{width:'50%'}}>

                        <h2 >{x.brand} {x.title} {x.description} <Link to={`/product/${x._id}`}  >visit</Link> </h2>
                        <h3 style={{color:'orange'}} >-{(((Number(x.mrp) - Number(x.price))*100)/Number(x.mrp)).toFixed(0)}%% ${x.price} </h3>
                        <h3 style={{textDecorationLine:'line-through'}} >M.R.P. ${x.mrp}</h3>
         
                         { edit._id === x._id ? <>
                         <div className="edit">

                        <input type="text" id="qty"  value={qty}  />
                        <button onClick={() => setQty(qty + 1)} ><FaPlus/></button>
                        <button onClick={() => setQty(qty - 1)} ><FaMinus/></button>
                        <button onClick={() => save(x._id)} style={{backgroundColor:'orange'}} title="Save" ><FaCheck/></button>
                         </div>

                        </> : <><h3>Quantity : {x.qty}</h3></>}
                        <h3>Total | {x.qty}qty x ${x.price} | : ${Number(x.qty)*Number(x.price)}</h3>
                        </div>
                        <div className="rem-btn" style={{width:'5%'}}> 
                        <button className="remove" onClick={() => remove(x._id)} ><FaTrash/></button>
                        <button className="remove" onClick={() => setEdit( {_id :  x._id , qty : Number(x.qty)})} ><FaEdit/></button>
                        
                        </div>
                        </div>
                    ))

                    
                }
                <div className="total">
                <h1>Grand Total : ${total}</h1>
                   
                    <button onClick={() => navigate('/place-order/cart')} >Buy Now</button>
                </div>
                </>
            }
        </div>
        </>
    )
}
}
export default Cart