import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorised , Login Again",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = await Company.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.json({
      success: false,
      message: `Error in Authmiddleware: ${error.message} `,
    });
  }
};
