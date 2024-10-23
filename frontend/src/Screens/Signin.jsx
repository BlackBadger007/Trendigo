import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Buffer from "../components/Buffer"
import { FaEye } from "react-icons/fa"
import { ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Signin = () => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const[show , setShow] = useState(false)
    const [data , setData] = useState({
        email:'',
        password :''
    })

    const onChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    
    const signin = async () => {
        setLoading(true)

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(!regex.test(data.email)){
            setLoading(false)
            toast('Invalid Email')
            return
        }

        if(data.email.trim().length === 0 || data.password.trim().length === 0){
            setLoading(false)
            toast("Missing Data")
            
        }else{



                const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin` , data ,{ withCredentials : true } )
                if(response.data.message !== 'user not found'){
                    localStorage.setItem('UserTrendigo' , JSON.stringify(response.data))
                    navigate('/')
                }else{
                    setLoading(false)
                    alert('Invalid Credentials')
                    // toast("User not found")
                }
            
           
            
            
        }
    }

    if(loading){
        <Buffer/>
    }else{

        return(
            <>
                        <ToastContainer style={{fontSize:'20px' , fontWeight:'300'}} />

        <div className="header">
            <h2 style={{marginBottom:'5px'}} >Trendigo</h2>
        </div>
        <div className="s-box">
        <div className="sign">
            <h1>SignIn</h1>
            <input type="text" placeholder="Email" id="email" onChange={onChange} /> <br />
            <div className="pass-fld">
            <input type={show ? "text" : "password"} placeholder="Password" id="password" onChange={onChange} /> <br />
            <button onClick={()=>setShow(!show)} className="passs" ><FaEye/></button>

            </div>
            <button onClick={signin} >SignIn</button>
        </div>
            <p>New to Trendigo? <Link to="/signup" style={{fontSize:'22px' , fontWeight:'360' , color:'black'}}>SignUp</Link></p>
        </div>
        </>
    )
}
}
export default Signin