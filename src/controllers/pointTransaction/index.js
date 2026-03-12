"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionController = void 0;
const create_controller_1 = require("./create.controller");
const list_controller_1 = require("./list.controller");
exports.PointTransactionController = {
    createPointTransaction: create_controller_1.createPointTransaction,
    listPointTransactions: list_controller_1.listPointTransactions
};
