import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Stack } from '@mui/material';
import ReactPlayer from 'react-player';
import { getVideoDetails } from '../utils/fetchVideos';
import { type PlaylistItem } from '../types/youtubeTypes';

const VideoDetail = () => {
	const [videoDetail, setVideoDetail] = useState<PlaylistItem | null>(null);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			const data = await getVideoDetails(id);
			setVideoDetail(data[0]);
		};

		fetchData();
	}, [id]);

	return (
		<Box
			minHeight="100%"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				width: '100%',
				mt: 5,
			}}>
			<Stack
				spacing={2}
				alignItems="center"
				sx={{ width: '100%', maxWidth: '1100px', px: 2 }}>
				{/* ===== PLAYER SECTION ===== */}
				<Box
					sx={{
						mt: 2,
					}}>
					{/* Title */}
					<Typography
						color="#064646"
						variant="h5"
						fontWeight="bold"
						mb={3}>
						{videoDetail?.snippet.title}
					</Typography>

					{/* Player wrapper with 16:9 ratio */}
					<Box
						sx={{
							position: 'relative',
							paddingTop: '56.25%',
							backgroundColor: '#000',
							borderRadius: 2,
							overflow: 'hidden',
						}}>
						<ReactPlayer
							src={`https://www.youtube.com/watch?v=${id}`}
							className="react-player"
							controls
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
							}}
						/>
					</Box>
				</Box>
				{/* ===== RELATED VIDEOS =====
				<Box
					sx={{
						width: '100%',
						maxWidth: '1100px',
						px: 2,
					}}>
					<Videos videos={videos} direction="column" />
				</Box> */}
			</Stack>
		</Box>
	);
};

export default VideoDetail;
