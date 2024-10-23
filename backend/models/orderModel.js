import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    image : { type: String, required: true },
    title : { type: String, required: true },
    brand : { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const addressSchema = new mongoose.Schema({
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    particulars: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    _id : { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
});


const orderSchema = new mongoose.Schema({
    user: { type: userSchema, required: true },
    address: { type: addressSchema, required: true },
    product: { type: [productSchema], required: true },
    grandTotal: { type: Number, required: true },
    status : {type : String , default: 'order placed' }
} , {timestamps : true});

userSchema.index({_id:'text' })

const Order = mongoose.model("Order" , orderSchema)
export default Order