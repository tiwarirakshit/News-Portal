"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
exports.SECRET_KEY = process.env.JWT_SECRET;
async function authenticateAdmin(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).render('login', { message: 'Unauthorized' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        if (!decoded) {
            return res.status(401).render('login', { message: 'Unauthorized' });
        }
        res.locals.id = decoded.id;
        res.locals.name = decoded.name;
        next();
    }
    catch (error) {
        return res.status(500).render('login', { message: error.message });
    }
}
exports.authenticateAdmin = authenticateAdmin;
//# sourceMappingURL=authenticate.admin.js.map