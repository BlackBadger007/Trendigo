import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate , useParams } from "react-router-dom"

const Search = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [text , setText] = useState(params.product)
    const [val , setVal] = useState('')

    useEffect(() => {setText(params.product)} ,[params])

    const onChange = (e) =>{
        setText(e.target.value)
        setVal(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setVal('')

        navigate(`/search/${text}`)
    }

    return(
        <div className="search">

            <form onSubmit={onSubmit}>
            <input type="text" id="input" placeholder={!text ? "Search for Products, Brands and More" : text } value={val} onChange={onChange}/>
            </form>
        </div>
    )
}
export default Search