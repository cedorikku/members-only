import db from '../config/query.js';

const getIndex = async (req, res) => {
    const posts = await db.getPosts();
    res.render('index', { posts: posts });
};

const enterSecretGet = async (req, res) => {
    res.render('join');
};

const enterSecretPost = async (req, res) => {
    const SECRET = process.env.SECRET_CODE || 'unset';
    const key = req.body.key;

    if (SECRET === key) {
        await db.updateRole(req.user.username, 'member');
    } else {
        return res.render('join', {
            errorMessage: 'Incorrect code. Try again.',
        });
    }

    res.redirect('/');
};

export default { getIndex, enterSecretGet, enterSecretPost };
