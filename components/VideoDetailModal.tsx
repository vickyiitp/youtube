import React, { useState, useEffect } from 'react';
import { YouTubeVideo } from '../types';
import { getVideoDetails } from '../services/youtubeService';
import { XIcon } from './icons/XIcon';
import { EyeIcon } from './icons/EyeIcon';
import { LikeIcon } from './icons/LikeIcon';
import { CommentIcon } from './icons/CommentIcon';

interface VideoDetailModalProps {
  video: YouTubeVideo;
  onClose: () => void;
}

const StatPill: React.FC<{ icon: React.ReactNode; label: string; value: string | undefined }> = ({ icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-full text-sm">
            {icon}
            <span className="font-semibold">{Number(value).toLocaleString()}</span>
            <span className="text-slate-400 hidden sm:inline">{label}</span>
        </div>
    );
};

const VideoDetailModal: React.FC<VideoDetailModalProps> = ({ video, onClose }) => {
    const [details, setDetails] = useState<YouTubeVideo | null>(video);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const videoDetails = await getVideoDetails(video.id);
                setDetails(videoDetails);
            } catch (err) {
                console.error(err);
                setError("Failed to load video details. The API key might be invalid or quota exceeded.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [video.id]);

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-title"
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-4 flex justify-between items-center border-b border-slate-700">
                    <h2 id="video-title" className="text-xl font-bold text-slate-100 truncate pr-4">{details?.title || video.title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>
                
                <div className="flex-grow overflow-y-auto">
                    <div className="aspect-video bg-black">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="p-4 md:p-6">
                        {isLoading && <div className="text-center text-slate-400">Loading details...</div>}
                        {error && <div className="text-center text-red-400">{error}</div>}
                        
                        {!isLoading && !error && details && (
                            <>
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <StatPill icon={<EyeIcon className="w-5 h-5 text-cyan-400"/>} label="Views" value={details.viewCount} />
                                    <StatPill icon={<LikeIcon className="w-5 h-5 text-green-400"/>} label="Likes" value={details.likeCount} />
                                    <StatPill icon={<CommentIcon className="w-5 h-5 text-purple-400"/>} label="Comments" value={details.commentCount} />
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-slate-200">{details.channelTitle}</p>
                                    <p className="text-sm text-slate-400">Published on {formatDate(details.publishedAt)}</p>
                                </div>

                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-200 mb-2">Description</h3>
                                    <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                                        {details.description || "No description provided."}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetailModal;