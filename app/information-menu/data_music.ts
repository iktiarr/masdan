export interface Song {
  id: string;
  title: string;
  artist: string;
  cover_url: string;
  audio_url: string;
  genre?: string;
}

export interface SongLike {
  song_id: string;
}

export interface SongFavorite {
  song_id: string;
}