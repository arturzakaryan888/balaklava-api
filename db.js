/*
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'root',
  port: 5432,
  database: 'balaklava'
  })

*/

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();


module.exports = client
