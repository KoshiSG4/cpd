export interface PlaylistSnippet {
	title: string;
	description: string;
	thumbnails: {
		medium: {
			url: string;
		};
		high: {
			url: string;
		};
		default: {
			url: string;
		};
	};
}

export interface Playlist {
	id: string;
	snippet: PlaylistSnippet;
}

export interface VideoSnippet {
	title: string;
	resourceId: {
		videoId: string;
	};
	thumbnails: {
		medium: {
			url: string;
		};
		high: {
			url: string;
		};
		default: {
			url: string;
		};
	};
}

export interface PlaylistItem {
	id: string;
	snippet: VideoSnippet;
}

export interface PlaylistWithVideos {
	id: string;
	title: string;
	thumbnail: string;
	videos: {
		id: string;
		title: string;
		thumbnail: string;
	}[];
}

export interface Video {
	id: string;
	title: string;
	thumbnail: string;
}

export interface SearchResult {
	id: {
		videoId: string;
	};
	snippet: {
		title: string;
		thumbnails: {
			medium: {
				url: string;
			};
			high: {
				url: string;
			};
			default: {
				url: string;
			};
		};
	};
}
