const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },             
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },

    // role: { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Role' 
    // },

    register_date: {
        type: Date,
        default: Date.now
    },
    

});

module.exports = User = mongoose.model('user', UserSchema);