const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'root',
  port: 5432,
  database: 'balaklava'
  })


const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  user: 'postgres',
  host: 'localhost',
  password: 'root',
  port: 5432,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

module.exports = client
