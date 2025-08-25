import { Router } from 'express';
import postController from '../controllers/postController.js';
import { preventUnauthorized } from '../middlewares/auth.js';

const router = new Router();

router.use(preventUnauthorized);

router.get('/create', postController.createPostGet);
router.post('/create', postController.createPostPost);

export default router;
