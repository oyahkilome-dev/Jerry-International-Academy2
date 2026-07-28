const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const startStr = "app.delete('/api/admin/media/:id'";
const startIdx = content.indexOf(startStr);
let brackets = 0;
let endIdx = -1;
let started = false;
for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') {
        brackets++;
        started = true;
    } else if (content[i] === '}') {
        brackets--;
        if (started && brackets === 0) {
            endIdx = i + 1;
            break;
        }
    }
}

const targetCode = content.substring(startIdx, endIdx);

const replacementCode = `app.delete('/api/admin/media/:id', verifyToken, async (req, res) => {
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
          const searchPart = \`/public/\${bucketName}/\`;
          const index = urlObj.pathname.indexOf(searchPart);
          
          if (index !== -1) {
              filePath = urlObj.pathname.substring(index + searchPart.length);
          } else {
              // Fallback extraction
              const parts = urlObj.pathname.split(\`/\${bucketName}/\`);
              if (parts.length > 1) {
                  filePath = parts.slice(1).join(\`/\${bucketName}/\`);
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
  }`;

content = content.replace(targetCode, replacementCode);
fs.writeFileSync('server.ts', content);
console.log('Delete logic updated');
