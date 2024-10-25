import pg from 'pg'

import { 
    DB_DATABASE, 
    DB_HOST, 
    DB_PASSWORD, 
    DB_USER, 
    DB_PORT} from './config.js'

export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Database connected successfully', res.rows);
    }
});

