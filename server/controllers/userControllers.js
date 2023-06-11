import userModel from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Getting All the Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Register a New User and Exporting it
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      // Checking if User Already Exists
      return res.json({ success, message: "Email Already Exists" });
    }
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    };
    user = await userModel.create(newUser); // Creating a New User
    return res
      .status(200)
      .json({ success: true, message: "User Created Successfully", user });
  } catch (error) {
    res.status(500).json({ success, error: error.message }); // Printing Out the Error
  }
};

// User Login Controller
export const loginUser = async (req, res) => {
  let success = false;
  try {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success, message: "User Not Found" }); // Checking if User Exists
    }
    if (!bcrypt.compareSync(password, user.password)) {
      // Verifying the Passwords
      return res.json({ success, message: "Incorrect Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    return res.json({
      success: true,
      message: "Login SuccessFull",
      user,
      token,
    });
  } catch (error) {
    // Catching the Errors
    res.json({ err: error.message });
  }
};

// Controller to Delete a User by UserId
export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findOneAndDelete({ _id: req.params.id }); // Finding and Deleting the User
    if (!user) {
      return res.json({ message: "User not found" }); // Returning an Error if the User Doesn't Exist
    }
    return res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.json({ error });
  }
};

// Get User By Name
export const getUserByName = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ name: req.params.name })
      .select("-password");
    if (!user) {
      return res.json({
        message: `No User Found With Username ${req.params.name}`,
      });
    }
    return res.json({ user });
  } catch (error) {
    return res.json({ error });
  }
};

// Updating User Profile
export const updateUser = async (req, res) => {
  try {
    let user = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!user) {
      return res.json({
        message: `No User Found With Username ${req.params.name}`,
      });
    }
    return res.json({ user });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

// GET Current User

export const fetchCurrentUser = async (req, res) => {
  try {
    const id = await req.id;
    const user = await userModel.findOne({ _id: id }).select("-password");
    return res.status(200).send({ user });
  } catch (error) {
    return res.send({ message: error.message });
  }
};
