const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'balaklava2033',
  connectionString: process.env.DATABASE_URL,
  ssl: true
  })


module.exports = pool
