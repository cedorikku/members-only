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
        .withMessage((value) => {
            if (value.length < titleLimit.MIN) {
                return `Your title is too short. It must be at least ${titleLimit.MIN} characters ${value.length} (${value.length}/${titleLimit.MIN}).`;
            }
            if (value.length > titleLimit.MAX) {
                return `Your title is too long. The maximum allowed is ${titleLimit.MAX} characters (${value.length}/${titleLimit.MAX}).`;
            }
            return `Your title must be between ${titleLimit.MIN} and ${titleLimit.MAX} characters (${value.length}/${titleLimit.MAX}).`;
        }),
    body('content')
        .isLength({ min: contentLimit.MIN, max: contentLimit.MAX })
        .withMessage(
            `Content can only have ${contentLimit.MAX} characters at most`,
        ),
];
