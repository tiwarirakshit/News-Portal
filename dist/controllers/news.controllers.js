"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRequest = exports.addComment = exports.subscribeNewsLetter = exports.getUpdatePage = exports.getCategoryPage = exports.getContactPage = exports.getHomePage = exports.updateNews = exports.deleteNews = exports.getFeaturedNews = exports.getLatestNews = exports.getTrendingNews = exports.getNewsById = exports.makeLatest = exports.makeFeatured = exports.makeTrending = exports.getNews = exports.getNewsByTitle = exports.createNews = void 0;
const news_services_1 = __importDefault(require("../services/news.services"));
async function createNews(req, res) {
    try {
        const { title, description, author, videoLink, category, latest, featured, trending, } = req.body;
        // Check if news already exists
        const isNewsExist = await news_services_1.default.getNewsByTitle(title.split(' ').join('-'));
        if (!!isNewsExist) {
            return res.status(400).render('create_news', {
                message: 'News with this title already exists',
            });
        }
        let images = [];
        if (req.files) {
            const files = req.files;
            for (let i = 0; i < files.length; i++) {
                const image = files[i];
                const splitUrlArray = image.destination.split('/');
                let filteredUrl = splitUrlArray[splitUrlArray.length - 1];
                let imagePath = filteredUrl + '/' + image.filename;
                images.push(imagePath);
            }
        }
        let newNews = {
            title: title.trim().split(' ').join('-'),
            description: description,
            image: images,
            date: new Date(),
            author: author,
            videoLink: videoLink,
            category: category,
            latest: latest === 'true' ? true : false,
            featured: featured === 'true' ? true : false,
            trending: trending === 'true' ? true : false,
        };
        let result = await news_services_1.default.createNews(newNews);
        if (!result) {
            return res
                .status(500)
                .render('create_news', { message: 'Something went wrong' });
        }
        else {
            return res.status(201).redirect('/admin/getNews');
        }
    }
    catch (error) {
        return res.status(500).render('create_news', { message: error.message });
    }
}
exports.createNews = createNews;
async function getNewsByTitle(req, res) {
    try {
        const { title } = req.params;
        const news = await news_services_1.default.getNewsByTitle(title);
        if (!news) {
            return res.status(404).redirect('back');
        }
        else {
            const trendingResult = await news_services_1.default.getTrendingNews();
            const date = new Date(news.date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDate = day + '-' + month + '-' + year;
            let result = {
                _id: news._id,
                title: news.title,
                description: news.description,
                image: news.image,
                date: formattedDate,
                category: news.category,
                comments: news.comments,
                author: news.author,
                videoLink: news.videoLink,
            };
            let trendingNews = [];
            for (let i = 0; i < trendingResult.length; i++) {
                // check date in DD-MM-YYYY format
                const trendingDate = new Date(trendingResult[i].date);
                const trendingDay = trendingDate.getDate();
                const trendingMonth = trendingDate.getMonth() + 1;
                const trendingYear = trendingDate.getFullYear();
                const newDate = trendingDay + '-' + trendingMonth + '-' + trendingYear;
                trendingNews.push({
                    title: trendingResult[i].title,
                    description: trendingResult[i].description,
                    image: trendingResult[i].image,
                    formattedDate: newDate,
                    category: trendingResult[i].category,
                    author: trendingResult[i].author,
                });
            }
            const trendingNews1 = trendingNews.slice(0, 5);
            const trendingNews2 = trendingNews.slice(5, 8);
            return res.status(200).render('single', {
                news: result,
                trendingNews1: trendingNews1,
                trendingNews2: trendingNews2,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getNewsByTitle = getNewsByTitle;
async function getNews(req, res) {
    try {
        const news = await news_services_1.default.getNews();
        if (news.length === 0) {
            return res.status(404).json({ message: 'News not found' });
        }
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getNews = getNews;
async function makeTrending(req, res) {
    try {
        const id = req.params.id;
        // Check if news already exists
        const isNewsExist = await news_services_1.default.getNewsById(id);
        if (!isNewsExist) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found', news: news });
            }
        }
        let result = await news_services_1.default.makeTrending(id);
        if (!result) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'something went wrong', news: news });
            }
        }
        else {
            return res.status(201).redirect('/admin/getNews');
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.makeTrending = makeTrending;
async function makeFeatured(req, res) {
    try {
        const id = req.params.id;
        // Check if news already exists
        const isNewsExist = await news_services_1.default.getNewsById(id);
        if (!isNewsExist) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found', news: news });
            }
        }
        let result = await news_services_1.default.makeFeatured(id);
        if (!result) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'something went wrong', news: news });
            }
        }
        else {
            return res.status(201).redirect('/admin/getNews');
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.makeFeatured = makeFeatured;
async function makeLatest(req, res) {
    try {
        const id = req.params.id;
        // Check if news already exists
        const isNewsExist = await news_services_1.default.getNewsById(id);
        if (!isNewsExist) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found', news: news });
            }
        }
        let result = await news_services_1.default.makeLatest(id);
        if (!result) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'something went wrong', news: news });
            }
        }
        else {
            return res.status(201).redirect('/admin/getNews');
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.makeLatest = makeLatest;
async function getNewsById(req, res) {
    try {
        const id = req.params.id;
        const news = await news_services_1.default.getNewsById(id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getNewsById = getNewsById;
async function getTrendingNews(req, res) {
    try {
        const news = await news_services_1.default.getTrendingNews();
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getTrendingNews = getTrendingNews;
async function getLatestNews(req, res) {
    try {
        const news = await news_services_1.default.getLatestNews();
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getLatestNews = getLatestNews;
async function getFeaturedNews(req, res) {
    try {
        const news = await news_services_1.default.getFeaturedNews();
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getFeaturedNews = getFeaturedNews;
async function deleteNews(req, res) {
    try {
        const id = req.params.id;
        const isNewsExist = await news_services_1.default.getNewsById(id);
        if (!isNewsExist) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found', news: news });
            }
        }
        const result = await news_services_1.default.deleteNews(id);
        if (!result) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res
                    .status(404)
                    .render('get_news', { message: 'News not found' });
            }
            else {
                return res
                    .status(404)
                    .render('get_news', { message: 'something went wrong', news: news });
            }
        }
        else {
            return res.status(201).redirect('/admin/getNews');
        }
    }
    catch (error) {
        return res.status(500).redirect('/admin/getNews');
    }
}
exports.deleteNews = deleteNews;
async function updateNews(req, res) {
    try {
        const id = req.params.id;
        const { title, description, author, videoLink, category, featured, latest, trending, } = req.body;
        // Check if news already exists
        const isNewsExist = await news_services_1.default.getNewsById(id);
        if (!isNewsExist) {
            return res.status(404).json({
                message: 'News not found',
                error: false,
            });
        }
        let images = [];
        if (req?.files?.length) {
            const files = req.files;
            for (let i = 0; i < files.length; i++) {
                const image = files[i];
                const splitUrlArray = image.destination.split('/');
                let filteredUrl = splitUrlArray[splitUrlArray.length - 1];
                let imagePath = filteredUrl + '/' + image.filename;
                images.push(imagePath);
            }
        }
        else {
            images = isNewsExist.image;
        }
        let newNews = {
            title: title.split(' ').join('-'),
            description: description,
            image: images,
            date: new Date(),
            author: author,
            videoLink: videoLink,
            category: category,
            featured: featured == 'true' ? true : false,
            latest: latest == 'true' ? true : false,
            trending: trending == 'true' ? true : false,
        };
        const news = await news_services_1.default.updateNews(id, newNews);
        if (!news) {
            return res.status(404).render('update_news', {
                message: 'something went wrong',
                news: isNewsExist,
                error: false,
            });
        }
        else {
            return res.status(201).redirect('/admin/getNews');
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            error: false,
        });
    }
}
exports.updateNews = updateNews;
async function getHomePage(req, res) {
    try {
        const resultLatestNews = await news_services_1.default.getLatestNews();
        const resultTrendingNews = await news_services_1.default.getTrendingNews();
        const resultFeaturedNews = await news_services_1.default.getFeaturedNews();
        if (!resultLatestNews || !resultTrendingNews || !resultFeaturedNews) {
            return res.status(404).render('index', { message: 'News not found' });
        }
        else {
            let latestNews = [];
            for (let i = 0; i < resultLatestNews.length; i++) {
                // check date in DD-MM-YYYY format
                const date = new Date(resultLatestNews[i].date);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const formattedDate = day + '-' + month + '-' + year;
                latestNews.push({
                    title: resultLatestNews[i].title,
                    description: resultLatestNews[i].description,
                    image: resultLatestNews[i].image,
                    formattedDate: formattedDate,
                    category: resultLatestNews[i].category,
                    author: resultLatestNews[i].author,
                });
            }
            let trendingNews = [];
            for (let i = 0; i < resultTrendingNews.length; i++) {
                // check date in DD-MM-YYYY format
                const date = new Date(resultTrendingNews[i].date);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const formattedDate = day + '-' + month + '-' + year;
                trendingNews.push({
                    title: resultTrendingNews[i].title,
                    description: resultTrendingNews[i].description,
                    image: resultTrendingNews[i].image,
                    formattedDate: formattedDate,
                    category: resultTrendingNews[i].category,
                    author: resultTrendingNews[i].author,
                });
            }
            let featuredNews = [];
            for (let i = 0; i < resultFeaturedNews.length; i++) {
                // check date in DD-MM-YYYY format
                const date = new Date(resultFeaturedNews[i].date);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const formattedDate = day + '-' + month + '-' + year;
                featuredNews.push({
                    title: resultFeaturedNews[i].title,
                    description: resultFeaturedNews[i].description,
                    image: resultFeaturedNews[i].image,
                    formattedDate: formattedDate,
                    category: resultFeaturedNews[i].category,
                    author: resultFeaturedNews[i].author,
                });
            }
            // divide trending news into 3 parts one with 3 news and second with 5 news and rest news in third part
            const trendingNews1 = trendingNews.slice(0, 3);
            const trendingNews2 = trendingNews.slice(3, 7);
            const trendingNews3 = trendingNews.slice(7, trendingNews.length);
            return res.status(200).render('index', {
                latestNews: latestNews.splice(0, 5),
                trendingNews1: trendingNews1,
                trendingNews2: trendingNews2,
                trendingNews3: trendingNews3,
                featuredNews: featuredNews.splice(0, 5),
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getHomePage = getHomePage;
async function getContactPage(req, res) {
    try {
        const trendingResult = await news_services_1.default.getTrendingNews();
        let trendingNews = [];
        for (let i = 0; i < trendingResult.length; i++) {
            // check date in DD-MM-YYYY format
            const trendingDate = new Date(trendingResult[i].date);
            const trendingDay = trendingDate.getDate();
            const trendingMonth = trendingDate.getMonth() + 1;
            const trendingYear = trendingDate.getFullYear();
            const newDate = trendingDay + '-' + trendingMonth + '-' + trendingYear;
            trendingNews.push({
                title: trendingResult[i].title,
                description: trendingResult[i].description,
                image: trendingResult[i].image,
                formattedDate: newDate,
                category: trendingResult[i].category,
                author: trendingResult[i].author,
            });
        }
        const trendingNews1 = trendingNews.slice(0, 5);
        const trendingNews2 = trendingNews.slice(5, 8);
        return res.status(200).render('contact', {
            trendingNews1: trendingNews1,
            trendingNews2: trendingNews2,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getContactPage = getContactPage;
async function getCategoryPage(req, res) {
    try {
        const resultLatestNews = await news_services_1.default.getLatestNews();
        const resultTrendingNews = await news_services_1.default.getTrendingNews();
        const resultFeaturedNews = await news_services_1.default.getFeaturedNews();
        if (!resultLatestNews || !resultTrendingNews || !resultFeaturedNews) {
            return res.status(404).render('category', { message: 'News not found' });
        }
        else {
            return res.status(200).render('category', {
                latestNews: resultLatestNews,
                trendingNews: resultTrendingNews,
                featuredNews: resultFeaturedNews,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getCategoryPage = getCategoryPage;
async function getUpdatePage(req, res) {
    try {
        const id = req.params.id;
        const isNewsExist = await news_services_1.default.getNewsById(id);
        if (!isNewsExist) {
            const news = await news_services_1.default.getNews();
            if (news.length === 0) {
                return res.status(404).render('get_news', {
                    message: 'News not found',
                    name: res.locals.name,
                    error: false,
                });
            }
            else {
                return res.status(404).render('get_news', {
                    message: 'News not found',
                    news: news,
                    name: res.locals.name,
                    error: false,
                });
            }
        }
        else {
            return res.status(200).render('update_news', {
                news: isNewsExist,
                message: false,
                name: res.locals.name,
                error: false,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            error: false,
        });
    }
}
exports.getUpdatePage = getUpdatePage;
async function subscribeNewsLetter(req, res) {
    try {
        const { email } = req.body;
        const newsLetter = await news_services_1.default.subscribeNewsLetter(email);
        if (!newsLetter) {
            return res.status(404).redirect('back');
        }
        else {
            return res.status(201).redirect('back');
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.subscribeNewsLetter = subscribeNewsLetter;
async function addComment(req, res) {
    try {
        const id = req.params.id;
        const { name, email, comment } = req.body;
        const news = await news_services_1.default.getNewsById(id);
        if (!news) {
            return res.status(404).redirect('/');
        }
        const commentDocument = {
            name: name,
            email: email,
            comment: comment,
        };
        const newComment = await news_services_1.default.addComment(id, commentDocument);
        if (!newComment) {
            return res.status(404).redirect('/getNewsByTitle' + news.title);
        }
        else {
            return res.status(201).redirect('/getNewsByTitle/' + news.title);
        }
    }
    catch (error) {
        return res.status(500).redirect(req.originalUrl);
    }
}
exports.addComment = addComment;
async function contactRequest(req, res) {
    try {
        const { name, email, message, subject } = req.body;
        const contactDetails = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };
        const trendingResult = await news_services_1.default.getTrendingNews();
        let trendingNews = [];
        for (let i = 0; i < trendingResult.length; i++) {
            // check date in DD-MM-YYYY format
            const trendingDate = new Date(trendingResult[i].date);
            const trendingDay = trendingDate.getDate();
            const trendingMonth = trendingDate.getMonth() + 1;
            const trendingYear = trendingDate.getFullYear();
            const newDate = trendingDay + '-' + trendingMonth + '-' + trendingYear;
            trendingNews.push({
                title: trendingResult[i].title,
                description: trendingResult[i].description,
                image: trendingResult[i].image,
                formattedDate: newDate,
                category: trendingResult[i].category,
                author: trendingResult[i].author,
            });
        }
        const trendingNews1 = trendingNews.slice(0, 5);
        const trendingNews2 = trendingNews.slice(5, 8);
        const result = await news_services_1.default.contactRequest(contactDetails);
        if (!result) {
            return res.status(404).render('contact', {
                message: 'something went wrong',
                trendingNews1: trendingNews1,
                trendingNews2: trendingNews2,
            });
        }
        else {
            return res.status(201).render('contact', {
                message: 'Message sent successfully',
                trendingNews1: trendingNews1,
                trendingNews2: trendingNews2,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.contactRequest = contactRequest;
//# sourceMappingURL=news.controllers.js.map