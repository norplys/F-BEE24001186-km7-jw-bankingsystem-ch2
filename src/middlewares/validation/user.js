import Joi from "joi";

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export async function createUserValidation(req, res, next) {
    try {
        await createUserSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ error: error.details[0].message });
        }
        res.status(400).json({ error: error.message });
    }
}