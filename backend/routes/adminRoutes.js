import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
const router = express.Router()

router.route('/orders').get(asyncHandler (async (req , res) => {
    try{
        const orders = await Order.find({})
        res.json(orders)
    }catch(err){
        res.json({message : err.message})
    }
}))

router.route('/users').get(asyncHandler (async (req , res) => {
    const users = await User.find({})
    res.json(users)
}))

router.route('/products').get(asyncHandler (async (req , res) => {
    const products = await Product.find({})
    res.json(products)
}))

router.route('/create-product').post(asyncHandler (async (req , res) => {
    const  productData   = req.body
    const product1 = await Product.create(productData)
    res.json(product1)
}))

router.route('/order/:order_id').get(asyncHandler (async (req , res) => {
    const order = await Order.findById(req.params.order_id)
    res.json(order)
}))

router.route('/remove-product').post(asyncHandler (async (req , res) => {
    const product = await Product.findByIdAndDelete(req.body._id)
    res.json({message : "removed"})
}))
router.route('/update-status/:order_id/:status').put(asyncHandler (async (req , res) => {
    const order = await Order.findByIdAndUpdate( req.params.order_id , { status : req.params.status } , {new : true})
    res.json(order)
}))


export default router

