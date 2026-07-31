import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        return res.status(500).json([]); // Fallback to empty array
      }

      return res.status(200).json(data || []);
    } catch (e) {
      console.error('Failed to fetch from Supabase', e);
      return res.status(500).json([]);
    }
  } else {
    // If no Supabase, fallback to empty array (SQLite is not available on Vercel)
    return res.status(200).json([]);
  }
}
