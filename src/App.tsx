import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import VideoDetail from './components/VideoDetail';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import './App.css';

const App = () => (
	<BrowserRouter>
		<Box>
			<Navbar />
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="/video/:id" element={<VideoDetail />} />
				<Route path="/search/:searchTerm" element={<Feed />} />
			</Routes>
		</Box>
	</BrowserRouter>
);

export default App;
