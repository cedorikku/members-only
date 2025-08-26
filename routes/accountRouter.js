import { Router } from 'express';
import accountController from '../controllers/accountController.js';
import { preventAuthenticated } from '../middlewares/auth.js';
import {
    createUserValidator,
    loginUserValidator,
} from '../middlewares/validate/user.js';

const router = Router();

router.get('/login', preventAuthenticated, accountController.getLogin);
router.post(
    '/login',
    preventAuthenticated,
    loginUserValidator,
    accountController.loginPost,
);
router.get('/logout', accountController.logout);
router.get('/sign-up', preventAuthenticated, accountController.getSignUp);
router.post(
    '/sign-up',
    preventAuthenticated,
    createUserValidator,
    accountController.signUpPost,
);

export default router;
