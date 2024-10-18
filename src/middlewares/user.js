import { UsersService } from "../services/user.js";

export async function checkUserExistsByEmail(req, res, next) {
    try{
    const { email } = req.body;
    const service = new UsersService();

    const user = await service.getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    res.locals.user = user;
    next();
} catch (error) {
    res.status(500).json({ error: "Internal server error" });
}
}