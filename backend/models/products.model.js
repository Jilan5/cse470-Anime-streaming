// Product Schema
import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: ''},
    // Add other fields as needed
},
{ timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
