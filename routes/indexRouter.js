import { Router } from 'express';
import indexController from '../controllers/indexController.js';
import { preventUnauthorized } from '../middlewares/auth.js';

const router = Router();

// Prevent members from accessing the endpoinT `/join`
const guestsOnly = (req, res, next) => {
    if (req.user.role !== 'guest') return res.redirect('/');
    next();
};

router.get('/', indexController.getIndex);
router.get(
    '/join',
    preventUnauthorized,
    guestsOnly,
    indexController.enterSecretGet,
);
router.post(
    '/join',
    preventUnauthorized,
    guestsOnly,
    indexController.enterSecretPost,
);
export default router;
