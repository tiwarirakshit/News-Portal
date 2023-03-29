"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNews = exports.createNews = exports.emailValidator = exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.body)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.body)('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('register', {
                error: errors.array(),
                message: false,
            });
        }
        next();
    },
];
exports.loginValidator = [
    (0, express_validator_1.body)('email', 'Please include a valid email !').isEmail().not().isEmpty(),
    // password is required and must be at least 6 characters long
    (0, express_validator_1.body)('password', 'Password is required').not().isEmpty(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).render('login', {
                error: errors.array(),
                message: false,
            });
        }
        next();
    },
];
exports.emailValidator = [
    (0, express_validator_1.body)('email', 'Please include a valid email').isEmail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: false,
            });
        }
        next();
    },
];
exports.createNews = [
    (0, express_validator_1.body)('title', 'Title is required').not().isEmpty(),
    (0, express_validator_1.body)('description', 'Description is required').not().isEmpty(),
    (0, express_validator_1.body)('author', 'Author is required').not().isEmpty(),
    (0, express_validator_1.body)('videoLink', 'Video Link is required').optional(),
    (0, express_validator_1.body)('category', 'Category is required').not().isEmpty(),
    (0, express_validator_1.body)('latest', 'latest is required').optional(),
    (0, express_validator_1.body)('featured', 'featured is required').optional(),
    (0, express_validator_1.body)('trending', 'Trending is required').optional(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('create_news', {
                error: errors.array(),
                message: false,
            });
        }
        next();
    },
];
exports.updateNews = [
    (0, express_validator_1.body)('title', 'Title is required').not().isEmpty(),
    (0, express_validator_1.body)('description', 'Description is required').not().isEmpty(),
    (0, express_validator_1.body)('videoLink', 'Video Link is required').optional(),
    (0, express_validator_1.body)('category', 'Category is required').not().isEmpty(),
    (0, express_validator_1.body)('latest', 'latest is required').not().isEmpty(),
    (0, express_validator_1.body)('featured', 'featured is required').not().isEmpty(),
    (0, express_validator_1.body)('trending', 'Trending is required').not().isEmpty(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req.headers);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: false,
            });
        }
        next();
    },
];
//# sourceMappingURL=request.validator.js.map