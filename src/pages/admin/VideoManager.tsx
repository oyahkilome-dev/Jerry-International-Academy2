import { useState, useEffect } from 'react';
import { Trash2, Link, Video as VideoIcon, Loader2 } from 'lucide-react';

export default function VideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setVideos(data.filter((m: any) => m.type === 'video'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!caption || !url) {
      setError('Caption and URL are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({
          name: caption,
          type: 'video',
          url: url,
          description: description,
          size: 0
        })
      });

      if (!res.ok) {
        throw new Error('Failed to save video.');
      }

      setSuccess('Video link added successfully.');
      setCaption('');
      setDescription('');
      setUrl('');
      fetchVideos();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewDelete = async (id: number) => {
    console.log(`[DELETE] Starting deletion process for video item ID: ${id}`);
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
        console.log(`[DELETE] Video ${id} successfully deleted from server and database.`);
        setSuccess('Image deleted successfully.'); // Requested by prompt
        setTimeout(() => setSuccess(''), 3000);
        
        // Optimistic UI update: immediately remove from state without refreshing
        setVideos(prev => prev.filter(m => m.id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete video');
      }
    } catch (err: any) {
      console.error(`[DELETE] Client-side failure for video ${id}:`, err);
      setError(`Error deleting file: ${err.message}`);
      setTimeout(() => setError(''), 5000);
    } finally {
      setDeletingId(null);
    }
  };

  // Convert regular youtube url to embed url for display
  const getEmbedUrl = (url: string) => {
    try {
      const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }
    } catch (e) {
      return url;
    }
    return url;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Video Manager</h2>
        <p className="text-slate-600">Add YouTube videos to be displayed across the website.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Add New Video</h3>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Video Caption (Title)</label>
            <input 
              type="text" 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Academy Tour 2026"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Briefly describe the video..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">YouTube URL</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500">
                <Link className="h-4 w-4" />
              </span>
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Saving...' : 'Add Video Link'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Manage Videos</h3>
        
        {videos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
            <VideoIcon className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-sm font-medium text-slate-900">No videos</h3>
            <p className="mt-1 text-sm text-slate-500">Get started by adding a new YouTube video link above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 flex flex-col">
                <div className="aspect-video bg-slate-200 relative">
                  {video.url.includes('youtu') ? (
                    <iframe 
                      className="w-full h-full absolute inset-0" 
                      src={getEmbedUrl(video.url)} 
                      title={(video.originalName || video.name)}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-slate-800 text-slate-400">
                      <VideoIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-medium text-slate-900 mb-1 line-clamp-1" title={(video.originalName || video.name)}>{(video.originalName || video.name)}</h4>
                  {video.description && (
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{video.description}</p>
                  )}
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-200">
                    <a href={video.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                      <Link className="h-3 w-3 mr-1" /> View Link
                    </a>
                    <button 
                      onClick={() => {
                        console.log("Delete button clicked on VideoManager");
                        setConfirmDeleteId(video.id);
                      }}
                      disabled={deletingId === video.id}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                      title="Delete Permanently"
                    >
                      {deletingId === video.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
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
