import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const getIndex = (req, res) => {
    res.render('index');
};

export default { getIndex };
