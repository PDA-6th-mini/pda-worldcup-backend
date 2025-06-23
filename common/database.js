const mariadb = require('mariadb');
const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = require('./envConstants');

const pool = mariadb.createPool({
    connectionLimit: 30,
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = pool;
