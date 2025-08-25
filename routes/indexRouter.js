import { Router } from 'express';
import indexController from '../controllers/indexController.js';

const router = Router();

router.get('/', indexController.getIndex);
router.get('/login', indexController.getLogin);
router.post('/login', indexController.loginPost);
router.get('/logout', indexController.logout);
router.get('/sign-up', indexController.getSignUp);
router.post('/sign-up', indexController.signUpPost);

export default router;
