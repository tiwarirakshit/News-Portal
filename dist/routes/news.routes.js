"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const newsController = __importStar(require("../controllers/news.controllers"));
const authenticate_admin_1 = require("../middlewares/authenticate.admin");
const requestValidator = __importStar(require("../utils/validators/request.validator"));
const multer_middleware_1 = require("../middlewares/multer.middleware");
const multer_utils_1 = require("../utils/multer-utils");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_middleware_1.storage,
    limits: { fileSize: multer_utils_1.MULTER_UPLOAD_SIZE_LIMIT, files: 1 },
    fileFilter: multer_utils_1.multerFileTypeFilterForImage,
});
router.post('/createNews', authenticate_admin_1.authenticateAdmin, upload.array('image', 5), requestValidator.createNews, newsController.createNews);
router.get('/getNewsByTitle/:title', newsController.getNewsByTitle);
router.get('/getNews', newsController.getNews);
router.get('/makeTrending/:id', authenticate_admin_1.authenticateAdmin, newsController.makeTrending);
router.get('/makeFeatured/:id', authenticate_admin_1.authenticateAdmin, newsController.makeFeatured);
router.get('/makeLatest/:id', authenticate_admin_1.authenticateAdmin, newsController.makeLatest);
router.get('/getNewsById/:id', newsController.getNewsById);
router.get('/getTrendingNews', newsController.getTrendingNews);
router.get('/getFeaturedNews', newsController.getFeaturedNews);
router.get('/getLatestNews', newsController.getLatestNews);
router.get('/deleteNews/:id', authenticate_admin_1.authenticateAdmin, newsController.deleteNews);
router.get('/getNewsUpdatePage/:id', authenticate_admin_1.authenticateAdmin, newsController.getUpdatePage);
router.post('/updateNews/:id', authenticate_admin_1.authenticateAdmin, requestValidator.updateNews, upload.array('image', 5), newsController.updateNews);
// router for pages
router.get('/', newsController.getHomePage);
router.get('/getContact', newsController.getContactPage);
router.get('/category', newsController.getCategoryPage);
router.post('/subscribe', newsController.subscribeNewsLetter);
router.post('/addComment/:id', newsController.addComment);
router.post('/contact', newsController.contactRequest);
exports.default = router;
//# sourceMappingURL=news.routes.js.map