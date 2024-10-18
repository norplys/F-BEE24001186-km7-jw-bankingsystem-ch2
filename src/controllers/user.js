import { UserService } from "../services/user.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  const service = new UserService();

  try {
    const user = await service.createUser({ name, email, password });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getAllUser(_req, res) {
  const service = new UserService();

  try {
    const users = await service.getAllUser();

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getUserById(_req, res) {
  const id = res.locals.id;
  const service = new UserService();

  try {
    const user = await service.getUserById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
