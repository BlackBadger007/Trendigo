import mongoose from "mongoose"
import colors from "colors"

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected : ${conn.connection.host}`.green.inverse);
    }catch(error){
        console.log(error.message);
        process.exit(1)
    }
}
export default connectDB

// let db = [
//     {
//         id:1,
//         text:"my name is adi1"
//     },
//     {
//         id:2,
//         text:"my name is adi2"
//     },
//     {
//         id:3,
//         text:"my name is adi3"
//     },
//     {
//         id:4,
//         text:"my name is adi4"
//     },
//     {
//         id:5,
//         text:"my name is adi5"
//     }
// ]
// export default db