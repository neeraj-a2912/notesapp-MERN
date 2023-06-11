import express from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  getAllUsers,
  getUserByName,
  updateUser,
  fetchCurrentUser,
} from "../controllers/userControllers.js";
import fetchuser from "../middleware/fetchuser.js";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("name", "Name Must be more than 4 characters").isLength({ min: 4 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be more than 7 characters").isLength({
      min: 8,
    }),
  ],
  registerUser
);
userRouter.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "password Cannot be Empty").notEmpty(),
  ],
  loginUser
);
userRouter.get("/", getAllUsers);
userRouter.get("/:name", getUserByName);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/current/getuser", fetchuser, fetchCurrentUser);

export default userRouter;
