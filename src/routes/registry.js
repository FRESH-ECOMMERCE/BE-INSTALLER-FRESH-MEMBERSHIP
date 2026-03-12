"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const health_route_1 = __importDefault(require("./health.route"));
const myProfile_route_1 = __importDefault(require("./myProfile.route"));
const store_route_1 = __importDefault(require("./store.route"));
const membership_route_1 = __importDefault(require("./membership.route"));
const banner_route_1 = __importDefault(require("./banner.route"));
const pointTransaction_route_1 = __importDefault(require("./pointTransaction.route"));
const pointConvertion_route_1 = __importDefault(require("./pointConvertion.route"));
const statistic_route_1 = __importDefault(require("./statistic.route"));
const RoutesRegistry = {
    AuthRoute: auth_route_1.default,
    HealthRoute: health_route_1.default,
    MyProfileRoute: myProfile_route_1.default,
    StoreRoute: store_route_1.default,
    MembershipRoute: membership_route_1.default,
    BannerRoute: banner_route_1.default,
    PointTransactionRoute: pointTransaction_route_1.default,
    PointConvertionRoute: pointConvertion_route_1.default,
    StatisticRoute: statistic_route_1.default
};
exports.default = RoutesRegistry;
