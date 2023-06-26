const {Pool} = require('pg');
require('dotenv').config();
// const pool = new Pool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '123543',
//     database: 'postgres',
//     port: '5432'
// })
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    })
module.exports = pool;