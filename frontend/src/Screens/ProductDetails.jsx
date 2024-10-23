import { useLocation, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { useGetProductDetailsQuery, useGetSearchProductQuery } from "../slices/apiSlice"
import Buffer from "../components/Buffer"
import { ToastContainer , toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react"
import { FaPlus , FaMinus , FaShieldAlt , FaShippingFast , FaTrophy } from "react-icons/fa"
import Footer from "../components/Footer"
import SimpleSwiper from './SimpleSwiper'

const ProductDetails = () => {

    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()

    const {data : product , isLoading  , isError} = useGetProductDetailsQuery(params.id)

        const {data : moreProduct , isLoading2 , isError2} = useGetSearchProductQuery(product ? product.category : null , { skip : !product} )
        
    const [i , setI] = useState(1)

    const addToCart = async () => {
        let val = false;
        let items;
        if(localStorage.getItem('Cart') === null){
            items=[];
        }else{
            items=  JSON.parse(localStorage.getItem('Cart'))
            await items.filter((x) => x._id === params.id && (val = true))
        }
        if(!val){

            items.push(
                {_id : params.id , 
                    qty : i , 
                    name: product.name , 
                    title : product.title , 
                    image: product.image , 
                    description: product.description,
                    price : product.price,
                    mrp : product.mrp,
                    inStock : product.inStock,
                    brand : product.brand,
                }
            )
            localStorage.setItem('Cart' , JSON.stringify(items))
            toast("Added to Cart")
        }else{
            toast('Already in Cart')
        }
    }

    const addToProduct = (id) => {

        

        const item = [ {_id : product._id , 
            qty : i , 
            name: product.name , 
            title : product.title , 
            image: product.image , 
            description: product.description,
            price : product.price,
            mrp : product.mrp,
            inStock : product.inStock,
            brand : product.brand,
        } ]

        localStorage.setItem('Product' , JSON.stringify(item))

        navigate(`/place-order/${product._id}`)
    }
    
    const addToWishlist =async () => {

        let val = false;
        let items;
        if(localStorage.getItem('Wishlist') === null){
            items = [];
        }else{
            items = JSON.parse(localStorage.getItem('Wishlist'))
            await items.filter((x) => x._id === params.id && (val = true))
        }
        if(!val){
            items.push(
                {_id : params.id,
                    name: product.name , 
                    title : product.title , 
                    image: product.image , 
                    description: product.description,
                    price : product.price,
                    mrp : product.mrp,
                    inStock : product.inStock,
                    brand : product.brand,
                }
            )
            localStorage.setItem('Wishlist' , JSON.stringify(items))
            toast('Added to Wishlist')
        }else{
            toast('Already in Wishlist')
        }

    }

    if(isLoading){
        return<Buffer/>
    }else{
      
        return(
            <>
        <Header/>
        <Navbar/>
        <ToastContainer style={{fontSize:'20px' , fontWeight:'300'}} />
        <div className="product">
            <div className="product-img">
                <div className="img-div">
                    <img src={product.image} alt="" />
                </div>
            </div>
            <div className="product-info">
                <div className="info-div">
                    <h2>{product.brand} {product.title} {product.description}</h2>
                    <h3 style={{color:'orange'}} >-{(((Number(product.mrp) - Number(product.price))*100)/Number(product.mrp)).toFixed(0)}% ${product.price}</h3>
                    <h3 style={{textDecorationLine:"line-through" }} >M.R.P. ${product.mrp}</h3>

                    <h3>{product.specification}</h3>
                    <h3><FaShippingFast style={{fontSize:'23px'}} /> Free delivery </h3>
                    
                    <h3>In Stock : {product.inStock}</h3>
                    <h3>Trendigo assured <FaShieldAlt style={{fontSize:'23px'}} /></h3>
                    <h3>7 Days return policy available</h3>
                    <h3>1 Year onsite warranty <FaTrophy style={{fontSize:'23px'}} /> </h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, ea? Cumque, architecto animi culpa, placeat minima suscipit error rem quos aliquid ipsum autem obcaecati est nesciunt? Voluptates quod corrupti eos!</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, tempora, voluptatum voluptates rerum odio explicabo sint aliquam, minus impedit veniam cumque odit a? Similique nisi expedita perspiciatis beatae perferendis dignissimos ea repellat maxime possimus cumque enim asperiores incidunt rem veritatis aut, eligendi tempore minima qui! Architecto autem doloribus quia explicabo ea incidunt aspernatur sed ducimus excepturi similique eos, blanditiis sint numquam quas atque sunt tenetur id at. Facilis esse libero cum deserunt, fugit vel a deleniti dicta sunt amet. Praesentium iste mollitia ipsam at modi hic illo fuga repellendus necessitatibus! Doloribus quisquam delectus veritatis quasi unde voluptatum amet quaerat maiores?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, tempora, voluptatum voluptates rerum odio explicabo sint aliquam, minus impedit veniam cumque odit a? Similique nisi expedita perspiciatis beatae perferendis dignissimos ea repellat maxime possimus cumque enim asperiores incidunt rem veritatis aut, eligendi tempore minima qui! Architecto autem doloribus quia explicabo ea incidunt aspernatur sed ducimus excepturi similique eos, blanditiis sint numquam quas atque sunt tenetur id at. Facilis esse libero cum deserunt, fugit vel a deleniti dicta sunt amet. Praesentium iste mollitia ipsam at modi hic illo fuga repellendus necessitatibus! Doloribus quisquam delectus veritatis quasi unde voluptatum amet quaerat maiores?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, tempora, voluptatum voluptates rerum odio explicabo sint aliquam, minus impedit veniam cumque odit a? Similique nisi expedita perspiciatis beatae perferendis dignissimos ea repellat maxime possimus cumque enim asperiores incidunt rem veritatis aut, eligendi tempore minima qui! Architecto autem doloribus quia explicabo ea incidunt aspernatur sed ducimus excepturi similique eos, blanditiis sint numquam quas atque sunt tenetur id at. Facilis esse libero cum deserunt, fugit vel a deleniti dicta sunt amet. Praesentium iste mollitia ipsam at modi hic illo fuga repellendus necessitatibus! Doloribus quisquam delectus veritatis quasi unde voluptatum amet quaerat maiores?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, tempora, voluptatum voluptates rerum odio explicabo sint aliquam, minus impedit veniam cumque odit a? Similique nisi expedita perspiciatis beatae perferendis dignissimos ea repellat maxime possimus cumque enim asperiores incidunt rem veritatis aut, eligendi tempore minima qui! Architecto autem doloribus quia explicabo ea incidunt aspernatur sed ducimus excepturi similique eos, blanditiis sint numquam quas atque sunt tenetur id at. Facilis esse libero cum deserunt, fugit vel a deleniti dicta sunt amet. Praesentium iste mollitia ipsam at modi hic illo fuga repellendus necessitatibus! Doloribus quisquam delectus veritatis quasi unde voluptatum amet quaerat maiores?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, tempora, voluptatum voluptates rerum odio explicabo sint aliquam, minus impedit veniam cumque odit a? Similique nisi expedita perspiciatis beatae perferendis dignissimos ea repellat maxime possimus cumque enim asperiores incidunt rem veritatis aut, eligendi tempore minima qui! Architecto autem doloribus quia explicabo ea incidunt aspernatur sed ducimus excepturi similique eos, blanditiis sint numquam quas atque sunt tenetur id at. Facilis esse libero cum deserunt, fugit vel a deleniti dicta sunt amet. Praesentium iste mollitia ipsam at modi hic illo fuga repellendus necessitatibus! Doloribus quisquam delectus veritatis quasi unde voluptatum amet quaerat maiores?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, tempora, voluptatum voluptates rerum odio explicabo sint aliquam, minus impedit veniam cumque odit a? Similique nisi expedita perspiciatis beatae perferendis dignissimos ea repellat maxime possimus cumque enim asperiores incidunt rem veritatis aut, eligendi tempore minima qui! Architecto autem doloribus quia explicabo ea incidunt aspernatur sed ducimus excepturi similique eos, blanditiis sint numquam quas atque sunt tenetur id at. Facilis esse libero cum deserunt, fugit vel a deleniti dicta sunt amet. Praesentium iste mollitia ipsam at modi hic illo fuga repellendus necessitatibus! Doloribus quisquam delectus veritatis quasi unde voluptatum amet quaerat maiores?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, tempora, voluptatum voluptates rerum odio explicabo sint aliquam, minus impedit veniam cumque odit a? Similique nisi expedita perspiciatis beatae perferendis dignissimos ea repellat maxime possimus cumque enim asperiores incidunt rem veritatis aut, eligendi tempore minima qui! Architecto autem doloribus quia explicabo ea incidunt aspernatur sed ducimus excepturi similique eos, blanditiis sint numquam quas atque sunt tenetur id at. Facilis esse libero cum deserunt, fugit vel a deleniti dicta sunt amet. Praesentium iste mollitia ipsam at modi hic illo fuga repellendus necessitatibus! Doloribus quisquam delectus veritatis quasi unde voluptatum amet quaerat maiores?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi labore at consectetur voluptatum iusto ullam quia atque rerum explicabo quis!</p>
                </div>
            </div>
            <div className="product-btn">
                <div className="btn-div">

                <button id="buy-btn" onClick={() => addToProduct(product._id)} >Buy Now</button> <br />
                <button id="cart-btn" onClick={addToCart}>Add to Cart</button> <br />
                <button id="wish-btn" onClick={addToWishlist}>Add to Wishlist</button> <br />
                </div>

                <div className="product-qty">
                    <h1>Quantity</h1>
                    <div className="qty-ele">

                    <input type="text" id="qty" value={i} onChange={() => {}} />
                    <button onClick={() => setI(i + 1)} ><FaPlus/></button>
                    <button onClick={() => setI(i - 1)} ><FaMinus/></button>
                    </div>
                </div>


            </div>
        </div>


                
                
                
        <div className="more">
            {
                moreProduct ? <>
                
                <SimpleSwiper moreProduct={moreProduct} />
                </> : <></>
            }

        </div>
            
        <Footer/>
        </>
    )
}
}
export default ProductDetails