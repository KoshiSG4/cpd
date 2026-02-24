import React from 'react';
import { Stack, Box } from '@mui/material';
import Loader from './Loader';
import VideoCard from './VideoCard';
import type { Video } from '../types/youtubeTypes';

type Props = {
	videos: Video[];
	direction?: 'row' | 'column';
};

const Videos = ({ videos, direction }: Props) => {
	// if (!videos?.length) return <Loader />;

	return (
		<Stack
			direction={direction || 'row'}
			flexWrap="wrap"
			justifyContent="space-between"
			alignItems="start"
			ml={8}
			mr={8}
			gap={2}>
			{videos.map((item, idx) => (
				<Box key={idx}>
					{item.id && <VideoCard video={item} />}
					{/* {item.id.channelId && <ChannelCard channelDetail={item} />} */}
				</Box>
			))}
		</Stack>
	);
};

export default Videos;
