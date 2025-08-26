import db from '../config/query.js';
import { validationResult } from 'express-validator';

const createPostGet = (req, res) => {
    res.render('post/create', { errors: null, previous: null });
};

const createPostPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('post/create', {
            errors: errors.mapped(),
            previous: req.body,
        });
    }

    const { title, content } = req.body;
    const userId = req.user.id;
    if (!userId) return res.status(401).redirect('/account/login');

    await db.createPost(title, content, userId);
    res.status(201).redirect('/');
};

// TODO : Delete a post when user is 'admin'

export default { createPostGet, createPostPost };
