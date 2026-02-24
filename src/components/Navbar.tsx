import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';
import shriLogo from '../assets/shriLogo.png';

const Navbar = () => (
	<Stack
		direction="row"
		alignItems="center"
		p={1}
		sx={{
			height: '6vh',
			position: 'sticky',
			background: '#011d20',
			top: 0,
			justifyContent: 'space-between',
		}}>
		<Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
			<img
				src={shriLogo}
				alt="logo"
				height={45}
				style={{ paddingLeft: '20px' }}
			/>
			<Typography
				sx={{
					color: '#fff',
					margin: 0,
					marginLeft: '20px',
					fontSize: '30px',
					fontWeight: 'bold',
					display: { xs: 'none', sm: 'block' },
				}}>
				SHRI CPD Lecture Library
			</Typography>
		</Link>
		<SearchBar />
	</Stack>
);

export default Navbar;
