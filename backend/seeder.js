import mongoose from "mongoose"
import product from "./data/product.js"
import Product from "./models/productModel.js"
import article from "./data/article.js"
import Article from "./models/articleModel.js"
import user from "./data/user.js"
import User from "./models/userModel.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
connectDB()

import colors from "colors"
import order from "./data/order.js"
import Order from "./models/orderModel.js"

const importData = async () => {
    console.log(product);
    try {
        await Product.deleteMany()
        await Product.insertMany(product)
        await Product.createIndexes()
        console.log("Data imported !".green.inverse)
        process.exit()
    }catch(error){
        console.log(error.message.red.inverse);
        process.exit(1)
    }
}


// const importData = async () => {
//     try {
//         await User.deleteMany()
//         await User.insertMany(user)
//         // await Product.createIndexes()
//         console.log("Data imported !".green.inverse)
//         process.exit()
//     }catch(error){
//         console.log(error.message.red.inverse);
//         process.exit(1)
//     }
// }


// const importData = async () => {
    //     try {
        //         await Article.deleteMany()
        //         await Article.insertMany(article)
        //         await Article.createIndexes()
//         // await Article.createSearchIndex({title: "text"})
//         // await Article.createIndexes({ title: 'text', content: 'text' })
//         console.log("Data imported !".green.inverse)
//         process.exit()
//     }catch(error){
//         console.log(error.message.red.inverse);
//         process.exit(1)
//     }
// }


// const importData = async () => {
//     console.log(order);
//     try {
//         await Order.deleteMany()
//         await Order.insertMany(order)
//         // await Product.createIndexes()
//         console.log("Data imported !".green.inverse)
//         process.exit()
//     }catch(error){
//         console.log(error.message.red.inverse);
//         process.exit(1)
//     }
// }

importData()