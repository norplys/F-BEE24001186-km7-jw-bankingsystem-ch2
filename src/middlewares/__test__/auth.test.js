import { describe, jest } from "@jest/globals";

const mockCreateUser = jest.fn();
const mockGetAllUser = jest.fn();
const mockGetUserById = jest.fn();
const mockGetUserByEmail = jest.fn(); 

jest.unstable_mockModule("../../services/user.js", () => ({
    UserService: jest.fn().mockImplementation(() => ({
        createUser: mockCreateUser,
        getAllUser: mockGetAllUser,
        getUserById: mockGetUserById,
        getUserByEmail: mockGetUserByEmail,
    })),
}));

jest.unstable_mockModule("jsonwebtoken",
    () => ({
        default: {
            verify: jest.fn(),
        }
    })
);

const jwt = await import("jsonwebtoken");

const userMiddleware = await import("../auth.js");

describe("userMiddleware", () => {
    describe("isAuthorized", () => {
        it("should call next if user is authorized", async () => {
            const mockRequest = {
                get: jest.fn().mockReturnValue("Bearer token"),
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                locals: {},
            };

            const mockNext = jest.fn();

            const user = {
                id: 1,
            };

            mockGetUserById.mockResolvedValue(user);
            jwt.default.verify.mockReturnValue({ id: 1 });

            await userMiddleware.isAuthorized(mockRequest, mockResponse, mockNext);

            expect(mockResponse.locals.user).toEqual(user);
            expect(mockNext).toHaveBeenCalled();
        });

        it("should return 401 if authorization header is missing", async () => {
            const mockRequest = {
                get: jest.fn(),
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                locals: {},
            };

            const mockNext = jest.fn();

            await userMiddleware.isAuthorized(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: "Missing authorization header" });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });

    it("should return 401 if authorization type is invalid", async () => {
        const mockRequest = {
            get: jest.fn().mockReturnValue("Invalid token"),
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };

        const mockNext = jest.fn();

        await userMiddleware.isAuthorized(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid authorization type" });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
        const mockRequest = {
            get: jest.fn().mockReturnValue("Bearer token"),
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };

        const mockNext = jest.fn();

        mockGetUserById.mockResolvedValue(null);
        jwt.default.verify.mockReturnValue({ id: 1 });

        await userMiddleware.isAuthorized(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "User not found" });
        expect(mockNext).not.toHaveBeenCalled();
    });

    // it("should return 401 if token is invalid", async () => {
    //     const mockRequest = {
    //         get: jest.fn().mockReturnValue("Bearer token"),
    //     };

    //     const mockResponse = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //         locals: {},
    //     };

    //     const mockNext = jest.fn();

    //     mockGetUserById.mockResolvedValue(null);
    //     jwt.default.verify.mockImplementation(() => {
    //         throw new Error("Invalid token");
    //     });
    //     await userMiddleware.isAuthorized(mockRequest, mockResponse, mockNext);

    //     expect(mockResponse.status).toHaveBeenCalledWith(401);
    //     expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid token" });
    //     expect(mockNext).not.toHaveBeenCalled();
    // });

});


    


