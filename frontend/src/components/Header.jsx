import {FaUser , FaHeart , FaShoppingCart } from "react-icons/fa"
import Search from "./Search"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import API_URL from "../constant"

const Header = () => {

    const navigate = useNavigate()

    const location = useLocation()

    const [show , setShow] = useState(false)
    const [loc , setLoc] = useState(true)
    const [adminLoc , setAdminLoc] = useState(false)
    const [admin , setAdmin]  =useState(false)
    const [user , setUser] = useState('')

    useEffect(() => {

        if(location.pathname.startsWith('/cart') || 
        location.pathname.startsWith('/wishlist') ||
        location.pathname.startsWith('/orders') ||
        location.pathname.startsWith('/place-order') ||
        location.pathname.startsWith('/order') ||
        location.pathname.startsWith('/admin') ||
        location.pathname.startsWith('/profile') ){
            setLoc(false)
        }
        if(location.pathname.startsWith('/admin')){
            setAdminLoc(true)
        }

    },[location])

    useEffect(() => {
       let user = JSON.parse(localStorage.getItem('UserTrendigo'))
       setUser(user)
       if(user.isAdmin){
        setAdmin(true)
       }
    } ,[])

    const signout = async () => {
        const response = await axios.get(`${API_URL}/auth/signout` , {withCredentials : true})
        if(response.data.message === 'success'){
            localStorage.setItem('UserTrendigo' , JSON.stringify(null) )
            localStorage.setItem('Cart' , JSON.stringify(null) )
            localStorage.setItem('Wishlist' , JSON.stringify(null) )
            localStorage.setItem('Product' , JSON.stringify(null) )
        }
        navigate('/signin')
    }

    return(
        <>
        <div className="head-box">

        <div className="header">
            <h2 onClick={() => navigate('/')} title="Trendigo">Trendigo</h2>

        {loc || !adminLoc ? <>

            <Search/>
        </> : <></>}

            <ul className="ul-header" >

            {admin ? <>

                <Link to='/admin' className="adm" >Admin</Link>
                
            </> : <></>}

            {!adminLoc ? <>


                <li onClick={() => navigate('/wishlist')} title="Wish List"><FaHeart/></li>
                <li onClick={() => navigate('/cart')} title="Cart"><FaShoppingCart/></li>
                <li onClick={() => setShow(!show)} title="User"><FaUser/></li>

            </>  :<></> }

            </ul>
            
        </div>
            <div className={show ? "show-user" : "hide-user"}>
                <h1>{user.email}</h1>
                <h1 onClick={() => navigate(`/orders/${(JSON.parse(localStorage.getItem('UserTrendigo')))._id}`)}>Orders</h1>
                <h1 onClick={signout}>SignOut</h1>
            </div>
        </div>
        </>
    )
}
export default Header