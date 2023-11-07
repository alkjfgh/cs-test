const mysql = require('mysql2/promise');
const config = require('../db/db_config.json');

async function getConnection() {
    const pool = await mysql.createPool(config);
    return pool.getConnection();
}

module.exports = getConnection;