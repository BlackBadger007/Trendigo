import { FaFacebook , FaInstagram , FaTwitter , FaCopyright } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Footer = () => {
    return(
        <footer>
            <h1 >Trendigo</h1>
            <h3><a href="">Legal Stuff</a> | <a href="">Privacy Policy</a></h3>
            <h2>Copyright <FaCopyright style={{fontSize:'15px' }} /> 2024 Trendigo</h2>
            <h2>Contact : trendigo1221605@gmail.com</h2>
            <div className="logoz">
                <h2><FaFacebook style={{fontSize:'25px' }}/></h2>
                <h2><FaInstagram style={{fontSize:'25px' }}/></h2>
                <h2><FaTwitter style={{fontSize:'25px' }}/></h2>
            </div>
             

        </footer>
    )
}
export default Footer