'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: 'youtube1',
      title: 'Music Learning Example',
      description: 'A sample YouTube music learning video.',
      thumbnail: 'https://img.youtube.com/vi/JlZ3_HALx_U/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/JlZ3_HALx_U',
    },
    {
      id: '1',
      title: 'Bilibili Music Demo',
      description: 'A music lesson from Bilibili.',
      thumbnail: 'https://i0.hdslb.com/bfs/archive/6b6c7e7b6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg',
      embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1fV411d7u7',
    },
    {
      id: '2',
      title: 'Local MP4 Demo',
      description: 'A local mp4 video.',
      thumbnail: '/videos/demo.jpg',
      embedUrl: '/videos/demo.mp4',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <BackButton />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Music Videos</h1>

          {selectedVideo ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-purple-600 hover:text-purple-800 mb-4"
              >
                ← Back to Videos
              </button>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                {selectedVideo.embedUrl.endsWith('.mp4') ? (
                  <video
                    src={selectedVideo.embedUrl}
                    controls
                    className="w-full h-full rounded-lg bg-black"
                    poster={selectedVideo.thumbnail}
                  />
                ) : (
                  <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-600">{selectedVideo.description}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{video.title}</h2>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 