import { Router } from 'express';

import * as adminControllers from '../controllers/admin.controllers';
import * as requestValidator from '../utils/validators/request.validator';
import { authenticateAdmin } from '../middlewares/authenticate.admin';

const router = Router();


router.post('/register', requestValidator.registerValidator, adminControllers.register);

router.post('/login', requestValidator.loginValidator, adminControllers.loginAdmin);

router.get('/getLogin', adminControllers.getLoginPage);

router.get('/logout', adminControllers.logoutAdmin);

router.get('/getCreateNews', authenticateAdmin, adminControllers.getCreateNewsPage);

router.get('/getNews', authenticateAdmin, adminControllers.getNewsPage);

router.get('/getNewsLetters', authenticateAdmin, adminControllers.getNewsLetterPage);

router.get('/getContacts', authenticateAdmin, adminControllers.getContacts);

export default router;