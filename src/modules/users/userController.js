import User from "./userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
      username: newUser.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
