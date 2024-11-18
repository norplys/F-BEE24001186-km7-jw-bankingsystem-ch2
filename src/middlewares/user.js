import { UserService } from "../services/user.js";

export async function blockIfEmailExists(req, res, next) {
  const { email } = req.body;
  const service = new UserService();

  try {
    const user = await service.getUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function checkEmailExist(req, res, next) {
  const { email } = req.body;
  const service = new UserService();

  const user = await service.getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: "Email does not exist" });
  }

  res.locals.user = user;

  next();
}
