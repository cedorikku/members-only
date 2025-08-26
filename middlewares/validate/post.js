import { body } from 'express-validator';

const titleLimit = Object.freeze({
    MIN: 3,
    MAX: 50,
});

const contentLimit = Object.freeze({
    MIN: 0,
    MAX: 400,
});

export const validatePost = [
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
