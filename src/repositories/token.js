import { prisma } from "../utils/db.js";

export function createToken(userId, token) {
  return prisma.tokens.create({
    data: {
      userId,
      token,
      expiredAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });
}

export function getUserTokenThatNotExpired(userId){
    return prisma.tokens.findFirst({
        where: {
            userId,
            expiredAt: {
              gt: new Date()
            }
        }
    })
}
