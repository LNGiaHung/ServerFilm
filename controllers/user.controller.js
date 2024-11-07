import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"; // Import jwt for token verification
import { ENV_VARS } from "../config/envVars.js"; // Import environment variables

export async function updateUser(req, res) {
	try {
		// Get the access token from the cookie
    const token = req.cookies[COOKIE_ACCESS_TOKEN]; // Ensure this matches the cookie name

		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
		}

		// Verify and decode the token
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		if (!decoded || !decoded.userId) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}

		const userId = decoded.userId; // Get user ID from the decoded token

		const { firstName, lastName, image } = req.body;

		// Validate input fields
		if (!firstName && !lastName && !image) {
			return res.status(400).json({ success: false, message: "At least one field must be provided for update" });
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ firstName, lastName, image },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Create a response object without the password
		const { password, ...userWithoutPassword } = updatedUser._doc;

		res.status(200).json({
			success: true,
			user: userWithoutPassword, // Send user data without password
		});
	} catch (error) {
		console.error("Error in updateUser controller:", error); // Log the error
		res.status(500).json({ success: false, message: "Internal server error", error: error.message });
	}
} 