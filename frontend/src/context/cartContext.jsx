import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    }, []);
    
    return (
        <CartContext.Provider value={[cart, setCart]}>
        {children}
        </CartContext.Provider>
    );
    }

const useCart = () => {
    return useContext(CartContext);
}

export {useCart, CartProvider };