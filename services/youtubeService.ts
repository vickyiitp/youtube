import { YouTubeVideo } from '../types';

const YOUTUBE_SEARCH_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEOS_API_URL = 'https://www.googleapis.com/youtube/v3/videos';


const mapYouTubeItemToVideo = (item: any): YouTubeVideo => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl: item.snippet.thumbnails.high.url,
    description: item.snippet.description,
});

export const searchVideos = async (query: string, maxResults: number = 12): Promise<YouTubeVideo[]> => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        throw new Error("YOUTUBE_API_KEY environment variable not set.");
    }

    const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: String(maxResults),
        order: 'relevance',
        key: apiKey,
    });

    try {
        const response = await fetch(`${YOUTUBE_SEARCH_API_URL}?${params.toString()}`);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('YouTube API Error:', errorData);
            throw new Error(`YouTube API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        return data.items.map(mapYouTubeItemToVideo);

    } catch (error) {
        console.error("Error fetching from YouTube API:", error);
        // Re-throw so the UI component can catch it and display an error message
        throw error;
    }
};

export const searchTopVideos = async (query: string): Promise<YouTubeVideo[]> => {
    try {
        // Now uses the more generic searchVideos function
        return await searchVideos(query, 5);
    } catch (error) {
        console.error("searchTopVideos failed, returning empty array to not block AI analysis.", error);
        // Return empty array on error to allow the app to proceed without this data
        return [];
    }
};

export const getVideoDetails = async (videoId: string): Promise<YouTubeVideo> => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        throw new Error("YOUTUBE_API_KEY environment variable not set.");
    }

    const params = new URLSearchParams({
        part: 'snippet,statistics',
        id: videoId,
        key: apiKey,
    });

    try {
        const response = await fetch(`${YOUTUBE_VIDEOS_API_URL}?${params.toString()}`);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('YouTube API Error (videos):', errorData);
            throw new Error(`YouTube API request for video details failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            throw new Error(`Video with ID ${videoId} not found.`);
        }
        
        const item = data.items[0];

        const videoDetails: YouTubeVideo = {
            id: item.id,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            thumbnailUrl: item.snippet.thumbnails.high.url,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            commentCount: item.statistics.commentCount,
        };

        return videoDetails;

    } catch (error) {
        console.error(`Error fetching details for video ID ${videoId}:`, error);
        throw error; // Re-throw for the component to handle
    }
};