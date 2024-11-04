import express from "express";
import * as Service from "../controller/property.controller.js";

const propertyRouter = express.Router();

propertyRouter
  .route("/")
  .get(Service.getAllProperties)
  .post(Service.createProperty);

propertyRouter
  .route("/:id")
  .get(Service.getAllPropertyDetail)
  .patch(Service.updateProperty)
  .delete(Service.deleteProperty);

export default propertyRouter;
