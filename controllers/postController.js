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

const deletePost = async (req, res) => {
    const id = req.params.id;
    const deletedByUserId = req.user.id;

    await db.deletePost(id, deletedByUserId);
    res.status(204).redirect('/');
};

const getDeletedPosts = async (req, res) => {
    const posts = await db.getDeletedPosts();
    res.render('post/deleted', { posts: posts });
};

export default { createPostGet, createPostPost, deletePost, getDeletedPosts };
