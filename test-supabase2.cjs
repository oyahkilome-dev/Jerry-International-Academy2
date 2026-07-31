const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.from('media').select('*').limit(1);
  console.log('Postgres media:', error ? error.message : 'Success');
}
run();
