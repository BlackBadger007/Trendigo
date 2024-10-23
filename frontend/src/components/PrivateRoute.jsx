import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Buffer from "./Buffer";

const PrivateRoute = () => {

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        if(localStorage.getItem('UserTrendigo') === 'null'){
            setLoading(false)
        }else{
            let item = JSON.parse(localStorage.getItem('UserTrendigo'))
            setUser(item)
            setLoading(false)
        }
    },[])

    if(loading){
        <Buffer/>
    }else{
        return user ? <Outlet/> : <Navigate to='/signin'/> 
    }
}
export default PrivateRoute