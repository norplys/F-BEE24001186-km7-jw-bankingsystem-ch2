import Joi from "joi";
import { generateJoiErrors } from "../../utils/helper.js";

const updateProfileSchema = Joi.object({
  identityType: Joi.string().optional(),
  identityNumber: Joi.string().optional(),
  address: Joi.string().optional()
});

export async function updateProfileValidation(req, res, next) {
  try {
    await updateProfileSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    const errorMessages = generateJoiErrors(error);
    return res.status(400).json({ message: errorMessages });
  }
}
