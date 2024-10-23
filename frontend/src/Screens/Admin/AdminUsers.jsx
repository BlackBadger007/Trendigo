import { useGetAllOrdersQuery, useGetAllUsersQuery } from "../../slices/apiSlice"
import Header from "../../components/Header";
import Buffer from "../../components/Buffer";

const AdminUsers = () => {

    const{data : users , isLoading , isError} = useGetAllUsersQuery()

    if(isLoading){
        return <Buffer/>
    }else{
        console.log(users);
        
        return(
            <>
            <Header/>
            <h1 style={{fontSize:'40px' , fontWeight:'300' , color:'white' , margin:'0px 0px' , width:'70%' , margin:'auto', marginBottom:'5px' , marginTop:'30px'}} > ({users.length}) Users</h1>
        
        <div className="ad-user-box">
            {
                users.map((x) => (
                    <div className="ad-user-card">
                        <h3>Name : {x.name}</h3>
                        <h3>User_ID : {x._id}</h3>
                        <h3>Email : {x.email}</h3>
                        <h3>Password : {x.password}</h3>
                        <h3>Admin : {String(x.isAdmin)}</h3>
                        <h3>Created At : {x.createdAt}</h3>
                    </div>
                ))
            }
        </div>
        </>
    )
    }
}
export default AdminUsers