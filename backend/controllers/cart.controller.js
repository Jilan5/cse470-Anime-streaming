

import Cart from '../models/cart.model.js';

export const getCart = async (req, res) => {
    try {
        // Fetch the cart for the authenticated user
        const userId = req.user.id; // Assuming user is authenticated and user ID is available in request
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Assuming user is authenticated and user ID is available in request

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Create a new cart if it doesn't exist for the user
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product.equals(productId));

        if (existingItemIndex !== -1) {
            // If the product exists in the cart, update its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the product is not in the cart, add it as a new item
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id; // Assuming user is authenticated and user ID is available in request

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the cart item by product ID
        const cartItem = cart.items.find(item => item.product.equals(productId));
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the quantity of the cart item
        // If the quantity is 0, remove the item from the cart
        cartItem.quantity = quantity;
        
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id; // Assuming user is authenticated and user ID is available in request

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the cart item with the provided product ID
        cart.items = cart.items.filter(item => !item.product.equals(productId));
        
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user is authenticated and user ID is available in request

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

    
        cart.items = [];
        
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
