import { Passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from './query.js';
import bcrypt from 'bcryptjs';

const localPassport = new Passport();

/* NOTE: By default the local passport strategy assumes/expects the options, supposed first parameter,
 *       to be `username` and `password`. This can be changed to something else by providing a valid object.
 *       We use the default for this one.
 */
const verifyCallback = async (username, password, done) => {
    try {
        const user = await db.getUserByUsername(username);

        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

const strategy = new LocalStrategy(verifyCallback);

localPassport.use('local', strategy);

localPassport.serializeUser((user, done) => {
    done(null, user.id);
});

localPassport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default localPassport;
