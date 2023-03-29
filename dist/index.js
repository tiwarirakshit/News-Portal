"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
const port = Number(process.env.PORT);
const start = (Port) => {
    try {
        server.use(app_1.default);
        server.listen(Port, () => {
            console.log(`Server running on port ${Port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit();
    }
};
start(port);
//# sourceMappingURL=index.js.map