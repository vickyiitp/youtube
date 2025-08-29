import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, GroundingSource, YouTubeVideo } from '../types';
import { searchTopVideos } from './youtubeService';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (topic: string, videos: YouTubeVideo[]): string => {
    const videoDataContext = videos.length > 0 ? `
        Here is a list of the current top-ranking YouTube videos for this topic. Use this data as a primary source to find gaps, identify successful formats, and understand the competitive landscape.

        Top Videos Data:
        ${videos.map(v => `- Title: "${v.title}", Channel: "${v.channelTitle}"`).join('\n')}
    ` : `
        First, research the current top-ranking YouTube videos for this topic to understand the competitive landscape.
    `;


    return `
        You are a world-class YouTube strategist and content analyst. Your goal is to help creators find underserved niches and content gaps for a given topic.

        Analyze the search results and video landscape for the topic: "${topic}".
        ${videoDataContext}

        Based on your analysis, identify 3-4 distinct "Opportunity Clusters". An Opportunity Cluster is a sub-topic or a unique angle that has high potential for a new video or series because it's either not well-covered, has low-quality existing content, or answers questions people are actively searching for but not finding good answers to.

        For each Opportunity Cluster, provide:
        1.  A descriptive title for the cluster.
        2.  A brief description of why it's a good opportunity, referencing the existing video landscape where relevant.
        3.  An "Opportunity Score" from 1 to 100, where 100 is a massive, untapped goldmine.
        4.  A list of related keywords people might be searching for.
        5.  At least two concrete, creative video ideas within that cluster.
        6.  For each video idea, provide:
            - A catchy, SEO-friendly title.
            - A brief script outline (Hook, 3-4 Main Points, Call to Action).
            - A suggestion for the video format (e.g., 'fast-paced tutorial', 'documentary-style deep dive', 'comedic skit review').

        Return the entire analysis as a single, valid JSON object. Do not wrap the JSON in markdown backticks or include any explanatory text outside of the JSON object itself. The JSON structure must follow this format:
        {
          "opportunityClusters": [
            {
              "clusterTitle": "string",
              "description": "string",
              "opportunityScore": "number",
              "relatedKeywords": ["string"],
              "videoIdeas": [
                {
                  "title": "string",
                  "scriptOutline": {
                    "hook": "string",
                    "mainPoints": ["string"],
                    "cta": "string"
                  },
                  "formatSuggestion": "string"
                }
              ]
            }
          ]
        }
    `;
}

export const analyzeTopic = async (topic: string): Promise<AnalysisResult> => {
    let analyzedVideos: YouTubeVideo[] = [];
    try {
        analyzedVideos = await searchTopVideos(topic);
        const prompt = generatePrompt(topic, analyzedVideos);

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            },
        });
        
        let text = response.text;
        
        const match = text.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
        if (match) {
            text = match[1];
        }

        const parsedJson = JSON.parse(text);

        const groundingMetadata = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const groundingSources: GroundingSource[] = groundingMetadata
            ?.map((chunk: any) => chunk.web)
            ?.filter((source: any) => source?.uri && source?.title) || [];


        return { ...parsedJson, groundingSources, analyzedVideos, isFallback: false };

    } catch (error) {
        console.error("Error analyzing topic with Gemini:", error);
        // If we got video data before the AI failed, return a fallback report.
        if (analyzedVideos.length > 0) {
            console.log("Gemini API failed. Generating a fallback report based on YouTube data.");
            return {
                isFallback: true,
                analyzedVideos,
            };
        }
        // If we couldn't even get video data, it's a total failure.
        throw new Error("Failed to get analysis from AI service.");
    }
};