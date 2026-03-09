import jwt from "jsonwebtoken";

export const generateToken = (id, role) => {
  return jwt.sign(
    { id: id, role: role || "user" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};