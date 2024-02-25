// productRoutes.js
import express from 'express';
const router = express.Router();
import * as productController from '../controllers/product.controller.js';
import * as cartController from '../controllers/cart.controller.js';
import checkoutController from '../controllers/checkout.controller.js';

// Routes for CRUD operations on products
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);



// Routes for cart management
router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addToCart);
router.put('/cart/update/:productId', cartController.updateCartItem);
router.delete('/cart/remove/:productId', cartController.removeFromCart);
router.delete('/cart/clear', cartController.clearCart);



// Routes for checkout
router.post('/checkout', checkoutController.processOrder);


export default router;
