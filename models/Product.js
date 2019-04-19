const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },             
    description:{
        type: String,
        required: false
    },
    price:{
        type: Number,
        required: true
    },
    discounted_price:{
        type: Number,
        required: true
    },
    image1: {
        type: String,
        required: false
    },
    image2: {
        type: String,
        required: false
    },

    display:{
        type: Boolean,
        required: true
    },
});

module.exports = Product = mongoose.model('product', ProductSchema);