import { User } from "../models/userModel.js";



export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const updateProfile = async (req, res) => {
  try {

    const { username, mobile, profilePic } = req.body;

    const updateData = {};

    if (username) updateData.username = username;
    if (mobile) updateData.mobile = mobile;
    if (profilePic) updateData.profilePic = profilePic;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");


    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deactivateAccount = async (req, res) => {
  try {

    await User.findByIdAndUpdate(
      req.user.id,
      { isActive: false }
    );

    res.json({
      success: true,
      message: "Account deactivated"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const reactivateAccount = async (req, res) => {
  try {

    await User.findByIdAndUpdate(
      req.user.id,
      { isActive: true }
    );

    res.json({
      success: true,
      message: "Account reactivated"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
