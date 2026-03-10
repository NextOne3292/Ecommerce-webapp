import { User } from "../models/userModel.js";
import { generateToken } from "../utils/token.js";

export const userSignup = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or mobile already exists"
      });
    }

    const newUser = new User({
      username,
      email,
      password,
      mobile
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "User account created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        mobile: newUser.mobile
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};


export const userLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
         role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};