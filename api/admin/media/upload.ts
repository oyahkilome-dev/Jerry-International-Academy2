import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import { addMedia, addGalleryImage } from '../../../src/db.js';

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
    await runMiddleware(req, res, upload.single('file'));

    const file = (req as any).file;
    const body = (req as any).body || {};
    
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ success: false, message: 'Supabase is not configured on the server.' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const fileExt = file.originalname?.split('.').pop() || 'tmp';
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
    
    try {
        const isImage = file.mimetype.startsWith('image/');
        const type = isImage ? 'image' : 'video';
        
        // Add to media library
        addMedia({
          name: fileName,
          type: type,
          url: urlData.publicUrl,
          size: file.size,
          originalName: file.originalname
        });

        // Also add to gallery if it's an image
        if (isImage) {
            addGalleryImage({
                url: urlData.publicUrl,
                category: body.category || 'General'
            });
        }
    } catch (e) {
        console.error('Failed to add media to database', e);
        return res.status(500).json({ success: false, message: 'Upload succeeded but database insertion failed.' });
    }

    return res.status(200).json({ success: true, url: urlData.publicUrl });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
}
