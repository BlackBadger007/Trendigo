import Product from "../models/productModel.js"
import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import asyncHandler from "express-async-handler"
const router = express.Router()

router.route('/home').get( protect ,asyncHandler(async (req , res) => {
    try{
        const products = await Product.find({})
        console.log(products);
        res.json(products) 
    }catch(error){
        res.json({message : error.message})
    }
}))

router.route('/search/:product').get(protect ,asyncHandler ( async (req , res) => {
    const q = req.params.product
    try{
        const product = await Product.find({$text : {$search : q}})
        res.json(product)
    }catch(error){
        res.json({message : error.message})
    }
}))

router.route('/product/:id').get(protect ,asyncHandler (async (req , res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.json(product)
    }catch(error){
        res.json({message : error.message})
    }
}))

export default router
