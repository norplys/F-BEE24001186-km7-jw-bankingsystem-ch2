import Joi from "joi";
import { generateJoiErrors } from "../../utils/helper.js";

const updateProfileSchema = Joi.object({
  identityType: Joi.string().optional(),
  identityNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function updateProfileValidation(req, res, next) {
  try {
    await updateProfileSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    if (Joi.isError(error)) {
      const errorMessages = generateJoiErrors(error);
      return res.status(400).json({ message: errorMessages });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
