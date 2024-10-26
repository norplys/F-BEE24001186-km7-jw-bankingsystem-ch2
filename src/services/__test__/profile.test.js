import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../repositories/profile.js",
    () => ({
        updateProfileByUserId: jest.fn((userId, data) => data),
    })
);

const profileRepository = await import("../../repositories/profile.js");
const { ProfileService } = await import("../../services/profile.js");

describe("testProfileService", () => {
    let service;
    const profileData = {
        userId: 1,
        name: "John Doe",
        email: "test@gmail.com",
    };

    beforeEach(() => {
        service = new ProfileService();
    }
    );

    describe("updateProfileByUserId", () => {
        it("should return the updated profile", async () => {

            profileRepository.updateProfileByUserId.mockResolvedValue(profileData);

            const profile = await service.updateProfileByUserId(1, profileData);

            expect(profile).toEqual(profileData);
        });
    }
    );
   
});    

   