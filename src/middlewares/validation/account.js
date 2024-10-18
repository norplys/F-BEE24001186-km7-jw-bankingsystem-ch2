import Joi from "joi";

const createAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  bankName: Joi.string().required(),
});

export async function createAccountValidation(req, res, next) {
  try {
    await createAccountSchema.validateAsync(req.body);

    next();
  } catch (error) {
    if (Joi.isError(error)) {
      return res.status(400).json({ error: error.details[0].message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
