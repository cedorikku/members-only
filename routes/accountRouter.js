import { Router } from 'express';
import accountController from '../controllers/accountController.js';
import { preventAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.get('/login', preventAuthenticated, accountController.getLogin);
router.post('/login', preventAuthenticated, accountController.loginPost);
router.get('/logout', accountController.logout);
router.get('/sign-up', preventAuthenticated, accountController.getSignUp);
router.post('/sign-up', preventAuthenticated, accountController.signUpPost);

export default router;
