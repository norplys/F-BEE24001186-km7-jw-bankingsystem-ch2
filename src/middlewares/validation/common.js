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
