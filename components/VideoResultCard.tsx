import React from 'react';
import { YouTubeVideo } from '../types';

interface VideoResultCardProps {
  video: YouTubeVideo;
  onCardClick: (video: YouTubeVideo) => void;
}

const VideoResultCard: React.FC<VideoResultCardProps> = ({ video, onCardClick }) => {
  return (
    <button
      onClick={() => onCardClick(video)}
      className="bg-slate-800/50 rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:bg-slate-800 text-left w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2" title={video.title}>
          {video.title}
        </h3>
        <p className="text-sm text-slate-400 mt-2">{video.channelTitle}</p>
      </div>
    </button>
  );
};

export default VideoResultCard;