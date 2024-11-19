import { UserService } from "../services/user.js";
import { TokenService } from "../services/token.js";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../utils/email/mail.js";
import { io } from "../utils/socket.js";

export async function login(req, res) {
  const { email, password } = req.body;
  const service = new UserService();
  try {
    const user = await service.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isValid = await service.comparePassword(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
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

export async function resetPasswordRequest(_req, res) {
  const { id: userId, email } = res.locals.user;

  const service = new TokenService();

  const token = await service.createToken(userId);

  await sendResetPasswordEmail(email, token.token);

  res.status(201).json({ message: "Token created successfully", data: token });
}

export async function resetPassword(req, res){
  const { token, password } = req.body;

  const tokenService = new TokenService();

  const tokenExist = await tokenService.getNotExpiredToken(token);

  if(!tokenExist){

    return res.status(400).json({ message: "Invalid token" });

  }

  await tokenService.updateResetPasswordToken(tokenExist.id, password);

  const message = `a user password has been reset with email: ${tokenExist.user.email}`

  io.emit('notification', message);

  res.status(200).json({message: "Password updated successfully"});
}
