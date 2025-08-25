import db from '../config/query.js';
import { body, validationResult } from 'express-validator';

const preventUnauthorized = (req, res, next) => {
    if (!req.user) return res.redirect('/account/login');
    next();
};

const createPostGet = [
    preventUnauthorized,
    (req, res) => {
        res.render('post/create');
    },
];

const titleLimit = Object.freeze({
    MIN: 3,
    MAX: 50,
});

const contentLimit = Object.freeze({
    MIN: 0,
    MAX: 400,
});

const validatePost = [
    body('title')
        .isLength({ min: titleLimit.MIN, max: titleLimit.MAX })
        .withMessage(
            `The title is required to be at least ${titleLimit.MIN} characters (${titleLimit.MAX} max)`,
        ),
    body('content')
        .isLength({ min: contentLimit.MIN, max: contentLimit.MAX })
        .withMessage(
            `Content can only have ${contentLimit.MAX} characters at most`,
        ),
];

const createPostPost = [
    preventUnauthorized,
    validatePost,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('post/create', { errors: errors.mapped() });
        }

        const { title, content } = req.body;
        const userId = req.user.id;
        if (!userId) return res.status(401).redirect('/account/login');

        await db.createPost(title, content, userId);
        res.status(201).redirect('/');
    },
];

// TODO : Delete a post when user is 'admin'

export default { createPostGet, createPostPost };
