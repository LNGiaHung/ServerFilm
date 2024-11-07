import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateAccessToken = (userId) => {
	return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15m" }); // Access token expires in 15 minutes
};

export const generateRefreshToken = (userId) => {
	return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "30d" }); // Refresh token expires in 30 days
};

export const setAccessTokenCookie = (token, res) => {
	res.cookie("jwt-netflix", token, {
		maxAge: 15 * 60 * 1000, // 15 minutes in MS
		httpOnly: true, // prevent XSS attacks
		sameSite: "strict", // CSRF protection
		secure: ENV_VARS.NODE_ENV !== "development", // Use secure cookies in production
	});
};
