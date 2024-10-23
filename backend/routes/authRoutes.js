import express from "express"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const router = express.Router()

router.route('/signin').post(asyncHandler (async (req , res) => {
    const {email , password} = req.body
    const user = await User.findOne({email})

    if(user && await bcrypt.compare(password , user.password) ){

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn : "30d"})

            res.cookie('jwt' , token , {
                httpOnly:true,
                secure:false,
                sameSite:'strict',
                maxAge: 30*24*60*60*1000
            })

        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        })
        console.log("User created".green.inverse);
    }else{
        res.json( { message : "user not found"})
    }
}))

router.route('/signout').get( asyncHandler ( async (req , res) => {

            res.cookie('jwt', '' , {
                httpOnly:true,
                expires: new Date(0)
            })
        res.json({message : "success"})
        console.log("User signed out".green.inverse);
}))

router.route('/signup').post( asyncHandler  (async (req , res) => {

    const {name , email , password} = req.body

    const person = await User.findOne({email})

    if(!person){

        
        const hashedPassword = await bcrypt.hash(password , 10)
        
        const info = {
            name,
            email,
            password : hashedPassword
        }
        
        const user = await User.create(info)
        if(user){
            
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn : "30d"})
            
            res.cookie('jwt' , token , {
                httpOnly:true,
                secure:false,
                sameSite:'strict',
                maxAge: 30*24*60*60*1000
            })
            
            res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin
            })
            console.log("User created".green.inverse);
        }else{
            res.json({message :"wrong"})
        }
    }else{
        res.json({message : "already"})
    }
}))

export default router
