import { Router } from 'express';
import multer from 'multer';

import * as newsController from '../controllers/news.controllers';
// import { authenticateAdmin } from '../middlewares/authenticate.admin';
import * as requestValidator from '../utils/validators/request.validator';
import { storage } from '../middlewares/multer.middleware';
import { multerFileTypeFilterForImage, MULTER_UPLOAD_SIZE_LIMIT } from '../utils/multer-utils';

const router = Router();

const upload = multer({ storage: storage, limits: { fileSize: MULTER_UPLOAD_SIZE_LIMIT, files: 1 }, fileFilter: multerFileTypeFilterForImage });

router.post('/createNews', upload.array('image', 5), requestValidator.createNews, newsController.createNews);

router.get('/getNewsByTitle/:title', newsController.getNewsByTitle);

router.get('/getNews', newsController.getNews);

router.get('/makeTrending/:id', newsController.makeTrending);

router.get('/makeFeatured/:id', newsController.makeFeatured);

router.get('/makeLatest/:id', newsController.makeLatest);

router.get('/getNewsById/:id', newsController.getNewsById);

router.get('/getTrendingNews', newsController.getTrendingNews);

router.get('/getFeaturedNews', newsController.getFeaturedNews);

router.get('/getLatestNews', newsController.getLatestNews);

router.get('/deleteNews/:id', newsController.deleteNews);

router.get('/getNewsUpdatePage/:id', newsController.getNewUpdatePage);

router.post('/updateNews/:id', requestValidator.updateNews, upload.array('image', 5), newsController.updateNews);

// router for pages
router.get('/', newsController.getHomePage);

router.get('/getContact', newsController.getContactPage);

router.get('/category', newsController.getCategoryPage);

router.post('/subscribe', newsController.subscribeNewsLetter);

router.post('/addComment/:id', newsController.addComment);

router.post('/contact', newsController.contactRequest);

export default router;