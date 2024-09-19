const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type:String,
        default:"Guest",
        minLength: 3,
        trim:true,
    },
    email:{
        type:String,
        default:""
    },
    password: String,
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    isadmin:  Boolean,
    orders: {
        type :Array,
        default: []
    },
    contact: Number,
    picture: String,
})

module.exports = mongoose.model("user", userSchema)