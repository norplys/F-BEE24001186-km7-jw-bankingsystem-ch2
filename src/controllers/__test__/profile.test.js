import { describe, jest } from "@jest/globals";

const mockUpdateProfileByUserId = jest.fn();

jest.unstable_mockModule("../../services/profile.js",
    () => ({
        ProfileService: jest.fn().mockImplementation(() => ({
            updateProfileByUserId: mockUpdateProfileByUserId,
        })),
    })
);

const { updateProfile } = await import("../../controllers/profile.js");

describe("testUpdateProfile", () => {
    const profileData = {
        userId: 1,
        name: "John Doe",
        email: "test@gmail.com",
    };

    it("should return the updated profile", async () => {
        const mockRequest = {
            body: profileData,
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {
                user: {
                    id: 1,
                },
            },
        };

        mockUpdateProfileByUserId.mockResolvedValue(profileData);

        await updateProfile(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Profile updated successfully",
            data: profileData,
        });
    });

    it("should return 500 if an error occurs", async () => {
        const mockRequest = {
            body: profileData,
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockUpdateProfileByUserId.mockRejectedValue(new Error("Internal server error"));

        await updateProfile(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Internal server error",
        });
    });

});