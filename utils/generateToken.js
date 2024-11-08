import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateAccessToken = (userId) => {
	return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId) => {
	return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
};

export const setAccessTokenCookie = (accessToken, res) => {
	res.cookie(ENV_VARS.COOKIE_ACCESS_TOKEN, accessToken, {
		maxAge: 15 * 60 * 1000, // 15 minutes in MS
		httpOnly: true, // prevent XSS attacks
			sameSite: "strict", // prevent CSRF attacks
			secure: ENV_VARS.NODE_ENV !== "development",
	});
};
