import db from '../config/query.js';
import { body, validationResult } from 'express-validator';
import passport from '../config/passport.js';

const preventAuthenticated = (req, res, next) => {
    if (req.user) return res.redirect('/');
    next();
};

const getLogin = [
    preventAuthenticated,
    async (req, res) => {
        res.render('login');
    },
];

const getSignUp = [
    preventAuthenticated,
    async (req, res) => {
        res.render('sign-up');
    },
];

const alphaErr = 'must only contain letters.';
const lengthErr = (min, max) => {
    if (min && max) {
        return `must be between ${min} and ${max} characters.`;
    } else if (min) {
        return `must be at least ${min} characters.`;
    } else {
        throw new Error('Length of min or with max not provided.');
    }
};

const validateUserSignUp = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage(`Username ${lengthErr(3, 50)}`)
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            `Username can only contain alphanumeric characters and underscores`,
        )
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
        .isLength({ min: 8, max: 255 })
        .withMessage(`Password ${lengthErr(8, 255)}`),
];

const signUpPost = [
    validateUserSignUp,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('sign-up', {
                errors: errors.mapped(),
            });
        }

        const { username, firstname, lastname, password } = req.body;
        db.createUser(username, firstname, lastname, password);
        res.redirect('/account/login');
    },
];

const validateUserLogin = [
    body('username').trim().notEmpty().withMessage('Username is required.'),
    body('password').trim().notEmpty().withMessage('Password is required.'),
];

const loginPost = [
    validateUserLogin,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('login', {
                errors: errors.mapped(),
            });
        }
        passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).render('login', {
                    loginError: 'Invalid login credentials',
                });
            }

            req.login(user, (err) => {
                if (err) return next(err);
                res.redirect('/');
            });
        })(req, res, next);
    },
];

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });

    res.redirect('/');
};

export default { getSignUp, signUpPost, getLogin, loginPost, logout };
