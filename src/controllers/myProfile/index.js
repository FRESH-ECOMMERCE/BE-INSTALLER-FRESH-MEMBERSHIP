"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyProfileController = void 0;
const find_controller_1 = require("./find.controller");
const update_controller_1 = require("./update.controller");
exports.MyProfileController = {
    find: find_controller_1.findMyProfile,
    update: update_controller_1.updateMyProfile
};
