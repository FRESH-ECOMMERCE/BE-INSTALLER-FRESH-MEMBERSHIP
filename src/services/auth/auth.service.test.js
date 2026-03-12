"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const auth_service_1 = require("./auth.service");
const request_util_1 = require("../../utils/request.util");
const logger_service_1 = require("../logger/logger.service");
const user_model_1 = require("../../models/user.model");
const hash_util_1 = require("../../utils/hash.util");
const jwt_util_1 = require("../../utils/jwt.util");
jest.mock('../logger/logger.service', () => ({
    LoggerService: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn()
    }
}));
jest.mock('../../models/user.model', () => ({
    UserModel: {
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}));
jest.mock('../../utils/hash.util', () => ({
    hashPassword: jest.fn()
}));
jest.mock('../../utils/jwt.util', () => ({
    generateAccessToken: jest.fn()
}));
const mockedLogger = logger_service_1.LoggerService;
const mockedUserModel = user_model_1.UserModel;
const mockedHashPassword = hash_util_1.hashPassword;
const mockedGenerateAccessToken = jwt_util_1.generateAccessToken;
describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('loginUser', () => {
        it('should throw AppError.notFound when user does not exist', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce(null);
            await expect(auth_service_1.AuthService.loginUser({ email: 'test@example.com', password: 'secret123' })).rejects.toBeInstanceOf(request_util_1.AppError);
            expect(mockedUserModel.findOne).toHaveBeenCalledWith({
                where: { email: 'test@example.com' }
            });
            expect(mockedLogger.info).toHaveBeenCalled();
        });
        it('should throw AppError with UNAUTHORIZED when password is invalid', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce({
                id: 1,
                email: 'test@example.com',
                password: 'stored-hash',
                name: 'Test User'
            });
            mockedHashPassword.mockReturnValueOnce('different-hash');
            await expect(auth_service_1.AuthService.loginUser({ email: 'test@example.com', password: 'wrong-pass' })).rejects.toMatchObject({
                statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED
            });
            expect(mockedLogger.error).toHaveBeenCalled();
        });
        it('should return tokens when login is successful', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce({
                id: 1,
                email: 'test@example.com',
                password: 'stored-hash',
                name: 'Test User'
            });
            mockedHashPassword.mockReturnValueOnce('stored-hash');
            mockedGenerateAccessToken.mockReturnValueOnce('access-token');
            const result = await auth_service_1.AuthService.loginUser({
                email: 'test@example.com',
                password: 'correct-pass'
            });
            expect(mockedGenerateAccessToken).toHaveBeenCalledWith({
                userId: 1,
                email: 'test@example.com'
            });
            expect(result).toEqual({
                accessToken: 'access-token',
                refreshToken: ''
            });
            expect(mockedLogger.info).toHaveBeenCalledWith('[AuthService]: User Test User logged in successfully');
        });
    });
    describe('registerUser', () => {
        it('should create user when email is not registered', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce(null);
            mockedHashPassword.mockReturnValueOnce('hashed-password');
            mockedUserModel.create.mockResolvedValueOnce({});
            await auth_service_1.AuthService.registerUser({
                name: 'New User',
                email: 'new@example.com',
                password: 'password123'
            });
            expect(mockedUserModel.findOne).toHaveBeenCalledWith({
                where: { email: { [sequelize_1.Op.eq]: 'new@example.com' } }
            });
            expect(mockedUserModel.create).toHaveBeenCalledWith(expect.objectContaining({
                name: 'New User',
                email: 'new@example.com',
                password: 'hashed-password'
            }));
        });
        it('should throw AppError when email already exists', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce({
                email: 'existing@example.com'
            });
            await expect(auth_service_1.AuthService.registerUser({
                name: 'Existing User',
                email: 'existing@example.com',
                password: 'password123'
            })).rejects.toBeInstanceOf(request_util_1.AppError);
            expect(mockedLogger.info).toHaveBeenCalledWith(expect.stringContaining('Registration attempt failed'));
        });
    });
    describe('updateUserPassword', () => {
        it('should throw AppError.notFound when user is not found', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce(null);
            await expect(auth_service_1.AuthService.updateUserPassword({
                email: 'missing@example.com',
                password: 'new-password'
            })).rejects.toBeInstanceOf(request_util_1.AppError);
            expect(mockedLogger.info).toHaveBeenCalledWith('[AuthService]: Attempt to update non-existing user');
        });
        it('should update password when user exists', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce({
                id: 123,
                email: 'user@example.com'
            });
            mockedHashPassword.mockReturnValueOnce('new-hash');
            mockedUserModel.update.mockResolvedValueOnce([1]);
            await auth_service_1.AuthService.updateUserPassword({
                email: 'user@example.com',
                password: 'new-password'
            });
            expect(mockedUserModel.update).toHaveBeenCalledWith({ password: 'new-hash' }, {
                where: { id: 123 }
            });
            expect(mockedLogger.info).toHaveBeenCalledWith('[AuthService]: Password updated successfully');
        });
    });
});
