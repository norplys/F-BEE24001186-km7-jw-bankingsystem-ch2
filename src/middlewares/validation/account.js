import Joi from "joi";
import { generateJoiErrors } from "../../utils/helper.js";

const createAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  bankName: Joi.string().required(),
});

export async function createAccountValidation(req, res, next) {
  try {
    await createAccountSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    const errorMessages = generateJoiErrors(error);
    return res.status(400).json({ message: errorMessages });
  }
}

const amountSchema = Joi.object({
  amount: Joi.number().required().positive(),
  accountNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function amountSchemaValidation(req, res, next) {
  try {
    await amountSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    const errorMessages = generateJoiErrors(error);
    return res.status(400).json({ message: errorMessages });
  }
}
