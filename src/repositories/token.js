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

export function getUserTokenThatNotExpiredByUserId(userId){
    return prisma.tokens.findFirst({
        where: {
            userId,
            expiredAt: {
              gt: new Date()
              
            }
        }
    })
}

export function getUserTokenThatNotExpiredByToken(token){
  return prisma.tokens.findFirst({
      where: {
          token,
          expiredAt: {
            gt: new Date()
          }
      }
  })
}

export function updateToken(tokenId, password){
  return prisma.tokens.update({
    where: {
      id: tokenId
    },
    data:{
      expiredAt: null,
      user: {
        update: {
          password
        }
      }
    }
  })
}

