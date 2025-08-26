import db from '../config/query.js';
import passport from '../config/passport.js';
import { validationResult } from 'express-validator';

const getSignUp = async (req, res) => {
    res.render('account/sign-up');
};

const signUpPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('account/sign-up', {
            errors: errors.mapped(),
        });
    }

    const { username, firstname, lastname, password } = req.body;
    db.createUser(username, firstname, lastname, password);
    res.redirect('/account/login');
};

const getLogin = async (req, res) => {
    res.render('account/login');
};

const loginPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('account/login', {
            errors: errors.mapped(),
        });
    }
    passport.authenticate('local', (err, user) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).render('account/login', {
                loginError: 'Invalid login credentials',
            });
        }

        req.login(user, (err) => {
            if (err) return next(err);
            res.redirect('/');
        });
    })(req, res, next);
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });

    res.redirect('/');
};

export default { getSignUp, signUpPost, getLogin, loginPost, logout };
