// checkoutController.js
import Order from '../models/order.model.js';


// SSL COmmerz Integration
import SSLCommerzPayment from 'sslcommerz-lts';
const store_id = 'ripbo655c34b0d16ed';
const store_passwd = 'ripbo655c34b0d16ed@ssl';
const is_live = false; //true for live, false for sandbox


const processOrder = async (req, res) => {
    const { name, phoneNumber, address, cartItems, userid, total } = req.body;
    const tid = `TID${Math.floor(100000 + Math.random() * 900000)}`;
    
    const data = {
        total_amount: total,
        currency: 'BDT',
        tran_id: tid, // use unique tran_id for each api call
        success_url: `http://localhost:3000/payment/success/${tid}`,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: name,
        cus_email: 'customer@example.com',
        cus_add1: address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: phoneNumber,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };


    // Save the order in the database

    const order =  new Order({
        userid: userid,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        cartItems: cartItems,
        total: parseFloat(total),
        tid: tid,
    });

    try {
        const newOrder = await order.save();
        console.log('Order placed successfully: ', newOrder);
        
    } catch (error) {
        console.log('Error placing order: ', error.message);
        res.status(400).json({ message: error.message });
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url : GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    });

    

    
}

const paymentSuccess = async (req, res) => {
    const { tid } = req.params;

    // Update the order in the database
    const order = await Order.findOneAndUpdate({ tid: tid }, { payment: 'Completed' }, { new: true });
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    console.log('Order updated successfully: ', order);

    console.log('Payment successful for transaction ID: ', tid);
    // return res.redirect(`http://localhost:3000/payment/success/${tid}`);
     res.writeHead(302, {'Location': `http://localhost:3000/payment/success/${tid}`});
    // res.end();
}

export default { processOrder, paymentSuccess };