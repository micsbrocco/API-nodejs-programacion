const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        cantidad: {
            type: Number,
            required: true,
            default: 0
        },
        precio: {
            type: Number,
            required: true,
        },
        proveedor: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;