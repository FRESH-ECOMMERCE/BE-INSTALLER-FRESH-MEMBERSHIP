"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerController = void 0;
const create_controller_1 = require("./create.controller");
const detail_controller_1 = require("./detail.controller");
const list_controller_1 = require("./list.controller");
const remove_controller_1 = require("./remove.controller");
const update_controller_1 = require("./update.controller");
exports.BannerController = {
    createBanner: create_controller_1.createBanner,
    listBanners: list_controller_1.listBanners,
    updateBanner: update_controller_1.updateBanner,
    removeBanner: remove_controller_1.removeBanner,
    findBannerDetail: detail_controller_1.findBannerDetail
};
