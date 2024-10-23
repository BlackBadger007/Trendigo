import { Link } from "react-router-dom"
import Header from "../../components/Header"

const Admin = () => {
    return(
        <>
        <Header/>
        <div className="admin">
            <h1 className="ad-h1" >Admin</h1>
            <div className="ad">
                <Link to='/admin/orders' className="ad-link" >Orders</Link> <br />
                <Link to='/admin/users'className="ad-link" >Users</Link> <br />
                <Link to='/admin/products'className="ad-link" >Product</Link> <br />
            </div>
        </div>
        </>
    )
}
export default Admin