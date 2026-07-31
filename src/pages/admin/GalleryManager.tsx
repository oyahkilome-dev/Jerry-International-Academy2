import { useState, useEffect, useRef } from 'react';
import { Trash2, UploadCloud, Loader2, Image as ImageIcon } from 'lucide-react';

export default function GalleryManager() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [category, setCategory] = useState('General');
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setImages(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load gallery images.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed in the gallery.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error uploading file');
      }

      setSuccess('Image uploaded successfully.');
      fetchImages();

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Image deleted successfully.');
        setImages(prev => prev.filter(img => img.id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete image');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Delete failed.');
    } finally {
      setDeletingId(null);
      setTimeout(() => setSuccess(''), 3000);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Gallery Manager</h2>
        <p className="text-slate-600">Upload and manage images for your public gallery.</p>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      {success && <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">{success}</div>}

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Upload New Image</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <input 
              type="text" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Facilities, Events..."
            />
          </div>
          <div className="w-full sm:w-2/3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Image</label>
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
                id="gallery-upload"
                disabled={uploading}
              />
              <label 
                htmlFor="gallery-upload"
                className={`flex items-center justify-center w-full px-4 py-2 border-2 border-dashed rounded-md cursor-pointer transition-colors ${uploading ? 'bg-slate-50 border-slate-200' : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50'}`}
              >
                {uploading ? (
                  <span className="flex items-center text-slate-500">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...
                  </span>
                ) : (
                  <span className="flex items-center text-slate-600 font-medium">
                    <UploadCloud className="w-5 h-5 mr-2 text-blue-600" /> Choose Image
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Gallery Images</h3>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-sm font-medium text-slate-900">No images</h3>
            <p className="mt-1 text-sm text-slate-500">Get started by uploading an image above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img: any) => (
              <div key={img.id} className="relative group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="aspect-square bg-slate-100 relative">
                  <img src={img.url} alt={img.category || 'Gallery image'} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-200 px-2 py-0.5 rounded truncate" title={img.category || 'General'}>
                      {img.category || 'General'}
                    </span>
                  </div>
                  {img.created_at && (
                    <p className="text-xs text-slate-400 mt-auto mb-2">
                      {new Date(img.created_at).toLocaleDateString()}
                    </p>
                  )}
                  <div className="pt-2 border-t border-slate-200 flex justify-end">
                    <button 
                      onClick={() => setConfirmDeleteId(img.id)} 
                      disabled={deletingId === img.id} 
                      className="p-1.5 hover:bg-red-100 text-red-600 rounded flex justify-center disabled:opacity-50 transition-colors" 
                      title="Delete Permanently"
                    >
                      {deletingId === img.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Image</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete this image? This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const idToDel = confirmDeleteId;
                  setConfirmDeleteId(null);
                  handleDelete(idToDel);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
