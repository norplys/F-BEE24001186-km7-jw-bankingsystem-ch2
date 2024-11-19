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
    const errorMessages = generateJoiErrors(error);
    return res.status(400).json({ message: errorMessages });
  }
}

const resetPasswordSchema = Joi.object({
  token: Joi.string().uuid().required(),
  password: Joi.string().required(),
});

export async function resetPasswordValidation(req, res, next) {
  try {
    await resetPasswordSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    const errorMessages = generateJoiErrors(error);
    return res.status(400).json({ message: errorMessages });
  }
};
