const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.from('gallery_images').select('*').limit(1);
  console.log('Postgres gallery_images:', error ? error.message : 'Success');
}
run();
