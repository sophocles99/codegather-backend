import {Router} from "express";
import { loginUser, getUsers, getUserById, postUser, deleteUserById } from "../controllers/users.controller.mjs";

const userRouter:Router = Router();

userRouter.post("/login", loginUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.post("/", postUser)
userRouter.delete("/:id", deleteUserById)

export {userRouter}