"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const news_model_1 = __importDefault(require("../models/news.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const newsLetter_model_1 = __importDefault(require("../models/newsLetter.model"));
const contact_model_1 = __importDefault(require("../models/contact.model"));
const createNews = async (news) => {
    try {
        const { title, description, category, image, date, author, videoLink, latest, featured, trending } = news;
        const newNews = new news_model_1.default({
            title,
            description,
            image,
            date,
            author,
            videoLink,
            category,
            latest,
            featured,
            trending,
        });
        return await newNews.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const getNewsByTitle = async (title) => {
    try {
        return await news_model_1.default.findOne({ title: title });
    }
    catch (error) {
        throw new Error(error);
    }
};
const getNews = async () => {
    try {
        return await news_model_1.default.find();
    }
    catch (error) {
        throw new Error(error);
    }
};
const getNewsById = async (id) => {
    try {
        return await news_model_1.default.findById({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
const makeTrending = async (id) => {
    try {
        const news = await news_model_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $set: { trending: true } }, { new: true });
        if (!news) {
            throw new Error('News not found');
        }
        return await news.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const makeFeatured = async (id) => {
    try {
        const news = await news_model_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $set: { featured: true } }, { new: true });
        if (!news) {
            throw new Error('News not found');
        }
        return await news.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const makeLatest = async (id) => {
    try {
        const news = await news_model_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $set: { latest: true } }, { new: true });
        if (!news) {
            throw new Error('News not found');
        }
        return await news.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const getTrendingNews = async () => {
    try {
        return await news_model_1.default.find({ trending: true }).sort({ date: -1 });
    }
    catch (error) {
        throw new Error(error);
    }
};
const getLatestNews = async () => {
    try {
        return await news_model_1.default.find({ latest: true }).sort({ date: -1 });
    }
    catch (error) {
        throw new Error(error);
    }
};
const getFeaturedNews = async () => {
    try {
        return await news_model_1.default.find({ featured: true }).sort({ date: -1 });
    }
    catch (error) {
        throw new Error(error);
    }
};
const updateNews = async (id, news) => {
    try {
        const { title, description, image, date, author, videoLink, featured, latest, trending } = news;
        const newNews = await news_model_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(id),
        }, {
            $set: {
                title,
                description,
                image,
                date,
                author,
                videoLink,
                featured,
                latest,
                trending,
            },
        }, { new: true });
        if (!newNews) {
            throw new Error('News not found');
        }
        return await newNews.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const deleteNews = async (id) => {
    try {
        const news = await news_model_1.default.findOneAndDelete({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        if (!news) {
            throw new Error('News not found');
        }
        return await news.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const subscribeNewsLetter = async (email) => {
    try {
        const newNewsLetter = new newsLetter_model_1.default({
            email,
        });
        return await newNewsLetter.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const addComment = async (id, comment) => {
    try {
        const news = await news_model_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $push: { comments: comment } }, { new: true });
        if (!news) {
            throw new Error('News not found');
        }
        return await news.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const contactRequest = async (contact) => {
    try {
        const result = await contact_model_1.default.create(contact);
        if (!result) {
            throw new Error('Contact not found');
        }
        return await result.save();
    }
    catch (error) {
        throw new Error(error);
    }
};
const getNewsLetters = async () => {
    try {
        const result = await newsLetter_model_1.default.find();
        if (!result) {
            throw new Error('No news letter found');
        }
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = {
    createNews,
    getNewsByTitle,
    getNews,
    getNewsById,
    getTrendingNews,
    getLatestNews,
    getFeaturedNews,
    updateNews,
    deleteNews,
    makeTrending,
    makeFeatured,
    makeLatest,
    subscribeNewsLetter,
    addComment,
    contactRequest,
    getNewsLetters,
};
//# sourceMappingURL=news.services.js.map