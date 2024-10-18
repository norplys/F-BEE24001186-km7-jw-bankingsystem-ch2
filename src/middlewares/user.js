import { UserService } from "../services/user.js";

export async function blockIfEmailExists(req, res, next) {
  const { email } = req.body;
  const service = new UserService();

  try {
    const user = await service.getUserByEmail(email);

    if (user) {
      return res.status(403).json({ message: "Email already exists" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}