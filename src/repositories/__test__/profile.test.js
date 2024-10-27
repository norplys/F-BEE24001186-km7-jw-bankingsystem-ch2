import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../utils/db.js", () => {
    return {
        prisma: {
            profile: {
                update: jest.fn(),
            },
        },
    };
});

const { prisma } = await import("../../utils/db.js");

const { updateProfileByUserId } = await import("../profile.js");

describe("Profile Repository", () => {
    describe("updateProfileByUserId", () => {
        it("should call prisma.profile.update with correct data", async () => {
            const userId = 1;
            const data = {
                identityType: "KTP",
                identityNumber: "1234567890",
                address: "Jalan Raya",
            };
            await updateProfileByUserId(userId, data);
            expect(prisma.profile.update).toHaveBeenCalledWith({
                where: {
                    userId,
                },
                data: {
                    identityType: data.identityType,
                    identityNumber: data.identityNumber,
                    address: data.address,
                },
            });
        });
    });
});