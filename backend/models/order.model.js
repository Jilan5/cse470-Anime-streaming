import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    userid: { type: String, required: true },
    cartItems: { type: Schema.Types.Mixed },
    total: { type: Number, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    payment: { type: String, default: 'Pending' },
    tid: { type: String },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;