"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myProfile_service_1 = require("./myProfile.service");
const request_util_1 = require("../../utils/request.util");
const logger_service_1 = require("../logger/logger.service");
const user_model_1 = require("../../models/user.model");
jest.mock('../logger/logger.service', () => ({
    LoggerService: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn()
    }
}));
jest.mock('../../models/user.model', () => ({
    UserModel: {
        findOne: jest.fn(),
        update: jest.fn()
    }
}));
jest.mock('../../configs', () => ({
    appConfigs: {
        secret: {
            passwordEncryption: 'secret-salt'
        }
    }
}));
jest.mock('crypto', () => ({
    createHash: jest.fn(() => ({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn(() => 'hashed-password')
    }))
}));
const mockedLogger = logger_service_1.LoggerService;
const mockedUserModel = user_model_1.UserModel;
describe('MyProfileService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('findByUserId', () => {
        it('should throw AppError.notFound and log error when user does not exist', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce(null);
            await expect(myProfile_service_1.MyProfileService.findByUserId(999)).rejects.toBeInstanceOf(request_util_1.AppError);
            expect(mockedUserModel.findOne).toHaveBeenCalledWith({
                where: { id: 999 },
                attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
            });
            expect(mockedLogger.error).toHaveBeenCalledWith('[MyProfileService] findByUserId failed: User not found');
        });
        it('should return user when found', async () => {
            const user = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            mockedUserModel.findOne.mockResolvedValueOnce(user);
            const result = await myProfile_service_1.MyProfileService.findByUserId(1);
            expect(result).toEqual(user);
            expect(mockedLogger.error).not.toHaveBeenCalled();
        });
    });
    describe('updateProfile', () => {
        it('should throw AppError.conflict and log error when email already in use', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce({
                id: 2,
                email: 'taken@example.com'
            });
            await expect(myProfile_service_1.MyProfileService.updateProfile(1, { email: 'taken@example.com' })).rejects.toBeInstanceOf(request_util_1.AppError);
            expect(mockedLogger.error).toHaveBeenCalledWith('[MyProfileService] update password failed: Email already in use');
            expect(mockedUserModel.update).not.toHaveBeenCalled();
        });
        it('should return early when there is nothing to update', async () => {
            await myProfile_service_1.MyProfileService.updateProfile(1, {});
            expect(mockedUserModel.update).not.toHaveBeenCalled();
        });
        it('should update name/email/password (hashed) when provided', async () => {
            mockedUserModel.update.mockResolvedValueOnce([1]);
            await myProfile_service_1.MyProfileService.updateProfile(1, {
                name: 'New Name',
                email: 'new@example.com',
                password: 'plain-password'
            });
            expect(mockedUserModel.update).toHaveBeenCalledWith({
                name: 'New Name',
                email: 'new@example.com',
                password: 'hashed-password'
            }, { where: { id: 1 } });
        });
        it('should throw AppError.notFound and log error when user not found on update', async () => {
            mockedUserModel.update.mockResolvedValueOnce([0]);
            await expect(myProfile_service_1.MyProfileService.updateProfile(1, { name: 'New Name' })).rejects.toBeInstanceOf(request_util_1.AppError);
            expect(mockedLogger.error).toHaveBeenCalledWith('[MyProfileService] update password failed: User not found');
        });
    });
    describe('updateOnboardingStatus', () => {
        it('should update onboarding status when affectedRows > 0', async () => {
            mockedUserModel.update.mockResolvedValueOnce([1]);
            await myProfile_service_1.MyProfileService.updateOnboardingStatus(1, {
                userOnboardingStatus: 'completed'
            });
            expect(mockedUserModel.update).toHaveBeenCalledWith({ userOnboardingStatus: 'completed' }, { where: { id: 1 } });
            expect(mockedLogger.error).not.toHaveBeenCalled();
        });
        it('should throw AppError.notFound and log error when no rows updated', async () => {
            mockedUserModel.update.mockResolvedValueOnce([0]);
            await expect(myProfile_service_1.MyProfileService.updateOnboardingStatus(1, {
                userOnboardingStatus: 'completed'
            })).rejects.toBeInstanceOf(request_util_1.AppError);
            expect(mockedLogger.error).toHaveBeenCalledWith('[MyProfileService] update onboarding status failed: User not found');
        });
    });
});
