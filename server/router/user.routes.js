import express from "express";
import * as Service from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(Service.getAllUser).post(Service.createUser);

userRouter.route("/:id").get(Service.getUserInfoByID);

export default userRouter;
