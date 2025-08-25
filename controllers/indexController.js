import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/query.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const getIndex = async (req, res) => {
    const posts = await db.getAllPosts('desc');
    res.render('index', { posts: posts });
};

export default { getIndex };
