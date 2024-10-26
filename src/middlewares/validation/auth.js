import Joi from "joi";
import { generateJoiErrors } from "../../utils/helper.js";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export async function loginValidation(req, res, next) {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        if (Joi.isError(error)) {
            const errorMessages = generateJoiErrors(error);
            return res.status(400).json({ message: errorMessages });
        }

        res.status(500).json({ error: "Internal server error" });
    }
}