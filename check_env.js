import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
console.log('DATABASE_URL from process.env:', process.env.DATABASE_URL); 