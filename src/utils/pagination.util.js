"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    limit;
    offset;
    page;
    constructor(page, size = 10) {
        this.page = Math.max(1, Math.floor(Number(page)) || 1);
        this.limit = Math.max(1, Math.floor(Number(size)) || 10);
        this.offset = this.calculateOffset(this.page, this.limit);
    }
    calculateOffset(page, size) {
        return (page - 1) * size;
    }
    formatData(data) {
        const { count, rows } = data;
        const totalPages = Math.ceil(count / this.limit) || 0;
        return {
            totalItems: count,
            items: rows,
            totalPages,
            currentPage: this.page
        };
    }
}
exports.Pagination = Pagination;
