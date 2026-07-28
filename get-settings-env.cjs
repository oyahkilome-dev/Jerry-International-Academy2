const dotenv = require('dotenv');
dotenv.config();

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('url:', url);
console.log('anonKey:', anonKey?.substring(0, 10));
console.log('serviceRoleKey:', serviceRoleKey?.substring(0, 10));

