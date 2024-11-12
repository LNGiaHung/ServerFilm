import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateAccessToken = (userId) => {
	return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "10m" });
};

export const generateRefreshToken = (userId) => {
	return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
};

export const setRefreshTokenCookie = (refreshToken, res) => {
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: ENV_VARS.NODE_ENV === "production", // Set to true in production for HTTPS
		sameSite: ENV_VARS.NODE_ENV === "production" ? "None" : "Lax", // "None" for cross-origin in production
		maxAge: 15 * 24 * 60 * 60 * 1000, // Example: 15 days in milliseconds
	});
};
