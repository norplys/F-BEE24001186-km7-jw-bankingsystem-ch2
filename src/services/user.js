import * as userRepository from '../repositories/user.js';
import bcrypt from 'bcrypt';

export class UserService {
    async createUser(payload) {
        payload.password = await this.hashPassword(payload.password);
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

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async comparePassword(password, hashedPassword) {
        const isValid = await bcrypt.compare(password, hashedPassword);
        return isValid;
    }
}