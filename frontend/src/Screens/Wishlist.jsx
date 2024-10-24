import { useState } from "react"
import { useEffect } from "react"
import Buffer from "../components/Buffer"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaTrash} from "react-icons/fa"
import { ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from 'sweetalert2';
import Header from "../components/Header"

const Wishlist = () => {

    const navigate = useNavigate()
    
    const [wishlist , setWishlist] = useState('')
    const [loading , setLoading] = useState(true)
    const [show , setShow] = useState(false)

    useEffect(() => {
        const wishlist = () =>{
            if(localStorage.getItem('Wishlist')){

                if(localStorage.getItem('Wishlist') === 'null'){
                    setWishlist([])
                }else{
                    const item = JSON.parse(localStorage.getItem('Wishlist'))
                    setWishlist(item)
                }
            }else{
                setWishlist([])

            }
        }
        wishlist()
        setLoading(false)
    },[])

    const remove = (id) => {
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

                    iteminStorage = JSON.parse(localStorage.getItem('Wishlist'))

                iteminStorage =await  iteminStorage.filter((x) => x._id !== id )

                localStorage.setItem('Wishlist' , JSON.stringify(iteminStorage))

                setWishlist(iteminStorage)
                toast('Product Removed') 
            }
        });
    }

    if(loading){
        return <Buffer/>
    }else{

        return(
            <>
            <ToastContainer style={{fontSize:'20px' , fontWeight:'300'}} />
            <Header/>

        <div className="wishlist">
            {
                wishlist.length === 0 ? <><h1 style={{fontSize:'40px' , fontWeight:'300',textAlign:'center' , color:'white' , marginTop:'100px'}} >Nothing added to Wishlist !</h1></> : 
                <>
                <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'60%' , margin:'auto' , marginTop:'30px'}} >Your Wishlist</h1>
                {
                    wishlist.map((x) => (
                        <div className="l2-card" style={{marginTop:'5px' , marginBottom:'20px' , width:'60%'}} >
                        <div className="l2-card-img" style={{width:'45%'}} >
                        <img src={x.image} alt="" />

                        </div>
                        <div className="l2-card-info" style={{width:'50%'}}>

                        <h2>{x.brand} {x.title} {x.description} <Link to={`/product/${x._id}`} >Visit</Link> </h2>
                        <h3 style={{color:'orange'}} >-{(((Number(x.mrp) - Number(x.price))*100)/Number(x.mrp)).toFixed(0)}%% ${x.price}</h3>
                        <h3 style={{textDecorationLine:'line-through'}} >M.R.P. ${x.mrp}</h3>
                        <h3>In Stock : {x.inStock}</h3>
                        </div>
                        <div className="rem-btn" style={{width:'5%'}}> 
                        <button className="remove" onClick={() => remove(x._id)}><FaTrash/></button>

                        </div>
                        </div>
                    ))
                }
                </>
            }
        </div>
        </>
    )
}
}
export default Wishlist