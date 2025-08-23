import pool from './pool.js';
import bcrypt from 'bcryptjs';

const getUserByUsername = async (username) => {
    const query = `
        SELECT username FROM users
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

const createUser = async (username, firstname, lastname, password) => {
    const hashedPassword = await bcrypt.hash(password, 15);
    const query = `
        INSERT INTO users (username, firstname, lastname, password)
        VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [username, firstname, lastname, hashedPassword]);
};

export default { getUserByUsername, getAllPosts, createUser };
