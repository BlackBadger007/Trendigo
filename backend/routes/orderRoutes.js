import express from "express"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import nodemailer from "nodemailer"
const router = express.Router()

router.route('/place/order').post(asyncHandler(async (req , res) => {
    const {address , product , user , grandTotal} = req.body
    try{
        const order = await Order.create({address , product , user , grandTotal})
        res.json(order)
    }catch(err){
        
        res.json({message : err.message})
    }
}))

router.route('/:order_id').get(asyncHandler (async (req , res) => {
    const order_id = req.params.order_id
    const order = await Order.findById(order_id)
    res.json(order)
}))

router.route('/user/:user_id').get(asyncHandler (async (req, res) => {
    const user_id = req.params.user_id;
    const orders = await Order.find({'user._id' : user_id})
    res.json(orders)
}))

router.route('/generate/otp').post(asyncHandler (async (req , res) => {
    let otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trendigo1221605@gmail.com', // Your email
            pass: 'vgwx oego qiro phpj' // Your email password (or app password)
        }
    })

        // Set up email data
    const mailOptions = {
        from: 'Trendigo', // Sender address
        to:`${req.body.email}`, // List of receivers
        subject: 'OTP form Trendigo', // Subject line
        text: `OTP : ${otp}`, // Plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error.message)
        }
        res.json({info : info, otp : otp})
    })
}))

export default router