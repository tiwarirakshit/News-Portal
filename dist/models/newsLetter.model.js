"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NewsLetterSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const newsLetterModel = mongoose_1.default.model('NewsLetter', NewsLetterSchema);
exports.default = newsLetterModel;
//# sourceMappingURL=newsLetter.model.js.map