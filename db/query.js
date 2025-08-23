import pool from './pool.js';

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

export default { getAllPosts };
