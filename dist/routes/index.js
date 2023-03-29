"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const news_routes_1 = __importDefault(require("./news.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const routes = { newsRoutes: news_routes_1.default, adminRoutes: admin_routes_1.default };
exports.default = routes;
//# sourceMappingURL=index.js.map