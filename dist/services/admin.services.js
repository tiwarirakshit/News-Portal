"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = __importDefault(require("../models/admin.model"));
const contact_model_1 = __importDefault(require("../models/contact.model"));
const createAdmin = async (admin) => {
    try {
        const { name, email, password } = admin;
        const newAdmin = new admin_model_1.default({
            name,
            email,
            password,
        });
        return await newAdmin.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const getAdminByEmail = async (email) => {
    try {
        let admin = await admin_model_1.default.findOne({ email });
        return admin;
    }
    catch (error) {
        throw new Error(error);
    }
};
const getContacts = async () => {
    try {
        let contacts = await contact_model_1.default.find();
        return contacts;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = {
    createAdmin,
    getAdminByEmail,
    getContacts,
};
//# sourceMappingURL=admin.services.js.map