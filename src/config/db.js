const {Pool} = require('pg');
// env
require('dotenv').config({path: 'variables.env'});
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'postgres',
    port: process.env.DB_PORT
})
module.exports = pool;