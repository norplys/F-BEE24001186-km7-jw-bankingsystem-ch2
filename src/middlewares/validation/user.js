import Joi from "joi";
import { generateJoiErrors } from "../../utils/helper.js";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  identityType: Joi.string().required(),
  identityNumber: Joi.string().required(),
  address: Joi.string().required(),
});

export async function createUserValidation(req, res, next) {
  try {
    await createUserSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    if (Joi.isError(error)) {
      const errorMessages = generateJoiErrors(error);
      return res.status(400).json({ message: errorMessages });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}
