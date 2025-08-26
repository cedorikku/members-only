import { Router } from 'express';
import indexController from '../controllers/indexController.js';
import { preventUnauthorized } from '../middlewares/auth.js';

const router = Router();

router.get('/', indexController.getIndex);
router.get('/join', preventUnauthorized, indexController.enterSecretGet);
router.post('/join', preventUnauthorized, indexController.enterSecretPost);
export default router;
