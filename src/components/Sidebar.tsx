import { Stack } from '@mui/material';
import type { PlaylistWithVideos } from '../types/youtubeTypes';

type Props = {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	playlists: PlaylistWithVideos[];
};

const CATEGORY_RENAMES: Record<string, string> = {
	'Emeregncy Medicine - "Seconds Save Lives: Exploring the World of Emergency Medicine and Life-Saving Decisions!"':
		'Emergency Medicine',

	ENT: 'Oromaxillary & ENT',
	'5 Common Skin Disorders You Shouldn’t Ignore Dermatological Conditions Skin disease in human':
		'Skin Disorders',
};

const HIDDEN_CATEGORIES = [
	'CCPSL Screening programme for MSc',
	'Praja Matra 2024 at Colombo Meidcal faculty',
	'Nature and Places to visit in Sri Lanka',
	'CPD promoting videos',
	'Mapping system by Sumal Nandasena sir',
];

const Categories = ({
	selectedCategory,
	setSelectedCategory,
	playlists,
}: Props) => (
	<Stack
		direction="row"
		sx={{
			overflowY: 'auto',
			// overflowX: 'hidden',
			height: { sx: 'auto', md: '100%' },
			flexDirection: { md: 'column' },
			'&::-webkit-scrollbar': {
				width: '10px', // width of scrollbar
			},
			'&::-webkit-scrollbar-track': {
				background: '#011d20', // track color
				borderRadius: '8px',
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: '#0d6564', // thumb color
				borderRadius: '8px',
				border: '2px solid #011d20', // space around thumb
			},
			'&::-webkit-scrollbar-thumb:hover': {
				backgroundColor: '#064646', // hover color
			},
		}}>
		<button
			className="category-btn"
			onClick={() => setSelectedCategory('All')}
			style={{
				background:
					selectedCategory === 'All' ? '#0d6564' : 'transparent',
				color: 'white',
				width: '200px',
				marginTop: '10px',
			}}
			key={'all'}>
			<span
				style={{
					color: selectedCategory === 'All' ? 'white' : '#0d6564',
				}}>
				{/* {category.icon} */}
			</span>
			<span
				style={{
					opacity: selectedCategory === 'All' ? '1' : '0.8',
				}}>
				{'All'}
			</span>
		</button>
		{playlists
			.filter((category) => !HIDDEN_CATEGORIES.includes(category.title)) // hide unwanted
			.map((category) => {
				const displayName =
					CATEGORY_RENAMES[category.title] || category.title; // rename if mapped

				return (
					<button
						className="category-btn"
						onClick={() => setSelectedCategory(category.title)}
						style={{
							background:
								category.title === selectedCategory
									? '#0d6564'
									: 'transparent',
							color: 'white',
							width: '200px',
						}}
						key={category.title}>
						<span
							style={{
								color:
									category.title === selectedCategory
										? 'white'
										: '#0d6564',
							}}>
							{/* {category.icon} */}
						</span>
						<span
							style={{
								opacity:
									category.title === selectedCategory
										? '1'
										: '0.8',
							}}>
							{displayName}
						</span>
					</button>
				);
			})}
	</Stack>
);

export default Categories;
