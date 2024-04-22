import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllUsers = async (req, res) => {
	try {
	  const users = await User.find().select("-password");
	  res.status(200).json(users);
	} catch (error) {
	  console.error("Error in getAllUsers: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
  };
