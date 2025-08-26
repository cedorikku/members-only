import { Client } from 'pg';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

const seedUsers = async (client) => {
    const USERS_TABLE = `
        DROP TYPE IF EXISTS user_role CASCADE;
        CREATE TYPE user_role AS ENUM ('guest', 'member', 'admin');
        
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username varchar(50) NOT NULL UNIQUE,
        firstname varchar(255) NOT NULL,
        lastname varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        role user_role NOT NULL DEFAULT 'guest');
    `;
    await client.query(USERS_TABLE, []);

    const INSERT_USERS = `INSERT INTO users (username, firstname, lastname, password, role) VALUES ($1, $2, $3, $4, $5)`;
    const saltLevel = 15;
    const hashedPassword = bcrypt.hashSync('secret123', saltLevel);
    await client.query(INSERT_USERS, [
        'johndoe',
        'John',
        'Doe',
        hashedPassword,
        'guest',
    ]);

    console.log('A user has been created.');
};

const seedPosts = async (client) => {
    const POSTS_TABLE = `CREATE TABLE IF NOT EXISTS posts (
        id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title varchar(50) NOT NULL,
        content text NOT NULL CHECK (char_length(content) <= 400),
        created_at timestamp NOT NULL,
        author_id integer REFERENCES users (id)
    )`;
    /*  NOTE: author_id could also be a foreign key with this syntax
     * FOREIGN KEY (author_id) REFERENCES users (id)
     */
    await client.query(POSTS_TABLE, []);

    const mockContent =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis augue quis tellus dictum, porta pulvinar lacus eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Proin a ligula est. Donec quis convallis quam, vel rhoncus orci. Donec pulvinar mauris non felis laoreet, sed lacinia nisl ornare.';
    const now = new Date();
    const authorId = 1;

    const posts = [
        ['Generic aa title', mockContent, now, authorId],
        ['Today I Learned...', mockContent, now, authorId],
        ['GUESS WHAT I FOUND', mockContent, now, authorId],
    ];

    const values = [];
    const placeholders = posts
        .map((row, index) => {
            const offset = row.length * index;
            values.push(...row);
            return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
        })
        .join(', ');

    const INSERT_POSTS = `INSERT INTO posts (title, content, created_at, author_id) VALUES ${placeholders}`;
    await client.query(INSERT_POSTS, values);

    console.log('A post has been created.');
};

async function main() {
    const client = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT,
    });

    console.log('Seeding...');
    await client.connect();
    await seedUsers(client);
    await seedPosts(client);
    await client.end();
    console.log('done.');
}

main();
