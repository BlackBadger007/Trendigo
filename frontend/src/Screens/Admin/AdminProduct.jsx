import Header from "../../components/Header"
import { useGetAllProductsQuery } from "../../slices/apiSlice"
import { Link, useNavigate } from "react-router-dom"
import { FaPlus  ,FaTrash , FaExclamationTriangle } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"
import { ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from 'sweetalert2';
import Buffer from "../../components/Buffer"

const AdminProduct = () => {
    
    const{data : products , isLoading ,isError} = useGetAllProductsQuery()

    const navigate = useNavigate()

    const [product , setProduct] = useState({
        title : '',
        brand : '',
        description : '',
        category : '',
        type : '',
        specification : '',
        mrp : '',
        price : '',
        inStock : '',
        image : {},
        keywords : [],
    })

    const {keywords , image} = product

    let word ;
    const addKeys = () => {
        setProduct((prevState) => ({
            ...prevState,
            keywords : [...keywords , word]
        }))
    }

    const onChange = (e) => {

        if(e.target.id === 'keywords'){
            word = e.target.value
        }else if(e.target.id ==='image'){
            console.log(e.target.files[0]);
            setProduct((prevState) => ({
                ...prevState,
                [e.target.id] : e.target.files[0]
            }))
        }
        else{
            setProduct((prevState) => ({
                ...prevState,
                [e.target.id] : e.target.value
            }))
        }
    }

    const create = async () => {

        const formData = new FormData();
        formData.append('image', image); // Append the image file to FormData

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                // withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct content type
                },
            });
            console.log(response);
            let img_url = response.data.image

            const productCopy = {
                description: product.description,
                image : img_url,
                category : product.category,
                type : product.type,
                brand:product.brand,
                price:product.price,
                mrp:product.mrp,
                title:product.title,
                keywords : product.keywords,
                inStock : product.inStock,
                specifications : product.specification
            }

            const response2 = await axios.post("http://localhost:5000/admin/create-product" , productCopy , {withCredentials : true})
            console.log(response2.data);
            navigate(`/product/${response2.data._id}`)


        } catch (error) {
            console.error('Error uploading image:', error);
        }

    }
    
    const remove = async (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then( async (result) =>  {
            if (result.isConfirmed) {

                // it is working properly
                const response = await axios.post("http://localhost:5000/admin/remove-product" , {_id} , {withCredentials : true})
                if(response.data.message === "removed"){
                    toast('Product Removed')
                    toast('Kindly reload the page') 
                }else{
                    toast('Something went wrong!') 
                }
            }
        });

    }

    if(isLoading){
        return <Buffer/>
    }else if(!isLoading && !product){
        return <>
                <h2 style={{textAlign:'center' ,
            fontSize : '45px' ,
            fontWeight: '300',
            color:'white',
            marginTop:'150px'}} >Something went wrong <FaExclamationTriangle style={{fontSize:'35px'}} /></h2>
        </>
    }else{

        return(
        <>



        <Header/>
        <ToastContainer style={{fontSize:'20px' , fontWeight:'300'}} />

        <div className="listings">
            <div className="l1" style={{width:'50%'}} >
                
                <div className="crt-pdt">

                <h1>Create Product</h1>
                </div>

                <div className="create-product">

                <input type="text" placeholder="Title" id="title" onChange={onChange}/>
                <input type="text" placeholder="Brand" id="brand" onChange={onChange}/>
                <input type="text" placeholder="Description" id="description" onChange={onChange}/>
                <input type="text" placeholder="Category" id="category" onChange={onChange}/>
                <input type="text" placeholder="Type" id="type" onChange={onChange}/>
                <input type="text" placeholder="Specifications" id="specification" onChange={onChange}/>
                <input type="text" placeholder="MRP" id="mrp" onChange={onChange}/>
                <input type="text" placeholder="Price" id="price" onChange={onChange}/>
                <input type="text" placeholder="InStock" id="inStock" onChange={onChange}/>

                <div className="add-img">
                    <h3>Image</h3>
                <input type="file" placeholder="Image" id="image" onChange={onChange}/>

                </div>
                 
                 <div className="keywords">
                    <h3>Keywords</h3>
                    <div className="key-area">

                    {keywords.length > 0 ? <>
                    {
                        keywords.map((x) => (
                            <h4>{x}</h4>
                        ))
                    }
                    </> : <>
                    {/* <h4>Zero keywords...</h4> */}
                    </> } 
                    </div>

                    <div className="key-box">

                 <input type="text" placeholder="Keywords" id="keywords" onChange={onChange} />
                 <button onClick={addKeys} ><FaPlus/></button>
                    </div>
                 </div>

                 <button onClick={create} >Create</button>
                </div>
            </div>

            <div className="l2" style={{width:'50%'}} >
                {
                    products.map((x) => (
        
                        <div className="l2-card" style={{marginTop:'5px' , marginBottom:'20px' , width:'90%'}} key={x._id} >

                        <div className="l2-card-img" style={{width:'45%'}} >
                        <img src={x.image} alt="" />

                        </div>
                        <div className="l2-card-info" style={{width:'50%'}}>

                        <h2 >{x.brand} {x.title} {x.description} <Link to={`/product/${x._id}`}  >visit</Link> </h2>
                        <h3 style={{color:'orange'}} >-{(((Number(x.mrp) - Number(x.price))*100)/Number(x.mrp)).toFixed(0)}% ${x.price} </h3>
                        <h3 style={{textDecorationLine:'line-through'}} >M.R.P. ${x.mrp}</h3>
                        <h3>In Stock : {x.inStock}</h3>
                    
                        </div>
                        <div className="rem-btn" style={{width:'5%'}}> 
                        <button className="remove" onClick={() => remove(x._id)} ><FaTrash/></button>

                        </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
    )
}
}
export default AdminProduct