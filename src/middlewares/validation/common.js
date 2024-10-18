import Joi from "joi";

const schema = Joi.object({
  id: Joi.number().required(),
});

export async function validateParamsId(req, res, next) {
  try {
    const parsedId = Number(req.params.id);
    await schema.validateAsync({ id: parsedId });
    res.locals.id = parsedId;
    next();
  } catch (error) {
    if (Joi.isError(error)) {
      return res.status(400).json({ error: error.details[0].message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
