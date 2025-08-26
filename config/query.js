import pool from './pool.js';
import bcrypt from 'bcryptjs';

const getUserById = async (id) => {
    const query = `
        SELECT * FROM users
        WHERE id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const getUserByUsername = async (username) => {
    const query = `
        SELECT * FROM users
        WHERE username = $1
    `;
    const { rows } = await pool.query(query, [username]);
    return rows[0];
};

const getAllPosts = async (order = 'desc') => {
    // TODO: Add pagination
    const query = `
        SELECT p.title, p.content, p.created_at, u.username, u.firstname, u.lastname 
        FROM posts p JOIN users u ON p.author_id = u.id
        ORDER BY p.created_at ${order}
    `;
    const { rows } = await pool.query(query, []);

    return rows;
};

const createUser = async (
    username,
    firstname,
    lastname,
    password,
    role = 'guest',
) => {
    const hashedPassword = await bcrypt.hash(password, 15);
    const query = `
        INSERT INTO users (username, firstname, lastname, password, role)
        VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [
        username,
        firstname,
        lastname,
        hashedPassword,
        role,
    ]);
};

const createPost = async (title, content, authorId) => {
    const query = `
        INSERT INTO posts (title, content, created_at, author_id)
        VALUES ($1, $2, $3, $4)
    `;
    const now = new Date();
    await pool.query(query, [title, content, now, authorId]);
};

const updateRole = async (username, role) => {
    const query = `
        UPDATE users
        SET role = $2
        WHERE username = $1
    `;
    await pool.query(query, [username, role]);
};

export default {
    getUserById,
    getUserByUsername,
    getAllPosts,
    createUser,
    createPost,
    updateRole,
};
