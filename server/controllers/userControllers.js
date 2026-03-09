import { User } from "../models/userModel.js";
import { generateToken } from "../utils/token.js";

export const userSignup = async (req, res) => {
  try {
    // Get data from request body
    const { username, email, password, mobile } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
   const existingUser = await User.findOne({
  $or: [{ email }, { mobile }]
});

if (existingUser) {
  return res.status(400).json({
    message: "User with this email or mobile already exists"
  });
}

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      mobile,
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id, newUser.role);

    // Store token in cookie (for authentication)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // use false for localhost
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send response
    res.status(201).json({
      message: "User account created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        mobile: newUser.mobile,

      },
    });

  } catch (error) {
     console.log("Signup Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};