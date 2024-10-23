import path from 'path'
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

import { protect , admin } from './middleware/authMiddleware.js'
dotenv.config()
connectDB()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}))
app.use(cookieParser())

app.use('/' , productRoutes)
app.use('/order' , protect , orderRoutes)
app.use('/admin' , protect , admin , adminRoutes)
app.use('/auth' , authRoutes)

app.use('/upload' , uploadRoutes)
const __dirname = path.resolve()
app.use('/uploads' , express.static(path.join(__dirname, '/uploads')))

app.listen(PORT , () => console.log(`Server is running at port : ${PORT}`.green.inverse))