import { fetchFromAPI } from '../api/youtube';
import {
	type VideoSnippet,
	type PlaylistItem,
	type SearchResult,
} from '../types/youtubeTypes';

export const getPlaylistVideos = async (playlistId: string) => {
	const data = await fetchFromAPI<PlaylistItem>('playlistItems', {
		part: 'snippet',
		playlistId,
	});

	return data.items;
};

export const getVideoDetails = async (videoId: string) => {
	const data = await fetchFromAPI<PlaylistItem>('videos', {
		part: 'snippet',
		id: videoId,
	});

	return data.items;
};

export const getSearchResults = async (
	searchTerm: string,
	channelId: string,
) => {
	const data = await fetchFromAPI<SearchResult>('search', {
		part: 'snippet',
		q: searchTerm,
		type: 'video',
		channelId,
	});

	return data.items.map((v) => ({
		id: v.id.videoId,
		title: v.snippet?.title || 'Untitled Video',
		thumbnail:
			v.snippet?.thumbnails?.medium?.url ||
			v.snippet?.thumbnails?.high?.url ||
			v.snippet?.thumbnails?.default?.url ||
			'',
	}));
};
