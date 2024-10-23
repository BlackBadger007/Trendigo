import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    description : {
        type:String,
        required:true,
    },
    brand : {
        type:String,
        required:true,
    },
    image : {
        type:'String',
        required:true
    },
    category : {
        type:String,
        required:true,
    },
    type:{
        type:'String',
        required:true
    },
    price:{
        type:'String',
        required:true
    },
    mrp:{
        type:'String',
        required:true
    },
    inStock:{
        type:'String',
        required:true
    },
    specification:{
        type:'String',
    },
    title:{
        type:'String',
        required:true
    },
    keywords: {
        type:[String], //an array of strings
        required:true
    },
    
} , {timestamps : true})

// productSchema.index({name:'text' , brand:'text' , category:'text' , type:'text' , keywords:'text'})
productSchema.index({keywords:'text'})

const Product = mongoose.model("Product" , productSchema)
export default Product