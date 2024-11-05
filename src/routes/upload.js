import { Router } from "express";
import * as uploadController from "../controllers/upload.js";
import * as uploadMiddleware from "../middlewares/upload.js";

export default (app) => {
  const router = Router();
  app.use("/upload", router);

  router.post(
    "/",
    uploadMiddleware.parseImage,
    uploadMiddleware.uploadToImageKit,
    uploadController.uploadImage
  );
};
