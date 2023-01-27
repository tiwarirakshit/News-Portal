import { Router } from 'express';

import * as adminControllers from '../controllers/admin.controllers';
import * as requestValidator from '../utils/validators/request.validator';

const router = Router();


router.post('/register', requestValidator.registerValidator, adminControllers.register);

router.post('/login', requestValidator.loginValidator, adminControllers.loginAdmin);

router.get('/getLogin', adminControllers.getLoginPage);

router.get('/logout', adminControllers.logoutAdmin);

router.get('/getCreateNews', adminControllers.getCreateNewsPage);

router.get('/getNews', adminControllers.getNewsPage);

router.get('/getNewsLetters', adminControllers.getNewsLetterPage);

export default router;