import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

const Navbar =  () => {

    const navigate = useNavigate()
    const params = useParams()

    const [show , setShow] = useState(false)

    useEffect(() => {setShow(false)},[params])

    return(
        <>
        
        <div className="navbar">
            <ul>
                <li onClick={() => setShow(!show)} >All</li>
                <li onClick={() => navigate('/search/fresh')}>Fresh</li>
                <li onClick={() => navigate('/search/bestseller')}>BestSeller</li>
                <li onClick={() => navigate('/search/sell')}>Sell</li>
                <li onClick={() => navigate('/search/todays-deals')}>Today's Deals</li>
                <li onClick={() => navigate('/search/mobiles')}>Mobiles</li>
            </ul>
            
        <div className={show ? "show-all" : "hide-all"}>
                <div className="category">
                    <div className="category-c1">


            <h2>Category</h2>
                <h1 onClick={() => navigate('/search/electronics')} >Electronics</h1>
                <h1 onClick={() => navigate('/search/clothing')}>Clothing</h1>
                <h1 onClick={() => navigate('/search/gadgets')}>Gadgets</h1>
                <h1 onClick={() => navigate('/search/shoes')}>Shoes</h1>
                <h1 onClick={() => navigate('/search/homedecors')}>Home Decors</h1>
                <h1 onClick={() => navigate('/search/tech')}>Tech</h1>
                <h1 onClick={() => navigate('/search/tvs')}>Tv</h1>
                <h1 onClick={() => navigate('/search/mobile')}>Mobile</h1>
                <h1 onClick={() => navigate('/search/watches')}>Watches</h1>
                <h1 onClick={() => navigate('/search/toys')}>Toys</h1>
                <h1 onClick={() => navigate('/search/kitchentools')}>Kitchen Tools</h1>
                <h1 onClick={() => navigate('/search/appliances')}>Appliances</h1>
                    </div>
                </div>
                <div className="brand">
                    <div className="brand-b1">
                        <h2>Brands</h2>
                        <h1 onClick={() => navigate('/search/apple')}>Apple</h1>
                        <h1 onClick={() => navigate('/search/samsung')}>Samsung</h1>
                        <h1 onClick={() => navigate('/search/vivo')}>Vivo</h1>
                        <h1 onClick={() => navigate('/search/philips')}>Philips</h1>
                        <h1 onClick={() => navigate('/search/redmi')}>Redmi</h1>
                        <h1 onClick={() => navigate('/search/realme')}>Realme</h1>
                        <h1 onClick={() => navigate('/search/LG')}>LG</h1>
                        <h1 onClick={() => navigate('/search/sony')}>Sony</h1>
                        <h1 onClick={() => navigate('/search/apple')}>Boat</h1>
                        <h1 onClick={() => navigate('/search/noise')}>Noise</h1>
                    </div>
                </div>
                <div className="brand-c1">
                <div className="brand-b1">
                    <h2>Brands</h2>
                        <h1 onClick={() => navigate('/search/levis')}>Levis</h1>
                        <h1 onClick={() => navigate('/search/puma')}>Puma</h1>
                        <h1 onClick={() => navigate('/search/balenciaga')}>Balenciaga</h1>
                        <h1 onClick={() => navigate('/search/dolchegabana')}>Dolchegabana</h1>
                        <h1 onClick={() => navigate('/search/lacoste')}>Lacoste</h1>
                        <h1 onClick={() => navigate('/search/zara')}>Zara</h1>
                        <h1 onClick={() => navigate('/search/armani')}>Armani</h1>
                        <h1 onClick={() => navigate('/search/denim')}>Denim</h1>
                        <h1 onClick={() => navigate('/search/vogue')}>Vogue</h1>
                        <h1 onClick={() => navigate('/search/madame')}>Madame</h1>
                        <h1 onClick={() => navigate('/search/nike')}>Nike</h1>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Navbar