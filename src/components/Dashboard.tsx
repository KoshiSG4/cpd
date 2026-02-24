import { useState } from 'react';
import type { Playlist, PlaylistWithVideos } from '../types/youtubeTypes';

type Props = {
	playlists?: PlaylistWithVideos[];
};

export default function Dashboard({ playlists = [] }: Props) {
	const ROWS_PER_PAGE = 5;
	const [page, setPage] = useState(0);

	const totalPages = Math.max(1, Math.ceil(playlists.length / ROWS_PER_PAGE));
	const visible = playlists.slice(
		page * ROWS_PER_PAGE,
		page * ROWS_PER_PAGE + ROWS_PER_PAGE,
	);

	return (
		<div className="min-h-screen bg-neutral-950 text-white">
			{/* Top Nav */}
			<header className="flex items-center justify-between px-8 py-4 bg-neutral-900 sticky top-0 z-50">
				<h1 className="text-2xl font-bold tracking-wide">
					My Dashboard
				</h1>

				<div className="flex items-center gap-4">
					<input
						placeholder="Search videos..."
						className="px-4 py-2 rounded-xl bg-neutral-800 outline-none w-64"
					/>
					<div className="w-10 h-10 rounded-full bg-neutral-700" />
				</div>
			</header>

			{/* Hero Banner */}
			{playlists[0]?.videos?.[0] && (
				<section className="relative h-[420px] overflow-hidden">
					<img
						src={playlists[0].videos[0].thumbnail}
						alt="Featured"
						className="w-full h-full object-cover opacity-60"
					/>

					<div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

					<div className="absolute bottom-10 left-10 max-w-xl">
						<h2 className="text-4xl font-bold mb-4">
							{playlists[0].videos[0].title}
						</h2>
						<div className="flex gap-4">
							<button className="px-6 py-3 rounded-xl bg-white text-black font-semibold">
								▶ Play
							</button>
							<button className="px-6 py-3 rounded-xl bg-neutral-700 font-semibold">
								+ My List
							</button>
						</div>
					</div>
				</section>
			)}

			{/* Playlist Rows */}
			<main className="px-8 py-10 space-y-12">
				{visible.map((pl) => (
					<PlaylistRow key={pl.id} playlist={pl} />
				))}

				{/* Pagination */}
				<div className="flex items-center justify-center gap-4 pt-6">
					<button
						onClick={() => setPage((p) => Math.max(0, p - 1))}
						disabled={page === 0}
						className="px-4 py-2 rounded-xl bg-neutral-800 disabled:opacity-40">
						Previous
					</button>

					<span className="text-neutral-400">
						Page {page + 1} / {totalPages}
					</span>

					<button
						onClick={() =>
							setPage((p) => Math.min(totalPages - 1, p + 1))
						}
						disabled={page === totalPages - 1}
						className="px-4 py-2 rounded-xl bg-neutral-800 disabled:opacity-40">
						Next
					</button>
				</div>
			</main>
		</div>
	);
}

function PlaylistRow({ playlist }: { playlist: PlaylistWithVideos }) {
	const [index, setIndex] = useState(0);
	const CARD_WIDTH = 240;
	const VISIBLE = 5;

	const maxIndex = Math.max(0, playlist.videos.length - VISIBLE);

	return (
		<div>
			<h3 className="text-2xl font-semibold mb-4">{playlist.title}</h3>

			<div className="relative">
				{/* Left */}
				<Arrow
					direction="left"
					onClick={() => setIndex((i) => Math.max(0, i - VISIBLE))}
					disabled={index === 0}
				/>

				{/* Cards */}
				<div className="overflow-hidden">
					<div
						className="flex gap-5 transition-transform duration-300"
						style={{
							transform: `translateX(-${index * CARD_WIDTH}px)`,
						}}>
						{playlist.videos.map((v) => (
							<VideoCard key={v.id} video={v} />
						))}
					</div>
				</div>

				{/* Right */}
				<Arrow
					direction="right"
					onClick={() =>
						setIndex((i) => Math.min(maxIndex, i + VISIBLE))
					}
					disabled={index >= maxIndex}
				/>
			</div>
		</div>
	);
}

function VideoCard({ video }: { video: PlaylistWithVideos['videos'][number] }) {
	return (
		<div className="w-[240px] shrink-0 group cursor-pointer">
			<div className="rounded-2xl overflow-hidden bg-neutral-900 shadow-xl">
				<img
					src={video.thumbnail}
					alt={video.title}
					className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>

			<p className="mt-2 text-sm text-neutral-200 line-clamp-2">
				{video.title}
			</p>
		</div>
	);
}

function Arrow({
	direction,
	onClick,
	disabled,
}: {
	direction: string;
	onClick: () => void;
	disabled: boolean;
}) {
	const left = direction === 'left';

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 hover:bg-black transition disabled:opacity-30 ${
				left ? '-left-5' : '-right-5'
			}`}>
			{left ? '◀' : '▶'}
		</button>
	);
}
