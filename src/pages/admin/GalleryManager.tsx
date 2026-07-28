import MediaManager from '@/components/MediaManager';

export default function GalleryManager() {
  return (
    <MediaManager 
      filterType="image" 
      title="Gallery Manager" 
      description="Upload, edit, and manage images for your public gallery."
    />
  );
}
