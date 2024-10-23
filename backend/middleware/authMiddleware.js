import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

const protect =  asyncHandler (async (req , res ,next) => {
    let token = req.cookies.jwt
    if(token){
        try{
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error ('Not Autorized')
        }
    }else{
        res.status(401)
        throw new Error ('Not Authorized')
    }
})

const admin = (req , res , next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error ('Not Authorized')
    }
}

export {protect , admin}