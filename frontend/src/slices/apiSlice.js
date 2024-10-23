import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl : "http://localhost:5000" , credentials : 'include'})

export const apiSlice = createApi({
    baseQuery,
    tagTypes : ['Product' , 'Order' , 'User'],
    endpoints : (builder) => ({
        auth : builder.query({
            query : () => ({
                url: '/auth'
            }),
            keepUnusedDataFor : 5
        }),
        getProducts : builder.query({
            query : () => ({
                url : "/home"
            }),
            keepUnusedDataFor : 5
        }),
        getProductDetails : builder.query({
            query : (id) => ({
                url : `/product/${id}`
            }),
            keepUnusedDataFor : 5
        }),
        getSearchProduct : builder.query({
            query : (product) => ({
                url : `/search/${product}`
            }),
            keepUnusedDataFor : 5
        }),
        getOtp : builder.query({
            query : () => ({
                url: "/otp"
            }),
            keepUnusedDataFor : 5
        }),
        placeOrder : builder.mutation({
            query : (order) => ({
                url : '/place-order',
                method : 'POST',
                body : {...order}
            }),
            keepUnusedDataFor : 5
        }),
        getOrders : builder.query({
            query : (_id) => ({
                url : `/order/user/${_id}`
            }),
            keepUnusedDataFor : 5
        }),
        getOrderDetails : builder.query({
            query : (_id) => ({
                url : `/order/${_id}`
            }),
            keepUnusedDataFor : 5
        }),
        getAllOrders : builder.query({
            query : () => ({
                url : '/admin/orders',
            }),
            keepUnusedDataFor : 5
        }),
        getAnOrder : builder.query({
            query : (_id) => ({
                url : `/admin/order/${_id}`
            }),
            keepUnusedDataFor : 5
        }),
        getAllUsers : builder.query ({
            query : () => ({
                url : '/admin/users'
            }),
            keepUnusedDataFor : 5
        }),
        getAllProducts : builder.query ({
            query : () => ({
                url : '/admin/products'
            }),
            keepUnusedDataFor : 5
        })
    })
})

export const { useAuthQuery, 
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useGetSearchProductQuery , 
    useGetOtpQuery , 
    usePlaceOrderMutation , 
    useGetOrdersQuery , 
    useGetOrderDetailsQuery , 
    useGetAllOrdersQuery , 
    useGetAnOrderQuery,
    useGetAllUsersQuery,
    useGetAllProductsQuery

} = apiSlice
