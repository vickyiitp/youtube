import React from 'react';
import { YouTubeVideo } from '../types';
import { YouTubeIcon } from './icons/YouTubeIcon';

interface AnalyzedVideosProps {
    videos: YouTubeVideo[];
}

const AnalyzedVideos: React.FC<AnalyzedVideosProps> = ({ videos }) => {
    return (
        <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <YouTubeIcon className="w-6 h-6 text-red-500" />
                Top YouTube Videos Analyzed
            </h3>
            <ul className="space-y-3">
                {videos.map((video) => (
                    <li key={video.id} className="text-sm">
                        <a
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <p className="text-cyan-400 group-hover:text-cyan-300 group-hover:underline truncate font-semibold">
                                {video.title}
                            </p>
                            <p className="text-slate-400 group-hover:text-slate-300 truncate">
                                by {video.channelTitle}
                            </p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnalyzedVideos;
