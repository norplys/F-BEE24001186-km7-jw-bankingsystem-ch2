import Joi from "joi";
import { generateJoiErrors } from "../../utils/helper.js";

const schema = Joi.object({
  id: Joi.number().required(),
});

export async function validateParamsId(req, res, next) {
  try {
    const parsedId = Number(req.params.id);

    await schema.validateAsync({ id: parsedId }, { abortEarly: false });

    res.locals.id = parsedId;

    next();
  } catch (error) {
    const errorMessages = generateJoiErrors(error);
    return res.status(400).json({ message: errorMessages });
  }
}

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export async function isValidEmailPayload(req, res, next) {
  try {
    const { email } = req.body;

    await emailSchema.validateAsync({ email });

    next();
  } catch (err) {
    const errorMessages = generateJoiErrors(err);
    return res.status(400).json({ message: errorMessages });
  }
}
