import { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Optional: Verify admin token from Authorization header if needed
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return res.status(401).json({ success: false, message: 'Unauthorized' });
    // }
    // const token = authHeader.split(' ')[1];
    // jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    
    // Parse the multipart/form-data request
    await runMiddleware(req, res, upload.single('file'));

    // The req object is modified by multer to contain req.file
    const file = (req as any).file;
    
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ success: false, message: 'Supabase is not configured on the server.' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ success: false, message: 'Upload to Supabase failed: ' + error.message });
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl;

    return res.status(200).json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
}
