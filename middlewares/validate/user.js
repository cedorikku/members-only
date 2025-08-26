import { body } from 'express-validator';
import db from '../../config/query.js';

const alphaErr = 'must only contain letters.';
const lengthErr = (min, max) => {
    if (min && max) {
        return `must be between ${min} and ${max} characters`;
    } else if (min) {
        return `must be at least ${min} characters`;
    } else {
        throw new Error('Length of min or with max not provided.');
    }
};

export const createUserValidator = [
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
                throw new Error('Username already in use');
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
    body('confirmPassword')
        .notEmpty()
        .withMessage(`Please confirm your password`)
        .custom((confirmPassword, { req }) => {
            return confirmPassword === req.body.password;
        })
        .withMessage('Password does not match'),
];

export const loginUserValidator = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
];
