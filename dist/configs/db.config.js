"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        mongoose_1.default.set('strictQuery', true);
        const options = {
            dbName: 'news_db',
            useUnifiedTopology: true,
            useNewUrlParser: true,
        };
        let result = await mongoose_1.default.connect('mongodb+srv://mohit:mohit123@cluster0.qqb2t.mongodb.net/?retryWrites=true&w=majority', options);
        result.connection.on('error', (error) => {
            console.error(error.message);
        });
        if (result) {
            console.log('Database connected');
        }
        return result;
    }
    catch (error) {
        console.error(error.message);
        return error;
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.config.js.map