//
// Order Schema
import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    // You can add more fields like price, discounts, etc., depending on your requirements
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true },
    // Add other fields like shipping address, payment status, etc.
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
