import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSearchResults } from '../utils/fetchVideos';
import type { Video } from '../types/youtubeTypes';
import Videos from './Videos';

const SearchFeed = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	const { searchTerm } = useParams<{ searchTerm: string }>();
	const channelId = 'UCJJOMTPJUuCtnjYmgcjvb3g';

	useEffect(() => {
		if (!searchTerm) return;

		getSearchResults(searchTerm, channelId).then((data) => setVideos(data));
	}, [searchTerm]);

	return (
		<Box p={2} minHeight="95vh">
			<Typography
				variant="h4"
				fontWeight={900}
				color="#0d6564"
				mb={3}
				ml={{ sm: '100px' }}>
				Search Results for{' '}
				<span style={{ color: '#0d6564', textDecoration: 'italic' }}>
					{searchTerm}
				</span>{' '}
				videos
			</Typography>
			<Box display="flex">
				<Box sx={{ mr: { sm: '100px' } }} />
				{<Videos videos={videos} />}
			</Box>
		</Box>
	);
};

export default SearchFeed;
