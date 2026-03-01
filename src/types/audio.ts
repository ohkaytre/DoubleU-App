
export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverArt: string;
  duration?: string;
  albumId?: string;
  lyrics?: string;
  releaseYear?: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  releaseYear: number;
  tracks: Track[];
}
