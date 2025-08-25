import { Router } from 'express';
import accountController from '../controllers/accountController.js';

const router = Router();

router.get('/', (req, res) => res.send('Unimplemented'));
router.get('/login', accountController.getLogin);
router.post('/login', accountController.loginPost);
router.get('/logout', accountController.logout);
router.get('/sign-up', accountController.getSignUp);
router.post('/sign-up', accountController.signUpPost);

export default router;
