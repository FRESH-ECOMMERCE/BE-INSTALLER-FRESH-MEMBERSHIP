"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const updatePassword_controller_1 = require("./updatePassword.controller");
const login_controller_1 = require("./login.controller");
const signin_controller_1 = require("./signin.controller");
const otpRequest_controller_1 = require("./otpRequest.controller");
const otpVerify_controller_1 = require("./otpVerify.controller");
exports.AuthController = {
    updatePassword: updatePassword_controller_1.updatePassword,
    userLogin: login_controller_1.userLogin,
    userRegister: signin_controller_1.userRegister,
    otpRequest: otpRequest_controller_1.otpRequest,
    otpVerify: otpVerify_controller_1.otpVerify
};
