'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export default function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('auto');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        // Lock the aspect ratio once we know the actual video dimensions
        setAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
      }
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    // In case metadata is already loaded (e.g. cached)
    if (video.readyState >= 1) handleMetadata();

    return () => video.removeEventListener('loadedmetadata', handleMetadata);
  }, [src]);

  return (
    <div style={{ width: '100%', aspectRatio, overflow: 'hidden' }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
      />
    </div>
  );
}
