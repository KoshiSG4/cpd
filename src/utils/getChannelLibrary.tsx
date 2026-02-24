import { getPlaylists } from '../utils/fetchPlaylists';
import { getPlaylistVideos } from '../utils/fetchVideos';

export const getChannelLibrary = async (channelId: string) => {
	const playlists = await getPlaylists(channelId);
	// console.log('playlists:', playlists);

	const playlistsWithVideos = await Promise.all(
		playlists.map(async (playlist) => {
			const videos = await getPlaylistVideos(playlist.id);
			// console.log('videos', videos);

			return {
				id: playlist.id,
				title: playlist.snippet.title,
				thumbnail:
					playlist.snippet.thumbnails?.medium.url ||
					playlist.snippet.thumbnails?.high?.url ||
					playlist.snippet.thumbnails?.default?.url ||
					'',
				videos: videos
					.filter((v) => v?.snippet?.resourceId?.videoId)
					.map((v) => ({
						id: v.snippet.resourceId.videoId,
						title: v.snippet?.title || 'Untitled Video',
						thumbnail:
							v.snippet?.thumbnails?.medium?.url ||
							v.snippet?.thumbnails?.high?.url ||
							v.snippet?.thumbnails?.default?.url ||
							'',
					})),
			};
		}),
	);

	return playlistsWithVideos;
};
