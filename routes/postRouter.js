import { Router } from 'express';
import postController from '../controllers/postController.js';

const router = new Router();

router.get('/', (req, res) => {
    res.send('Unimplemented');
});

router.get('/create', postController.createPostGet);
router.post('/create', postController.createPostPost);

export default router;
