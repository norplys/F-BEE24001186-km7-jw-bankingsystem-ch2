import * as userRepository from '../repositories/user.js';

export class UsersService {
    async createUser(data) {
        const user = await userRepository.createUser(data);
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