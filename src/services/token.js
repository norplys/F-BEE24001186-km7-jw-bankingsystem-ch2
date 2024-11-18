import * as tokenRepository from "../repositories/token.js";
import crypto from "crypto";
import { UserService } from "./user.js";

export class TokenService {
  async createToken(userId) {
    const tokenExist = await tokenRepository.getUserTokenThatNotExpiredByUserId(
      userId
    );

    if (tokenExist) {
      return tokenExist;
    }

    const token = crypto.randomUUID();

    const createToken = await tokenRepository.createToken(userId, token);

    return createToken;
  }

  async getNotExpiredToken(token) {
    const tokenExist = await tokenRepository.getUserTokenThatNotExpiredByToken(
      token
    );

    if (!tokenExist) {
      return null;
    }

    return tokenExist;
  }

  async updateResetPasswordToken(id, password){
    const userService = new UserService();

    password = await userService.hashPassword(password);

    const token = await tokenRepository.updateToken(id, password);

    return token
  }
}
