const mongoose = require('mongoose')

const productShema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please enter product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default:0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('product', productShema);

module.exports = Product;