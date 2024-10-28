import { UserService } from "../services/user.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;
  const service = new UserService();
  try {
    const user = await service.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValid = await service.comparePassword(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "64h",
    });

    const userWithToken = {
      ...user,
      token,
    };

    res.status(200).json({ message: "Login success", data: userWithToken });
  } catch (error) {  
    res.status(500).json({ message: "Internal server error" });
  }
}
