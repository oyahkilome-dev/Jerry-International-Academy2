import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Loader2, Image as ImageIcon, Video, CheckCircle, Copy, Search, Play, FileText, RefreshCw, Filter, Eye, Edit2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface MediaManagerProps {
  filterType: 'image' | 'video' | 'all';
  title: string;
  description: string;
}

export default function MediaManager({ filterType, title, description }: MediaManagerProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [previewItem, setPreviewItem] = useState<any>(null);
  const [renameItem, setRenameItem] = useState<{id: number, name: string, newName: string} | null>(null);
  const [replaceItem, setReplaceItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>(filterType === 'all' ? 'all' : filterType);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = () => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        setMedia(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    if (filterType !== 'all') {
      setActiveFilter(filterType);
    }
  }, [filterType]);

  const handleUpload = async (e: any, droppedFile?: File) => {
    const file = droppedFile || (e.target.files && e.target.files[0]);
    if (!file) return;

    // Validate type based on props
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (filterType === 'image' && !isImage) {
      setError('Only image files (JPG, PNG, GIF, WEBP) are allowed.');
      return;
    }

    if (filterType === 'video' && !isVideo) {
      setError('Only video files (MP4, MOV, WEBM) are allowed.');
      return;
    }

    if (!isImage && !isVideo) {
      setError('Invalid file type.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError('');
    setSuccess('');

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => (prev >= 90 ? 90 : prev + 10));
      }, 300);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.message && data.message.includes('Bucket not found')) {
          throw new Error('The "media" bucket does not exist in your Supabase project. Please go to your Supabase Dashboard -> Storage and create a new public bucket named "media".');
        }
        throw new Error(data.message || 'Error uploading file');
      }

      setSuccess(`${isImage ? 'Image' : 'Video'} uploaded successfully.`);
      fetchMedia();
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(null, e.dataTransfer.files[0]);
    }
  };

  const handleNewDelete = async (id: number) => {
    console.log(`[DELETE] Starting deletion process for media item ID: ${id}`);
    setDeletingId(id);
    
    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      const data = await res.json().catch(() => ({ success: false, message: 'Invalid server response' }));
      
      if (res.ok && data.success) {
        console.log(`[DELETE] Item ${id} successfully deleted from server and database.`);
        setSuccess('Image deleted successfully.');
        setTimeout(() => setSuccess(''), 3000);
        
        // Optimistic UI update: immediately remove from state without refreshing
        setMedia(prev => prev.filter(m => m.id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete file');
      }
    } catch (err: any) {
      console.error(`[DELETE] Client-side failure for item ${id}:`, err);
      setError(`Error deleting file: ${err.message}`);
      setTimeout(() => setError(''), 5000);
    } finally {
      setDeletingId(null);
    }
  };

    const handleRenameSubmit = async () => {
    if (!renameItem || !renameItem.newName || renameItem.newName === renameItem.name) {
      setRenameItem(null);
      return;
    }
    const id = renameItem.id;
    const newName = renameItem.newName;
    setRenameItem(null);

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ name: newName })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('File renamed successfully');
        setTimeout(() => setSuccess(''), 3000);
        fetchMedia();
      } else {
        throw new Error(data.message || 'Failed to rename file');
      }
    } catch (err: any) {
      setError(`Error renaming file: ${err.message}`);
      setTimeout(() => setError(''), 5000);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setSuccess('URL copied to clipboard');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      // Fallback for iframe if clipboard is denied
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setSuccess('URL copied to clipboard');
      } catch (err2) {
        setError('Failed to copy URL');
      }
      document.body.removeChild(textArea);
      setTimeout(() => setSuccess(''), 3000);
      setTimeout(() => setError(''), 3000);
    }
  };

    const handleReplaceSubmit = () => {
    if (!replaceItem) return;
    const item = replaceItem;
    setReplaceItem(null);
    handleNewDelete(item.id).then(() => {
      if(fileInputRef.current) {
        fileInputRef.current.click();
      }
    });
  };

  const filteredMedia = media.filter(item => {
    const matchesType = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = (item.originalName || item.name).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500">{description}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center"><Upload className="w-5 h-5 mr-2" /> Upload Media</h2>
        </div>

        {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 bg-green-50 p-3 rounded-lg text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-2"/> {success}</div>}
        
        <div 
          className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-600 font-medium mb-2">Uploading...</p>
              <div className="w-full max-w-md bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-slate-700 font-medium text-lg mb-1">Drag & Drop images or videos here</p>
              <p className="text-slate-500 text-sm mb-4">or Click to Upload from your computer</p>
              
              <div className="text-xs text-slate-400">
                {filterType === 'all' && 'Supported formats: JPG, PNG, WEBP, GIF, MP4, MOV, WEBM'}
                {filterType === 'image' && 'Supported formats: JPG, PNG, WEBP, GIF'}
                {filterType === 'video' && 'Supported formats: MP4, MOV, WEBM'}
              </div>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept={filterType === 'image' ? 'image/*' : filterType === 'video' ? 'video/*' : 'image/*,video/*'}
            onChange={handleUpload}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filterType === 'all' && (
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('image')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'image' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Images
              </button>
              <button 
                onClick={() => setActiveFilter('video')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'video' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Videos
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map(item => (
              <div key={item.id} className="relative group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="aspect-square bg-slate-100 flex items-center justify-center relative z-10 overflow-hidden">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={(item.originalName || item.name)} className="w-full h-full object-cover relative -z-10" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 relative flex items-center justify-center">
                      <video src={item.url} className="w-full h-full object-cover opacity-60" />
                      <Play className="w-12 h-12 text-white absolute" />
                    </div>
                  )}
                  
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-sm font-medium text-slate-900 truncate" title={(item.originalName || item.name)}>{(item.originalName || item.name)}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded capitalize">{item.type}</span>
                    <span className="text-xs text-slate-500">{formatSize(item.size)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 mb-3">{formatDate(item.created_at)}</p>
                  
                  <div className="grid grid-cols-5 gap-1 mt-auto pt-2 border-t border-slate-200">
                      <button onClick={() => setPreviewItem(item)} className="p-2 hover:bg-slate-200 text-slate-600 rounded flex justify-center" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => setReplaceItem(item)} className="p-2 hover:bg-slate-200 text-slate-600 rounded flex justify-center" title="Replace">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button onClick={() => setRenameItem({ id: item.id, name: (item.originalName || item.name), newName: (item.originalName || item.name) })} className="p-2 hover:bg-slate-200 text-slate-600 rounded flex justify-center" title="Rename">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => copyUrl(item.url)} className="p-2 hover:bg-slate-200 text-slate-600 rounded flex justify-center" title="Copy URL">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={() => { console.log("DELETE BUTTON CLICKED"); setConfirmDeleteId(item.id); }} disabled={deletingId === item.id} className="p-2 hover:bg-red-100 text-red-600 rounded flex justify-center disabled:opacity-50" title="Delete Permanently">
                        {deletingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredMedia.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium text-slate-700">No media found</p>
                <p>Upload some files or change your search/filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setPreviewItem(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-slate-300 z-50 p-2">
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-6xl max-h-[90vh] w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {previewItem.type === 'image' ? (
              <img src={previewItem.url} alt={previewItem.name} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            ) : (
              <video src={previewItem.url} controls autoPlay className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" />
            )}
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {renameItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Rename File</h3>
            <input 
              type="text" 
              value={renameItem.newName}
              onChange={(e) => setRenameItem({...renameItem, newName: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setRenameItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleRenameSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replace Modal */}
      {replaceItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <RefreshCw className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Replace File</h3>
            <p className="text-slate-600 mb-6">This will delete the current file and prompt you to upload a new one. Continue?</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setReplaceItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReplaceSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Item</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to permanently delete this item?</p>
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
                  handleNewDelete(idToDel);
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
