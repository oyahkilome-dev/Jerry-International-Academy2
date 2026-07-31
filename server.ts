import { Resend } from 'resend';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import db, { getSiteContent, setSiteContent, addContactMessage, getContactMessages, addGalleryImage, getGalleryImages, deleteGalleryImage, addMedia, getMedia, deleteMedia } from './src/db.js';
import * as dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

// ESM / CJS compat
let _dirname = process.cwd();
try {
  _dirname = path.dirname(fileURLToPath(import.meta.url));
} catch (e) {}


const ENCRYPTION_KEY = crypto.scryptSync(process.env.JWT_SECRET || 'fallback_secret_key', 'salt', 32);
const ALGORITHM = 'aes-256-gcm';

function encrypt(text) {
  if (!text) return text;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return iv.toString('hex') + ':' + authTag + ':' + encrypted;
}

function decrypt(text) {
  if (!text) return text;
  try {
    const parts = text.split(':');
    if (parts.length !== 3) return text; // might be unencrypted legacy
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = Buffer.from(parts[2], 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText).toString('utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption failed', err);
    return text;
  }
}

async function startServer() {
  

const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());


  function getSupabaseSettings() {
    const settings = getSiteContent('supabase_settings') || {};
    return {
      url: settings.url || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
      anonKey: settings.anonKey || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '',
      serviceRoleKey: decrypt(settings.serviceRoleKey) || process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      bucket: settings.bucket || 'media'
    };
  }

  function getSupabaseClient() {
    const { url, anonKey, serviceRoleKey } = getSupabaseSettings();
    let key = serviceRoleKey || anonKey;
    if (key && !key.startsWith('ey')) {
      key = anonKey;
    }
    if (!url || !key) return null;
    return createClient(url, key);
  }





  // API Routes

  app.get('/api/health', (req, res) => {
    console.log('ENV SUPABASE_URL:', process.env.SUPABASE_URL);
    console.log('ENV VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
    console.log('ENV SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'exists' : 'missing');
    res.json({ status: 'ok', url: process.env.SUPABASE_URL, viteUrl: process.env.VITE_SUPABASE_URL, key: !!process.env.SUPABASE_SERVICE_ROLE_KEY });
  });

  // Admin Auth Routes
  // Hash of 'Micheal@22'
  const ADMIN_PASSWORD_HASH = bcrypt.hashSync('Micheal@22', 10);
  const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    if (bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('admin_token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      return res.json({ success: true, token });
    }
    
    return res.status(401).json({ success: false, message: 'Incorrect password.' });
  });

  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('admin_token', { path: '/' });
    res.json({ success: true });
  });

  const verifyToken = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false });
    try {
      jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ success: false });
    }
  };

  app.get('/api/admin/verify', verifyToken, (req, res) => {
    res.json({ success: true });
  });


  app.get('/api/admin/supabase-settings', verifyToken, (req, res) => {
    const settings = getSupabaseSettings();
    res.json({
      url: settings.url,
      anonKey: settings.anonKey,
      hasServiceRoleKey: !!settings.serviceRoleKey,
      bucket: settings.bucket
    });
  });

  app.post('/api/admin/supabase-settings', verifyToken, (req, res) => {
    const { url, anonKey, serviceRoleKey, bucket } = req.body;
    const currentSettings = getSiteContent('supabase_settings') || {};
    
    setSiteContent('supabase_settings', {
      url: url || currentSettings.url,
      anonKey: anonKey || currentSettings.anonKey,
      serviceRoleKey: serviceRoleKey !== undefined ? (serviceRoleKey ? encrypt(serviceRoleKey) : '') : currentSettings.serviceRoleKey,
      bucket: bucket || currentSettings.bucket || 'media'
    });
    res.json({ success: true });
  });

  app.post('/api/admin/supabase-test', verifyToken, async (req, res) => {
    try {
      const { url, anonKey, serviceRoleKey, bucket } = req.body;
      const testUrl = url || '';
      const testKey = serviceRoleKey || getSupabaseSettings().serviceRoleKey || anonKey || '';
      if (!testUrl || !testKey) {
        return res.json({ success: false, message: 'Missing URL or Key' });
      }
      const testClient = createClient(testUrl, testKey);
      const testBucket = bucket || 'media';
      
      const { data, error } = await testClient.storage.getBucket(testBucket);
      if (error) {
        return res.json({ success: false, message: error.message || 'Bucket error' });
      }
      return res.json({ success: true, message: 'Connection successful. Bucket exists.' });
    } catch(err) {
      return res.json({ success: false, message: err.message || 'Connection failed' });
    }
  });


  // Content Routes (Public Read)
  app.get('/api/content/:page', (req, res) => {
    const data = getSiteContent(req.params.page);
    res.json(data || {});
  });

  // Content Routes (Admin Write)
  app.post('/api/content/:page', verifyToken, (req, res) => {
    setSiteContent(req.params.page, req.body);
    res.json({ success: true });
  });

  // Contact Messages
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      }

      addContactMessage(req.body);

      // Send email using Resend
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        try {
          await resend.emails.send({
            from: 'onboarding@resend.dev', // Default testing email from Resend, update if custom domain is verified
            to: 'oyahkilome@gmail.com',
            subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `
          });
          console.log('Email sent successfully to oyahkilome@gmail.com');
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr);
          // Don't fail the request if just the email fails, or maybe we should?
          // For now, we just log it, but the DB insertion succeeded.
        }
      } else {
        console.warn('RESEND_API_KEY is not set. Contact form email was not sent.');
      }

      res.json({ success: true });
    } catch(err) {
      console.error('Contact Form Error:', err);
      res.status(500).json({ success: false, message: 'An error occurred while submitting your message.' });
    }
  });

  app.get('/api/admin/contact', verifyToken, (req, res) => {
    res.json(getContactMessages());
  });

  app.get('/api/gallery', async (req, res) => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          return res.json(data);
        }
      } catch(e) {
        console.error("Error fetching gallery from Supabase", e);
      }
    }
    // Fallback to SQLite
    res.json(getGalleryImages());
  });

  app.post('/api/admin/gallery', verifyToken, (req, res) => {
    addGalleryImage(req.body);
    res.json({ success: true });
  });

  app.delete('/api/admin/gallery/:id', verifyToken, (req, res) => {
    deleteGalleryImage(Number(req.params.id));
    res.json({ success: true });
  });

  // Media API
  const upload = multer({ storage: multer.memoryStorage() });

  app.get('/api/media', (req, res) => {
    res.json(getMedia());
  });

  app.post('/api/admin/media/upload', verifyToken, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const supabase = getSupabaseClient();
      const settings = getSupabaseSettings();
      const bucketName = settings.bucket || 'media';
      if (!supabase) {
        return res.status(500).json({ success: false, message: 'Supabase is not configured on the server.' });
      }

      const file = req.file;
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucketName).upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const isImage = file.mimetype.startsWith('image/');
      const type = isImage ? 'image' : 'video';

      addMedia({
        name: fileName,
        type: type,
        url: publicUrl,
        size: file.size,
        originalName: file.originalname
      });
      if (isImage) {
        try {
          addGalleryImage({ url: publicUrl, category: req.body.category || 'General' });
        } catch(e) {
          console.error("Failed to add to gallery_images", e);
        }
      }
      res.json({ success: true, url: publicUrl });
    } catch (err: any) {
      console.error('Upload Error:', err);
      res.status(500).json({ success: false, message: err.message || 'Upload failed' });
    }
  });

  app.post('/api/admin/media', verifyToken, (req, res) => {
    try {
      addMedia(req.body);
      const isImage = req.body.type === 'image' || (req.body.url && req.body.url.match(/\.(jpg|jpeg|png|gif|webp)$/i));
      if (isImage) {
        addGalleryImage({ url: req.body.url, category: req.body.category || 'General' });
      }
      res.json({ success: true });
    } catch(err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  });

    app.delete('/api/admin/media/:id', verifyToken, async (req, res) => {
    try {
      const mediaId = Number(req.params.id);
      
      // 1. Retrieve the exact file URL stored in the database
      const mediaItems = getMedia();
      const itemToDelete: any = mediaItems.find((m: any) => m.id === mediaId);
      
      if (!itemToDelete) {
         console.log('[DELETE] Error: Item not found in database.');
         return res.status(404).json({ success: false, message: 'Item not found' });
      }

      console.log('--- DEBUG DELETE START ---');
      console.log('1. Database record ID:', mediaId);
      console.log('2. Stored file URL:', itemToDelete.url);
      
      const settings = getSupabaseSettings();
      const bucketName = settings.bucket || 'media';
      console.log('4. Bucket name:', bucketName);
      
      // 6. Confirm using SUPABASE_SERVICE_ROLE_KEY
      const serviceRoleKey = settings.serviceRoleKey; 
      if (!serviceRoleKey) {
          console.error('[DELETE] Critical Error: SUPABASE_SERVICE_ROLE_KEY is missing! Deletions require the service role key.');
          return res.status(500).json({ success: false, message: 'Service Role Key is missing. Cannot securely delete from storage.' });
      }
      console.log('6. Confirmed: Backend is using SUPABASE_SERVICE_ROLE_KEY for deletion (key prefix: ' + serviceRoleKey.substring(0, 10) + '...)');
      
      // Create a dedicated admin client with the service role key to guarantee permissions
      const adminSupabase = createClient(settings.url, serviceRoleKey);
      
      let filePath = '';
      let fileDeleted = false;
      
      if (itemToDelete.url.includes('supabase.co')) {
          const urlObj = new URL(itemToDelete.url);
          
          // 2. Extract the correct storage object path from the public URL
          // The public URL format: /storage/v1/object/public/{bucketName}/{filePath}
          const searchPart = `/public/${bucketName}/`;
          const index = urlObj.pathname.indexOf(searchPart);
          
          if (index !== -1) {
              filePath = urlObj.pathname.substring(index + searchPart.length);
          } else {
              // Fallback extraction
              const parts = urlObj.pathname.split(`/${bucketName}/`);
              if (parts.length > 1) {
                  filePath = parts.slice(1).join(`/${bucketName}/`);
              }
          }
          
          if (!filePath) {
              console.error('Failed to extract file path from URL');
              return res.status(400).json({ success: false, message: 'Invalid URL format' });
          }
          
          // 3. Log Extracted storage path
          console.log('3. Extracted storage path:', filePath);
          
          // 4. Verify that the extracted path exactly matches the object path inside the bucket.
          console.log('Verifying file exists before deletion...');
          // Check if file exists by trying to create a signed URL (or list it)
          // Actually, listing is better to verify existence. We can list the specific file.
          const folderPath = filePath.includes('/') ? filePath.substring(0, filePath.lastIndexOf('/')) : '';
          const fileName = filePath.includes('/') ? filePath.substring(filePath.lastIndexOf('/') + 1) : filePath;
          
          const { data: listData, error: listError } = await adminSupabase.storage.from(bucketName).list(folderPath, {
              search: fileName
          });
          
          if (listError) {
              console.error('Failed to verify file existence:', listError);
              return res.status(500).json({ success: false, message: 'Failed to verify file existence: ' + listError.message });
          }
          
          const fileExists = listData && listData.some(f => f.name === fileName);
          console.log('File existence before deletion check:', fileExists);
          
          if (!fileExists) {
              console.warn('File already missing from storage bucket. Will proceed with DB cleanup.');
          } else {
              // Perform the delete
              const { data, error } = await adminSupabase.storage.from(bucketName).remove([filePath]);
              
              // 3. Log Result returned by remove()
              console.log('5. Result returned by remove():', { data, error });
              
              // 5. If remove() returns an error, print the complete error object
              if (error) {
                  console.error('COMPLETE ERROR OBJECT from remove():', JSON.stringify(error, null, 2));
                  console.error(error);
                  return res.status(500).json({ success: false, message: 'Failed to delete file from storage' });
              }
              
              // 7. After deleting, verify that the object no longer exists in the bucket
              console.log('Verifying file is gone from bucket...');
              const { data: verifyData, error: verifyError } = await adminSupabase.storage.from(bucketName).list(folderPath, {
                  search: fileName
              });
              
              const stillExists = verifyData && verifyData.some(f => f.name === fileName);
              if (stillExists) {
                  console.error('File still exists in bucket after remove() was called!');
                  return res.status(500).json({ success: false, message: 'File deletion verification failed. File still exists.' });
              } else {
                  console.log('7. Verified: Object no longer exists in the bucket.');
              }
          }
      }
      
      // Delete from database
      try {
          deleteMedia(mediaId);
          console.log('Database record deleted successfully.');
      } catch (dbErr: any) {
          console.error('Database deletion failed:', dbErr);
          return res.status(500).json({ success: false, message: 'Failed to delete record from database: ' + dbErr.message });
      }
      
      // 8. Do not report success until confirmed from both.
      console.log('--- DEBUG DELETE END ---');
      res.json({ success: true, message: 'Image deleted successfully.' });
      
    } catch(err: any) {
      console.error('Final failure:', err);
      res.status(500).json({ success: false, message: err.message || 'Unknown error occurred' });
    }
  });

  app.put('/api/admin/media/:id', verifyToken, (req, res) => {
    try {
      // Inline update since renameMedia is not exported from db.ts
      db.prepare('UPDATE media SET originalName = ?, name = ? WHERE id = ?').run(req.body.name, req.body.name, Number(req.params.id));
      res.json({ success: true });
    } catch(err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  });

  // On Vercel, we rely on Vercel's routing for static files and frontend
  if (!process.env.VERCEL) {
    if (process.env.NODE_ENV !== "production") {
      const vitePath = 'vite';
      const viteModule = await import(vitePath);
      const vite = await viteModule.createServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  // On Vercel, we export the app instead of listening
  if (process.env.VERCEL) {
    return app;
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

const appPromise = startServer();
export default async function (req, res) {
  const app = await appPromise;
  return app(req, res);
}
