import jwt from "jsonwebtoken";
// Create JWT Token with expiry
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};
export default generateToken;
