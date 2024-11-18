import * as tokenRepository from '../repositories/token.js';
import crypto from 'crypto';

export class TokenService {
    async createToken(userId) {
        const tokenExist = await tokenRepository.getUserTokenThatNotExpired(userId);

        if(tokenExist){
           return tokenExist;
        }

        const token = crypto.randomUUID();

        const createToken = await tokenRepository.createToken(userId, token);

        return createToken;
    }
}