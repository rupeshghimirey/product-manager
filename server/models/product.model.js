const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        minlength: [2, "Title must be at least 2 characters"]
    },
    price:{
        type: Number,
        required: [true, "price is required!"]
    },
    description: {
        type: String,
        required: [true, "decription is required!"]
    }
    
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;