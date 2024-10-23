import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Homescreen from "./Screens/Homescreen";
import Signup from "./Screens/Signup";
import Signin from "./Screens/Signin";
import ProductDetails from './Screens/ProductDetails';
import SearchProduct from './Screens/SearchProduct';
import Buffer from './components/Buffer';
import Cart from './Screens/Cart';
import Wishlist from './Screens/Wishlist';
import Orders from './Screens/Orders';
import PlaceOrder from './Screens/PlaceOrder';
import OrderDetails from './Screens/OrderDetails';
import Admin from './Screens/Admin/Admin';
import AdminOrders from './Screens/Admin/AdminOrders';
import AdminOrder from './Screens/Admin/AdminOrder';
import AdminUsers from './Screens/Admin/AdminUsers';
import AdminProduct from './Screens/Admin/AdminProduct';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute/>} >
        
         <Route path="/" element={<Homescreen/> }/>
        </Route>
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/search/:product" element={<SearchProduct/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/buffer" element={<Buffer/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/orders/:_id" element={<Orders/>} />
        <Route path="/order/:_id" element={<OrderDetails/>} />
        <Route path="/place-order/:place" element={<PlaceOrder/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/orders" element={<AdminOrders/>} />
        <Route path="/admin/order/:order_id" element={<AdminOrder/>} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/products" element={<AdminProduct/>} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
