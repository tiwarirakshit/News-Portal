"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContacts = exports.getNewsLetterPage = exports.getNewsPage = exports.getCreateNewsPage = exports.getLoginPage = exports.logoutAdmin = exports.loginAdmin = exports.register = exports.SECRET_KEY = void 0;
const admin_services_1 = __importDefault(require("../services/admin.services"));
const news_services_1 = __importDefault(require("../services/news.services"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
exports.SECRET_KEY = process.env.JWT_SECRET;
async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const admin = await admin_services_1.default.getAdminByEmail(email);
        if (admin) {
            return res.status(400).json({
                message: 'Admin already exists',
                error: false,
            });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        let newAdmin = {
            name: name,
            email: email,
            password: hashedPassword,
            date: new Date(),
        };
        await admin_services_1.default.createAdmin(newAdmin);
        return res.status(201).json({
            message: 'Admin created',
            error: false,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
        });
    }
}
exports.register = register;
async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await admin_services_1.default.getAdminByEmail(email);
        if (!admin) {
            return res.status(400).render('login', {
                message: 'Invalid credentials',
                error: false,
            });
        }
        const isMatch = await bcrypt_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).render('login', {
                message: 'Invalid credentials',
                error: false,
            });
        }
        const payload = {
            id: admin.id,
            name: admin.name,
        };
        let token = jsonwebtoken_1.default.sign(payload, exports.SECRET_KEY, { expiresIn: 360000 });
        if (!token) {
            return res.status(400).render('login', {
                message: 'Invalid credentials',
                error: false,
            });
        }
        return res
            .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })
            .status(200)
            .render('create_news', {
            name: admin.name,
            message: false,
            error: false,
        });
    }
    catch (error) {
        return res.status(500).render('login', {
            message: error.message,
            error: false,
        });
    }
}
exports.loginAdmin = loginAdmin;
async function logoutAdmin(req, res) {
    try {
        return res
            .clearCookie('access_token')
            .status(200)
            .render('login', { message: 'Logged out' });
    }
    catch (error) {
        return res.status(500).render('login', { message: error.message });
    }
}
exports.logoutAdmin = logoutAdmin;
async function getLoginPage(req, res) {
    try {
        return res.status(200).render('login', {
            message: false,
            error: false,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getLoginPage = getLoginPage;
async function getCreateNewsPage(req, res) {
    try {
        return res.status(200).render('create_news', {
            name: res.locals.name,
            message: false,
            error: false,
        });
    }
    catch (error) {
        return res.status(500).render('login', { message: error.message });
    }
}
exports.getCreateNewsPage = getCreateNewsPage;
async function getNewsPage(req, res) {
    try {
        const news = await news_services_1.default.getNews();
        if (news.length === 0) {
            return res.status(200).render('get_news', {
                news: [],
                message: 'No news found',
                name: res.locals.name,
            });
        }
        else {
            return res.status(200).render('get_news', {
                news: news,
                name: res.locals.name,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getNewsPage = getNewsPage;
async function getNewsLetterPage(req, res) {
    try {
        const result = await news_services_1.default.getNewsLetters();
        if (!result) {
            return res
                .status(404)
                .render('Newsletter', { message: 'News not found' });
        }
        else {
            return res.status(200).render('Newsletter', { newsLetter: result });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getNewsLetterPage = getNewsLetterPage;
async function getContacts(req, res) {
    try {
        const result = await admin_services_1.default.getContacts();
        if (!result) {
            return res
                .status(404)
                .render('get_contacts', { message: 'Contacts not found' });
        }
        else {
            return res.status(200).render('get_contacts', {
                contacts: result,
                name: res.locals.name,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getContacts = getContacts;
//# sourceMappingURL=admin.controllers.js.map