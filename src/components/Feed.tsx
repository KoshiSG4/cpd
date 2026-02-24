import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { type PlaylistWithVideos, type Video } from '../types/youtubeTypes';
import { getChannelLibrary } from '../utils/getChannelLibrary';
import Sidebar from './Sidebar';
import Videos from './Videos';
import { getSearchResults } from '../utils/fetchVideos';
import { useNavigate, useParams } from 'react-router-dom';

const Feed = () => {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [videos, setVideos] = useState<Video[]>([]);
	const [playlists, setPlaylists] = useState<PlaylistWithVideos[]>([]);
	const [loading, setLoading] = useState(true);
	const { searchTerm } = useParams<{ searchTerm: string }>();
	const navigate = useNavigate();

	const channelId = 'UCJJOMTPJUuCtnjYmgcjvb3g';

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getChannelLibrary(channelId);
				console.log('data:', data);
				setPlaylists(data);

				// Default videos = ALL videos
				const allVideos = data.flatMap((p) => p.videos);
				setVideos(allVideos);
			} catch (err) {
				console.error('Error loading library:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	//update videos when category changes
	useEffect(() => {
		if (selectedCategory === 'All') {
			setVideos(playlists.flatMap((p) => p.videos));
		} else {
			const playlist = playlists.find(
				(p) => p.title === selectedCategory,
			);
			setVideos(playlist?.videos || []);
		}

		navigate('/', { replace: true }); // navigate to home page when category changes
	}, [selectedCategory, playlists]);

	//update videos when search term changes
	useEffect(() => {
		if (!searchTerm) return;

		getSearchResults(searchTerm, channelId).then((data) => setVideos(data));
	}, [searchTerm]);

	if (loading) {
		return (
			<div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
				Loading dashboard...
			</div>
		);
	}

	return (
		<Stack
			sx={{
				flexDirection: { sx: 'column', md: 'row' },
			}}>
			<Box
				sx={{
					height: { sx: 'auto', md: '88vh' },
					borderRight: '1px solid #3d3d3d',
					px: { sx: 0, md: 2 },
					backgroundColor: '#011d20',
				}}>
				<Sidebar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					playlists={playlists}
				/>
				<Typography
					className="copyright"
					variant="body2"
					sx={{
						color: '#011d20',
						textAlign: 'center',
						zIndex: 1,
						mt: 1,
					}}>
					Copyright © 2026 SHRI CPD
				</Typography>
			</Box>

			<Box
				p={2}
				sx={{
					overflowY: 'auto',
					height: '88vh',
					flex: 1,
					'&::-webkit-scrollbar': {
						width: '10px', // width of scrollbar
					},
					'&::-webkit-scrollbar-track': {
						background: '#011d20', // track color
						borderRadius: '8px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#055250', // thumb color
						borderRadius: '8px',
						border: '2px solid #011d20', // space around thumb
					},
					'&::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#064646', // hover color
					},
				}}>
				<Typography
					variant="h4"
					fontWeight="bold"
					mb={2}
					ml={5}
					sx={{ color: '#064646' }}>
					{searchTerm ? (
						<span style={{ color: '#064646' }}>
							Search results for <i>{searchTerm}</i>
						</span>
					) : (
						<span>
							{selectedCategory}{' '}
							<span style={{ color: '#064646' }}>videos</span>
						</span>
					)}
				</Typography>

				<Videos videos={videos} />
			</Box>
		</Stack>
	);
};

export default Feed;
