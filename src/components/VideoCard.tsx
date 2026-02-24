import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import type { Video } from '../types/youtubeTypes';

type Props = {
	video: Video;
};

const VideoCard = ({ video }: Props) => (
	<Card
		sx={{
			width: { xs: '100%', sm: '358px', md: '320px' },
			boxShadow: 'none',
			borderRadius: 2,
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: '#125253',
			transition: 'all 0.25s ease',
			cursor: 'pointer',

			backgroundColor: '#125253',

			'&:hover': {
				backgroundColor: '#053334',
				transform: 'translateY(-2px)',
				boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
			},
		}}>
		<Link to={video.id ? `/video/${video.id}` : `/video/cV2gBU6hKfY`}>
			<CardMedia
				image={video.thumbnail || 'https://via.placeholder.com/358x180'}
				// alt={video.title}
				sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
			/>
		</Link>
		<CardContent
			sx={{
				height: '106px',
			}}>
			<Link to={video.id ? `/video/${video.id}` : ''}>
				<Typography variant="subtitle1" fontWeight="bold" color="#FFF">
					{video.title.slice(0, 60)}
				</Typography>
			</Link>
			{/* <Link
				to={
					snippet?.channelId
						? `/channel/${snippet?.channelId}`
						: demoChannelUrl
				}>
				<Typography variant="subtitle2" color="gray">
					{snippet?.channelTitle || demoChannelTitle}
					<CheckCircleIcon
						sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
					/>
				</Typography>
			</Link> */}
		</CardContent>
	</Card>
);

export default VideoCard;
