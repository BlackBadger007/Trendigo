import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import API_URL from "../constant"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PlaceOrder = () => {
    
    const navigate = useNavigate()
    const params = useParams()

    const [loading , setLoading] = useState(true)
    const [otploading , setOtpLoading] = useState(false)
    const [cart , setCart] = useState([])
    const[total , setTotal] = useState(0)
    const [otp , setOtp] = useState('start')
    const [getOtp , setGetOtp] = useState('')
    const [askOtp , setAskOtp] = useState('')
    const [edit , setEdit] = useState(true)
    const [address , setAddress] = useState({
        state:'',
        city:'',
        pincode:'',
        particulars:'',
        latitude:'',
        longitude:'',
    })

    useEffect(() => {

        let item ;
        if(params.place === 'cart'){   
            item = JSON.parse(localStorage.getItem('Cart'))
        }else{
            item = JSON.parse(localStorage.getItem('Product'))
        }
        console.log(item);
        setCart(item)
        let sum = 0;
        item.map((x) => (sum += Number(x.price)*Number(x.qty)))
        setTotal(sum)
        setLoading(false)
    },[])


    const onChange  = (e) => {
        setAddress((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    const autoDetect = () => {

        const handleSuccess = (position) => {
            const {latitude , longitude} = position.coords
            setAddress((prevState) => ({
                ...prevState,
                latitude,
                longitude
            }))
        }

        const handleError = (err) => {
            toast("Something went Wrong !")
        }

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess , handleError)
        }else{
            toast("Access denied !")
        }

    }

    const save = () => {
        if(address.state.trim().length === 0 ||
        address.city.trim().length === 0 ||
        address.pincode.trim().length === 0 ||
        address.particulars.trim().length === 0 ||
        !address.latitude ||
        !address.longitude
    ){
        toast('Missing address field !')
        }else{
            console.log(address);
            setEdit(!edit)
        }
    }

    const sendOtp = async () => {
        setOtp('check')
        setOtpLoading(true)
        const {data} = await axios.get(`${API_URL}/order/otp` , { 
            withCredentials : true
        })
        setGetOtp(data.otp)
        setOtpLoading(false)
    }

    const check = () => {
        if(getOtp === askOtp.trim()){
            setOtp('place')
        }else{
            toast('Otp mismatch !')
        }
        
    }

    const placeOrder = async () => {

        const items = [];

        cart.map((x) => (items.push({
            _id : x._id,
            image : x.image,
            title : x.title,
            brand : x.brand,
            qty : x.qty,
            price : x.price,
            totalPrice : Number(x.qty)*Number(x.price)
        })))

        let user = JSON.parse(localStorage.getItem('UserTrendigo'))

        const order = {
            address,
            product : items,
            grandTotal : total,
            user : {
                _id : user._id,
                name : user.name,
                email : user.email
            }
        }

        const response  = await axios.post(`${API_URL}/order/place-order`, order , {withCredentials : true})

        navigate(`/orders/${(JSON.parse(localStorage.getItem('UserTrendigo'))._id)}`)
    }


    // Fix for missing default icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });


    if(!loading){

        return(
            <>
        <Header/>
        <ToastContainer style={{fontSize:'20px' , fontWeight:'300'}} />
        <div className="ord-smr">
            <h1>Order Summary</h1>
            {
                cart.map((x) => (
                    <div className="ord-smr-card" key={x._id} >
                        <img src={x.image} alt="" />
                        <h3>{x.brand} {x.title} {x.name} {x.description}</h3>
                        <h3>{x.qty}qty x ${x.price} : {Number(x.qty) * Number(x.price)}</h3>
                    </div>
                ))
            }
           
            <div className="ord-smr-total">
                <h3>Grand Total : ${total}</h3>
            </div>
        </div>

        <div className="add-all-box">

            <div className="add-fld">

            {
                edit ? <>
                
            <h1>Address</h1>
            <input type="text" placeholder="State" id="state" onChange={onChange}/>
            <input type="text" placeholder="City" id="city" onChange={onChange}/>
            <input type="text" placeholder="Pincode" id="pincode" onChange={onChange}/>
            <input type="text" placeholder=" House no. / Landmark / Street" id="particulars" onChange={onChange}/>
            
            <div className="navigation">
                <h3>Allow us to find you </h3>
                <button onClick={autoDetect} >Auto Detect</button>
            </div>

            {address.latitude ? <>
            
            <input type="text" placeholder={`Latitude : ${address.latitude}`} disabled={true} /> 
            <input type="text" placeholder={`Longitude : ${address.longitude}`} disabled={true}/>

            </> : <></>}
  
            <button onClick={save} >Save</button>

            </> : <>
            
            <h1>Address</h1>
            <h2>{address.particulars}/{address.city}/{address.pincode}/{address.state}</h2>

            <div className="map-container" >
                <div className="map" >
            <MapContainer center={[address.latitude ,  address.longitude]} zoom={13} scrollWheelZoom={false} style={{width:'90%' , height:'350px', margin:'auto', position:'sticky' , borderRadius:'0.5rem' , marginBottom:'20px'}}  >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[address.latitude ,  address.longitude]}> 
                </Marker>
            </MapContainer>
                </div>
            </div>

            <button onClick={() => setEdit(!edit)} >Edit</button>  
            
            </>
            }

        </div>

        <div className="sub-all-box">

            <div className="payment-div">
                <h1>Payment Method</h1>
                <input type="radio" checked={false} value="Card" /> <span>Card</span> <br />
                <input type="radio" checked={false} value="UPI" /> <span>UPI</span> <br />
                <input type="radio" checked={true} value="Cash on Delivery"/> <span>Cash on Delivery</span> <br />
            </div>

            <div className="place">
            
                {
                    otp === 'start' ? <>
                        <div className="send-otp">
                            <h4>An Otp will be sent to your registered mail to verify that its really you.</h4>
                            <button onClick={sendOtp} >Send OTP</button>
                        </div>
                
                    </> : otp === 'check'  ? <> { otploading ? <>
                        <h4>sending...</h4> 
                    </> : <>
                        <div className="enter-otp">
                            <h4>Enter Otp</h4>
                            <input type="text" onChange={(e) => setAskOtp(e.target.value)} placeholder="Otp"/>
                            <button onClick={check} >Submit</button>
                        </div>
                    </> }
                    </> : otp === 'place' ? <>
                        <div className="place-order">
                            <button onClick={placeOrder} >Place Order</button>
                        </div>
                    </> : <></>
                }
   
            </div>
        </div>
    </div>
    </>
    )}
}
export default PlaceOrder
