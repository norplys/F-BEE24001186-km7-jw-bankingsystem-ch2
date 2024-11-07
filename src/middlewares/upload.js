import { uploadToMemory } from "../utils/multer.js";
import { imageKit } from "../utils/imageKit.js";
import crypto from "crypto";

export function parseImage(req, res, next) {
  uploadToMemory(req, res, (err) => {
    if (err) {
      res.status(400).send({
        message: "Error uploading image",
      });
    } else {
      next();
    }
  });
}

export async function uploadToImageKit(req, res, next) {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).send({
        message: "No image uploaded",
      });
      return;
    }

    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    const result = await imageKit.upload({
      file: file.buffer,
      fileName,
    });
    
    res.locals.imageUrl = result.url;
    next();
  } catch (error) {
    res.status(500).send({
      message: "Error uploading image",
    });
  }
}
