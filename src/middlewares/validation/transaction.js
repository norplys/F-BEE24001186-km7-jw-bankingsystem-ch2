import Joi from "joi";
import { generateJoiErrors } from "../../utils/helper.js";

const createTransactionSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  sourceAccountNumber: Joi.string().required(),
  destinationAccountNumber: Joi.string().required(),
  amount: Joi.number().required(),
});

export async function createTransactionValidation(req, res, next) {
  try {
    await createTransactionSchema.validateAsync(req.body, { abortEarly: false });

    const { sourceAccountNumber, destinationAccountNumber } = req.body;

    if (sourceAccountNumber === destinationAccountNumber) {
      return res
        .status(400)
        .json({ message: "Source and destination account cannot be the same" });
    }

    next();
  } catch (error) {
    if (Joi.isError(error)) {
      const errorMessages = generateJoiErrors(error);
      return res.status(400).json({ message: errorMessages });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}
