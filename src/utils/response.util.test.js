"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('../configs', () => ({
    appConfigs: {
        app: {
            appVersion: '1.0.0-test'
        }
    }
}));
const response_util_1 = require("./response.util");
describe('ResponseData', () => {
    describe('success', () => {
        it('should return success true with default message and meta', () => {
            const result = response_util_1.ResponseData.success({});
            expect(result.success).toBe(true);
            expect(result.message).toBe('Request successful');
            expect(result.data).toBeUndefined();
            expect(result.meta).toMatchObject({
                version: '1.0.0-test',
                executionTime: undefined,
                requestId: undefined
            });
            expect(typeof result.meta.timestamp).toBe('string');
        });
        it('should include data and custom message when provided', () => {
            const result = response_util_1.ResponseData.success({
                data: { id: 1, name: 'Test' },
                message: 'Created'
            });
            expect(result.success).toBe(true);
            expect(result.message).toBe('Created');
            expect(result.data).toEqual({ id: 1, name: 'Test' });
        });
        it('should pass executionTime and requestId to meta', () => {
            const result = response_util_1.ResponseData.success({
                executionTime: '12ms',
                requestId: 'req-123'
            });
            expect(result.meta.executionTime).toBe('12ms');
            expect(result.meta.requestId).toBe('req-123');
        });
    });
    describe('error', () => {
        it('should return success false with default message and data null', () => {
            const result = response_util_1.ResponseData.error({});
            expect(result.success).toBe(false);
            expect(result.message).toBe('Something went wrong');
            expect(result.data).toBeNull();
            expect(result.meta).toMatchObject({
                version: '1.0.0-test',
                executionTime: undefined,
                requestId: undefined
            });
            expect(typeof result.meta.timestamp).toBe('string');
        });
        it('should include custom message when provided', () => {
            const result = response_util_1.ResponseData.error({
                message: 'Validation failed'
            });
            expect(result.success).toBe(false);
            expect(result.message).toBe('Validation failed');
            expect(result.data).toBeNull();
        });
        it('should pass executionTime and requestId to meta', () => {
            const result = response_util_1.ResponseData.error({
                message: 'Error',
                executionTime: '5ms',
                requestId: 'req-456'
            });
            expect(result.meta.executionTime).toBe('5ms');
            expect(result.meta.requestId).toBe('req-456');
        });
    });
});
