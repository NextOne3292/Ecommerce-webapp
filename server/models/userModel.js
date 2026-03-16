import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{10}$/, "Enter valid mobile number"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
  type: Boolean,
  default: true,
},

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);


// hash password before save
userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});


// compare password
userSchema.methods.comparePassword = async function (password) {

  return await bcrypt.compare(password, this.password);

};


export const User = mongoose.model("User", userSchema);