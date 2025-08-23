import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db/query.js';
import { body, validationResult } from 'express-validator';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const getIndex = async (req, res) => {
    const posts = await db.getAllPosts('desc');
    res.render('index', { posts: posts });
};

const getSignUp = async (req, res) => {
    res.render('sign-up');
};

const alphaErr = 'must only contain letters.';
const usernameErr = 'can only contain alphanumeric characters and underscores';
const lengthErr = (min, max) => {
    if (min && max) {
        return `must be between ${min} and ${max} characters.`;
    } else if (min) {
        return `must be at least ${min} characters.`;
    } else {
        throw new Error('Length of min or with max not provided.');
    }
};

const validateUser = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage(`Username ${lengthErr(3, 50)}`)
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(`Username ${usernameErr}`)
        .custom(async (username) => {
            const existingUser = await db.getUserByUsername(username);
            if (existingUser) {
                throw new Error('Username already in use.');
            }
        }),
    body('firstname')
        .trim()
        .isAlpha()
        .withMessage(`First name ${alphaErr}`)
        .isLength({ min: 2, max: 255 })
        .withMessage(`First name ${lengthErr(2, 255)}`),
    body('lastname')
        .trim()
        .isAlpha()
        .withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 2, max: 255 })
        .withMessage(`Last name ${lengthErr(2, 255)}`),
    body('password')
        .trim()
        .isLength({ min: 8, max: 255 })
        .withMessage(`Password ${lengthErr(8, 255)}`),
];

const signUpPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('sign-up', {
                errors: errors.mapped(),
            });
        }

        const { username, firstname, lastname, password } = req.body;
        db.createUser(username, firstname, lastname, password);
        res.redirect('/login');
    },
];

export default { getIndex, getSignUp, signUpPost };
