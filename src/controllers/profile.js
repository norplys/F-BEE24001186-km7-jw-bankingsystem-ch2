import { ProfileService } from "../services/profile.js";

export async function updateProfile(req, res) {
    const userId = res.locals.user.id
    const data = req.body;
    
    const service = new ProfileService();
    const profile = await service.updateProfileByUserId(userId, data);
    
    res.status(200).json({
        message: "Profile updated successfully",
        data: profile,
    });
}