import { UserService } from "../services/user.js";
import jwt from "jsonwebtoken";

// export async function isAuthorized(req, res, next){
//   const { email, password } = req.body;
//   const service = new UserService();

//   try {
//     const user = await service.getUserByEmail(email);

//     if (!user) {
//       res.status(404).json({ message: "Email or password mismatch" });
//       return;
//     }

//     if (user.password !== password) {
//       res.status(400).json({ message: "Email or password mismatch" });
//       return;
//     }

//     res.locals.user = user;

//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }

// }


export async function isAuthorized(req, res, next){

  const service = new UserService();

  const authorization = req.get("authorization");

  if (!authorization) {
    res.status(401).json({ message: "Missing authorization header"});
    return;
  }

  const [type, token] = authorization.split(" ");

  if (type.toLocaleLowerCase() !== "bearer") {
    res.status(401).json({ message: "Invalid authorization type"});
    return;
  }

  try {
    const { id } = jwt.verify(token, "secret");

    const user = await service.getUserById(id);

    if (!user) {
      res.status(404).json({ message: "User not found"});
      return;
    }

    res.locals.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }

}