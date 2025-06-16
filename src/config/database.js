import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.connect()
  .then(client => {
    console.log('Neon PostgreSQL database connected successfully');
    client.release();
  })
  .catch(err => {
    console.error('Error connecting to the Neon PostgreSQL database:', err);
  });

// Create a direct connection for transactions
const sql = neon(process.env.DIRECT_URL);

export { pool, sql }; 