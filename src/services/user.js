import * as userRepository from '../repositories/user.js';

export class UserService {
    async createUser(payload) {
        const user = await userRepository.createUser(payload);
        return user;
    }

    async getAllUser() {
        const users = await userRepository.getAllUser();
        return users;
    }

    async getUserById(id) {
        const user = await userRepository.getUserById(id);
        return user;
    }

    async getUserByEmail(email) {
        const user = await userRepository.getUserByEmail(email);
        return user;
    }
}