import MediaManager from '@/components/MediaManager';

export default function MediaLibrary() {
  return (
    <MediaManager 
      filterType="all" 
      title="Media Library" 
      description="A centralized library for all your uploaded images and videos."
    />
  );
}
