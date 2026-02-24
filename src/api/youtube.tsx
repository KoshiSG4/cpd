import axios from 'axios';

export const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeResponse<T> {
	items: T[];
	nextPageToken?: string;
}

export const fetchFromAPI = async <T,>(
	endpoint: string,
	params: Record<string, string>,
): Promise<YouTubeResponse<T>> => {
	const { data } = await axios.get<YouTubeResponse<T>>(
		`${BASE_URL}/${endpoint}`,
		{
			params: {
				...params,
				maxResults: 50,
				key: import.meta.env.VITE_YOUTUBE_API_KEY,
			},
		},
	);

	return data;
};
