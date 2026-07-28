import { useState, useEffect } from 'react';
import { Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        const imageMedia = data.filter((m: any) => m.type === 'image');
        const videoMedia = data.filter((m: any) => m.type === 'video');
        setImages(imageMedia);
        setVideos(videoMedia);
      })
      .catch(console.error);
  }, []);

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
    <div className="flex flex-col min-h-screen">
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Explore the vibrant life and activities at Jerry International Academy through our photos and videos.</p>
        </div>
      </section>

      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
              <button 
                onClick={() => setActiveTab('images')}
                className={`flex items-center px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'images' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <ImageIcon className="w-4 h-4 mr-2" /> Photos
              </button>
              <button 
                onClick={() => setActiveTab('videos')}
                className={`flex items-center px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'videos' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <VideoIcon className="w-4 h-4 mr-2" /> Videos
              </button>
            </div>
          </div>

          {activeTab === 'images' ? (
            images.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                <ImageIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-600">No images uploaded yet.</h3>
                <p className="text-slate-500 mt-2">Images uploaded from the Admin Dashboard will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((img: any, idx: number) => (
                  <div key={img.id || idx} className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 aspect-square">
                    <img 
                      src={img.url} 
                      alt={(img.originalName || img.name) || `Gallery ${idx}`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <span className="text-white font-medium block truncate" title={(img.originalName || img.name)}>{(img.originalName || img.name) || 'Image'}</span>
                        {img.description && <span className="text-white/80 text-sm block mt-1 line-clamp-2">{img.description}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            videos.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                <VideoIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-600">No videos added yet.</h3>
                <p className="text-slate-500 mt-2">YouTube videos added from the Admin Dashboard will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video: any, idx: number) => (
                  <div key={video.id || idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="aspect-video bg-slate-900 relative">
                      <iframe 
                        className="w-full h-full absolute inset-0" 
                        src={getEmbedUrl(video.url)} 
                        title={(video.originalName || video.name)}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">{(video.originalName || video.name)}</h3>
                      {video.description && (
                        <p className="text-slate-600 text-sm leading-relaxed">{video.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
