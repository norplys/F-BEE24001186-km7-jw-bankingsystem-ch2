import Joi from "joi";

const createTransactionSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  sourceAccountNumber: Joi.string().required(),
  destinationAccountNumber: Joi.string().required(),
  amount: Joi.number().required(),
});

export async function createTransactionValidation(req, res, next) {
  try {
    await createTransactionSchema.validateAsync(req.body);

    const { sourceAccountNumber, destinationAccountNumber } = req.body;

    if (sourceAccountNumber === destinationAccountNumber) {
      return res
        .status(400)
        .json({ error: "Source and destination account cannot be the same" });
    }

    next();
  } catch (error) {
    if (Joi.isError(error)) {
      return res.status(400).json({ error: error.details[0].message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
