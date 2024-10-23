import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Buffer from "../components/Buffer"
import { FaEye } from "react-icons/fa"
import { ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Signup = () => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [show , setShow] = useState(false)

    const [user , setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const onChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    const submit = async () => {
        setLoading(true)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(!regex.test(user.email)){
            setLoading(false)
            toast('Invalid Email')
            return
        }

        if(user.email.trim().length === 0 || user.password.trim().length === 0 || user.name.trim().length === 0 || user.confirmPassword.trim().length === 0){
            setLoading(false)
            toast("Missing Data")
            return
        }
        if(user.password.trim() !== user.confirmPassword.trim()){
            setLoading(false)
            toast("Password Mismatch")
            return
        }
        const response = await axios.post("http://localhost:5000/auth/signup" , user , {withCredentials : true} )
        console.log(response.data)

        if(response.data.message === "already"){
            alert("User Already Exists")
        }else if(response.data.message === "wrong"){
            alert("Something went wrong!")
        }else{

            
            localStorage.setItem('UserTrendigo' , JSON.stringify(response.data))
            navigate('/')
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
            <h1>SignUp</h1>
            <input type="text" placeholder="Name" onChange={onChange} id="name" /><br />
            <input type="text" placeholder="Email" onChange={onChange} id="email" /> <br />
            <div className="pass-fld">
            <input type={show ? "text" : "password"} placeholder="Password" id="password" onChange={onChange} /> <br />
            <button onClick={()=>setShow(!show)} className="passs" ><FaEye/></button>

            </div>
            <div className="pass-fld">
            <input type={show ? "text" : "password"} placeholder="Confirm Password" id="confirmPassword" onChange={onChange} /> <br />
            <button onClick={()=>setShow(!show)} className="passs" ><FaEye/></button>

            </div>
            {/* <input type="text" placeholder="Password" onChange={onChange} id="password" /><br /> */}
            {/* <input type="text" placeholder="Confirm Password" onChange={onChange} id="confirm-password" /><br /> */}
            <button onClick={submit} >SignUp</button>
        </div>
            <p>Already have an account? <Link to="/signin" style={{fontSize:'22px' , fontWeight:'360' , color:'black'}} >SignIn</Link></p>
        </div>
        </>
    )
}
}
export default Signup