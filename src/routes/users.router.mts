import {Router} from "express";
import { loginUser, createUser, getUsers, getUserById, deleteUserById } from "../controllers/users.controller.mjs";
import { catchValidationErrors, validateCreateUser } from "../middleware/users.validator.mjs";

const userRouter:Router = Router();

userRouter.post("/createuser", validateCreateUser, catchValidationErrors, createUser)
userRouter.post("/login", loginUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUserById)

export {userRouter}