"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mockSign;
let mockVerify;
jest.mock('jsonwebtoken', () => {
    mockSign = jest.fn();
    mockVerify = jest.fn();
    return {
        __esModule: true,
        default: {
            sign: (...args) => mockSign(...args),
            verify: (...args) => mockVerify(...args)
        }
    };
});
jest.mock('../configs', () => ({
    appConfigs: {
        secret: {
            jwtToken: 'test-jwt-secret'
        }
    }
}));
const jwt_util_1 = require("./jwt.util");
describe('jwt.util', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('generateAccessToken', () => {
        it('should call jwt.sign with payload and secret and return token', () => {
            mockSign.mockReturnValueOnce('mocked-access-token');
            const result = (0, jwt_util_1.generateAccessToken)({
                userId: 1,
                email: 'user@example.com'
            });
            expect(mockSign).toHaveBeenCalledWith({ userId: 1, email: 'user@example.com' }, 'test-jwt-secret');
            expect(result).toBe('mocked-access-token');
        });
    });
    describe('verifyAccessToken', () => {
        it('should return decoded payload when token is valid', () => {
            const decoded = { userId: 1, email: 'user@example.com' };
            mockVerify.mockReturnValueOnce(decoded);
            const result = (0, jwt_util_1.verifyAccessToken)('valid-token');
            expect(mockVerify).toHaveBeenCalledWith('valid-token', 'test-jwt-secret');
            expect(result).toEqual(decoded);
        });
        it('should return false when token is invalid or expired', () => {
            mockVerify.mockImplementationOnce(() => {
                throw new Error('invalid token');
            });
            const result = (0, jwt_util_1.verifyAccessToken)('invalid-token');
            expect(result).toBe(false);
        });
        it('should return false when verify throws any error', () => {
            mockVerify.mockImplementationOnce(() => {
                throw new Error('jwt expired');
            });
            const result = (0, jwt_util_1.verifyAccessToken)('expired-token');
            expect(result).toBe(false);
        });
    });
});
