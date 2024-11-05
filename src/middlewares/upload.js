import { uploadToMemory } from "../utils/multer.js";
import { imageKit } from "../utils/imageKit.js";
import crypto from "crypto";

export function parseImage(
    req,
    res,
    next
) {
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

export function uploadToImageKit(
    req,
    res,
    next
) {
    const file = req.file;
    
    if (!file) {
        res.status(400).send({
            message: "No image uploaded",
        });
        return;
    }
    
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    imageKit.upload(
        {
            file: file.buffer.toString("base64"),
            fileName
        },
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message: "Error uploading image",
                });
            } else {
                res.locals.imageUrl = result.url;
                next();
            }
        }
    );

    
}