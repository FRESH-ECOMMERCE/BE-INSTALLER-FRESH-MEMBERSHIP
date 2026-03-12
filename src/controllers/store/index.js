"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const create_controller_1 = require("./create.controller");
const detail_controller_1 = require("./detail.controller");
const list_controller_1 = require("./list.controller");
const remove_controller_1 = require("./remove.controller");
const update_controller_1 = require("./update.controller");
exports.StoreController = {
    listStores: list_controller_1.listStores,
    findStoreDetail: detail_controller_1.findStoreDetail,
    createStore: create_controller_1.createStore,
    updateStore: update_controller_1.updateStore,
    removeStore: remove_controller_1.removeStore
};
