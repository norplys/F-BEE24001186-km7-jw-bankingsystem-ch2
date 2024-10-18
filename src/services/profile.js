import * as profileRepository from '../repositories/profile.js';

export class ProfileService {
    async updateProfileByUserId(userId, data) {
        const profile = await profileRepository.updateProfileByUserId(userId, data);
        return profile;
    }
}