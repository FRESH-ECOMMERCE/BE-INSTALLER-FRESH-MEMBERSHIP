"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockUpdate = jest.fn().mockReturnThis();
const mockDigest = jest.fn(() => 'mocked-hex-hash');
const mockCreateHash = jest.fn((_algorithm) => ({
    update: mockUpdate,
    digest: mockDigest
}));
jest.mock('crypto', () => ({
    createHash: (algorithm) => mockCreateHash(algorithm)
}));
jest.mock('../configs', () => ({
    appConfigs: {
        secret: {
            passwordEncryption: 'test-salt'
        }
    }
}));
const hash_util_1 = require("./hash.util");
describe('hashPassword', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockDigest.mockReturnValue('mocked-hex-hash');
    });
    it('should call createHash with sha1', () => {
        (0, hash_util_1.hashPassword)('password123');
        expect(mockCreateHash).toHaveBeenCalledWith('sha1');
    });
    it('should update with password concatenated with secret', () => {
        (0, hash_util_1.hashPassword)('mypass');
        expect(mockUpdate).toHaveBeenCalledWith('mypass' + 'test-salt');
    });
    it('should call digest with hex encoding', () => {
        (0, hash_util_1.hashPassword)('any');
        expect(mockDigest).toHaveBeenCalledWith('hex');
    });
    it('should return the digest hex string', () => {
        mockDigest.mockReturnValueOnce('abc123hex');
        const result = (0, hash_util_1.hashPassword)('secret');
        expect(result).toBe('abc123hex');
    });
    it('should produce same hash for same input', () => {
        mockDigest.mockReturnValue('deterministic-hash');
        const a = (0, hash_util_1.hashPassword)('same-password');
        const b = (0, hash_util_1.hashPassword)('same-password');
        expect(a).toBe(b);
        expect(mockUpdate).toHaveBeenNthCalledWith(1, 'same-password' + 'test-salt');
        expect(mockUpdate).toHaveBeenNthCalledWith(2, 'same-password' + 'test-salt');
    });
});
