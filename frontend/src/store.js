import {configureStore } from '@reduxjs/toolkit'
// import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { apiSlice } from './slices/apiSlice'

// const baseQuery = fetchBaseQuery({baseUrl : "http://localhost:5000"})

// export const apiSlice = createApi({
//     baseQuery,
//     tagTypes : ['Product' , 'Order' , 'User'],
//     endpoints : (builder) => ({})
// })


const store = configureStore({
    reducer : { 
    // [
    //     createApi({
    //         baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000"}),
    //         tagTypes : ['Product' , 'Order' , 'User'],
    //         endpoints : (builder) => ({})
    //     }).reducerPath
    // ] : createApi({
    //     baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000"}),
    //     tagTypes : ['Product' , 'Order' , 'User'],
    //     endpoints : (builder) => ({})
    // }).reducer

    [apiSlice.reducerPath] : apiSlice.reducer},
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

    devTools : true,

})
export default store