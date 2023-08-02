import {Router} from "express";
import { loginUser, createUser, getUsers, getUserById, deleteUserById } from "../controllers/users.controller.mjs";

const userRouter:Router = Router();

userRouter.post("/login", loginUser)
userRouter.post("/createuser", createUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUserById)

export {userRouter}