import { useEffect, useState } from 'react';

interface PlaylistItem {
	id: string;
	snippet: {
		title: string;
		thumbnails: {
			medium: {
				url: string;
			};
		};
	};
}

export default function App() {
	const [videos, setVideos] = useState<PlaylistItem[]>([]);

	useEffect(() => {
		fetch(
			'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLd16bf2-dUqi28_Qcn0X_yQH0RQGVVtnN&key=AIzaSyBgkkOYKZQt3zj1056DCtC2ZKLfqRddKss',
		)
			.then((res) => res.json())
			.then((data) => setVideos(data.items));
	}, []);

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gap: 20,
			}}>
			{videos.map((v) => (
				<div key={v.id}>
					<img src={v.snippet.thumbnails.medium.url} />
					<p>{v.snippet.title}</p>
				</div>
			))}
		</div>
	);
}
