import { prisma } from "../utils/db.js";

export function updateProfileByUserId(userId, data) {
  return prisma.profiles.update({
    where: {
      userId,
    },
    data: {
      identityType: data.identityType,
      identityNumber: data.identityNumber,
      address: data.address
    },
  });
}
