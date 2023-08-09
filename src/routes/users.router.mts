import {Router} from "express";
import { loginUser, createUser, getUsers, getUserById, deleteUserById, patchUserById } from "../controllers/users.controller.mjs";
import { catchValidationErrors, validateCreateUser } from "../middleware/users.validator.mjs";

const userRouter:Router = Router();

userRouter.get("/", getUsers);
userRouter.post("/createuser", validateCreateUser, catchValidationErrors, createUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUserById);
userRouter.patch('/:id', patchUserById);
userRouter.delete("/:id", deleteUserById);

export {userRouter}