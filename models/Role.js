const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const RoleSchema = new Schema({
    roleName: {
        type: String,
        required: true
    },

    // users: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }]             

});

module.exports = Role = mongoose.model('role', RoleSchema);