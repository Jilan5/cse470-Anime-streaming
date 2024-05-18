import User from "../models/user.model.js";
import Order from "../models/order.model.js";

const getUser = async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }else{
            res.status(200).json(user);
        }
};


const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, password },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateUser: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getOrdersByUserid = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userid: userId });
        console.log(orders);
        res.json(orders);
    } catch (error) {
        console.error("Error in getOrdersByUserid: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { getUser, updateUser, getOrdersByUserid};