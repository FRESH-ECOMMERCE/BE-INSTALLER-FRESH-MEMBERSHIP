"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_util_1 = require("./pagination.util");
describe('Pagination', () => {
    describe('constructor', () => {
        it('should set page 1 and size 10 with offset 0', () => {
            const p = new pagination_util_1.Pagination(1, 10);
            expect(p.page).toBe(1);
            expect(p.limit).toBe(10);
            expect(p.offset).toBe(0);
        });
        it('should calculate offset for page 2 and size 10', () => {
            const p = new pagination_util_1.Pagination(2, 10);
            expect(p.page).toBe(2);
            expect(p.limit).toBe(10);
            expect(p.offset).toBe(10);
        });
        it('should use default size 10 when size not provided', () => {
            const p = new pagination_util_1.Pagination(1);
            expect(p.limit).toBe(10);
            expect(p.offset).toBe(0);
        });
        it('should floor decimal page and size', () => {
            const p = new pagination_util_1.Pagination(2.7, 5.9);
            expect(p.page).toBe(2);
            expect(p.limit).toBe(5);
            expect(p.offset).toBe(5);
        });
        it('should clamp page to at least 1', () => {
            const p = new pagination_util_1.Pagination(0, 10);
            expect(p.page).toBe(1);
            expect(p.offset).toBe(0);
        });
        it('should clamp size to at least 1', () => {
            const p = new pagination_util_1.Pagination(1, 0);
            expect(p.limit).toBe(10);
        });
        it('should treat NaN page as 1', () => {
            const p = new pagination_util_1.Pagination(Number.NaN, 10);
            expect(p.page).toBe(1);
            expect(p.offset).toBe(0);
        });
    });
    describe('formatData', () => {
        it('should return totalItems, items, totalPages, currentPage', () => {
            const p = new pagination_util_1.Pagination(1, 10);
            const result = p.formatData({ count: 25, rows: [{ id: 1 }, { id: 2 }] });
            expect(result).toEqual({
                totalItems: 25,
                items: [{ id: 1 }, { id: 2 }],
                totalPages: 3,
                currentPage: 1
            });
        });
        it('should compute totalPages as ceil(count / limit)', () => {
            const p = new pagination_util_1.Pagination(1, 10);
            expect(p.formatData({ count: 30, rows: [] }).totalPages).toBe(3);
            expect(p.formatData({ count: 31, rows: [] }).totalPages).toBe(4);
            expect(p.formatData({ count: 10, rows: [] }).totalPages).toBe(1);
        });
        it('should return totalPages 0 when count is 0', () => {
            const p = new pagination_util_1.Pagination(1, 10);
            const result = p.formatData({ count: 0, rows: [] });
            expect(result.totalPages).toBe(0);
            expect(result.totalItems).toBe(0);
            expect(result.items).toEqual([]);
            expect(result.currentPage).toBe(1);
        });
        it('should preserve currentPage from pagination instance', () => {
            const p = new pagination_util_1.Pagination(3, 5);
            const result = p.formatData({ count: 100, rows: [] });
            expect(result.currentPage).toBe(3);
        });
    });
});
