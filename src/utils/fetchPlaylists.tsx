import { fetchFromAPI } from "../api/youtube";
import type { Playlist } from "../types/youtubeTypes";

export const getPlaylists = async (channelId: string) => {
  const data = await fetchFromAPI<Playlist>("playlists", {
    part: "snippet,contentDetails",
    channelId,
  });

  return data.items;
};