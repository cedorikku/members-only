import { Router } from 'express';
import postController from '../controllers/postController.js';
import { preventUnauthorized } from '../middlewares/auth.js';
import { validatePost } from '../middlewares/validate/post.js';

const router = new Router();

router.use(preventUnauthorized);

router.get('/create', postController.createPostGet);
router.post('/create', validatePost, postController.createPostPost);

export default router;
