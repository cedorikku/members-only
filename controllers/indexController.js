import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/query.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const getIndex = async (req, res) => {
    const posts = await db.getAllPosts('desc');
    res.render('index', { posts: posts });
};

const enterSecretGet = async (req, res) => {
    res.render('join');
};

const enterSecretPost = async (req, res) => {
    const SECRET = process.env.SECRET || 'unset';
    const key = req.body.key;

    if (SECRET === key) {
        await db.updateRole(req.user.username, 'member');
    } else {
        return res.render('join', { errorMessage: 'Incorrect code. Try again.' });
    }

    res.redirect('/');
};

export default { getIndex, enterSecretGet, enterSecretPost };
