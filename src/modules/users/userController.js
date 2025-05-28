import User from "./userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/token.js";
import { registerValidation } from "../../validation/userValidation.js";

export const registerUser = async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
