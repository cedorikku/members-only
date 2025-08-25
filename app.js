import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/pool.js';
import expressSession from 'express-session';
import passport from './config/passport.js';
import connectPgSimple from 'connect-pg-simple';
import indexRouter from './routes/indexRouter.js';
import accountRouter from './routes/accountRouter.js';
import postRouter from './routes/postRouter.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Persistent Postgres Store
const pgSession = connectPgSimple(expressSession);
app.use(
    expressSession({
        store: new pgSession({
            pool: pool,
            tableName: 'session',
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    }),
);
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/post', postRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
