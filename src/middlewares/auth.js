import { UserService } from "../services/user.js";

export async function isAuthorized(req, res, next){
  const { email, password } = req.body;
  const service = new UserService();

  try {
    const user = await service.getUserByEmail(email);

    if (!user) {
      res.status(404).json({ message: "Email or password mismatch" });
      return;
    }

    if (user.password !== password) {
      res.status(400).json({ message: "Email or password mismatch" });
      return;
    }

    res.locals.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

}