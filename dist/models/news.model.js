"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ImageSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
    },
    trending: {
        type: Boolean,
        default: false,
    },
    latest: {
        type: Boolean,
        default: false,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    author: {
        type: String,
        required: true,
    },
    videoLink: {
        type: String,
        default: '',
    },
    comments: {
        type: [
            {
                name: String,
                email: String,
                comment: String,
            },
        ],
        default: [],
    },
});
const NewsModel = mongoose_1.default.model('News', ImageSchema);
exports.default = NewsModel;
//# sourceMappingURL=news.model.js.map