
import { Track, Album } from '@/types/audio';

export interface TourDate {
  id: string;
  date: string;
  venue: string;
  location: string;
  status: 'tickets' | 'sold-out' | 'cancelled';
}

export const MOCK_TRACKS: Track[] = [
  {
    id: 'f1',
    title: '405 South',
    artist: 'DoubleU',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverArt: 'https://picsum.photos/seed/faded405/600/600',
    duration: '3:45',
    releaseYear: 2025,
    lyrics: "Driving down the 405, neon lights blurring into lines of code. The city breathes in binary, and I am just a ghost in the fast lane. Faded memories in the rearview mirror."
  },
  {
    id: 'f2',
    title: 'Faded Memories',
    artist: 'DoubleU',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverArt: 'https://picsum.photos/seed/faded405/600/600',
    duration: '4:12',
    releaseYear: 2025,
    lyrics: "Can't remember the face, only the frequency. Your voice is a digital echo, fading out as the sun rises over the concrete horizon. Everything is 405 miles away."
  },
  {
    id: 'f3',
    title: 'Midnight Drift',
    artist: 'DoubleU',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverArt: 'https://picsum.photos/seed/faded405/600/600',
    duration: '3:58',
    releaseYear: 2025,
    lyrics: "Drifting through the dead of night. No destination, just the pulse. The tires hum a low-res melody. We are lost in the drift of the digital tide."
  },
  {
    id: 't1',
    title: 'Neon Pulse',
    artist: 'DoubleU',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverArt: 'https://images.unsplash.com/photo-1608347539243-b592b14332d8?q=80&w=800',
    duration: '4:12',
    releaseYear: 2024,
    lyrics: "In the heart of the neon night, we find our rhythm. Digital shadows, electrical dreams. Pulse keeping time with the city's heart. We are the frequency."
  },
  {
    id: 't2',
    title: 'Cyber Echo',
    artist: 'DoubleU',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverArt: 'https://images.unsplash.com/photo-1637789594401-5a0dac0d3e36?q=80&w=800',
    duration: '3:45',
    releaseYear: 2024,
    lyrics: "Voices in the machine. Echoes of a forgotten time. Synthetic emotions, real desires. Can you hear the resonance in the static?"
  }
];

export const MOCK_ALBUMS: Album[] = [
  {
    id: 'faded-405',
    title: 'Faded 405',
    artist: 'DoubleU',
    coverArt: 'https://picsum.photos/seed/faded405/600/600',
    releaseYear: 2025,
    tracks: MOCK_TRACKS.slice(0, 3)
  },
  {
    id: 'a1',
    title: 'Neon Nights',
    artist: 'DoubleU',
    coverArt: 'https://images.unsplash.com/photo-1608347539243-b592b14332d8?q=80&w=800',
    releaseYear: 2024,
    tracks: MOCK_TRACKS.slice(3, 4)
  },
  {
    id: 'a2',
    title: 'Void Echoes',
    artist: 'DoubleU',
    coverArt: 'https://images.unsplash.com/photo-1769016416793-0b7ef3c6309d?q=80&w=800',
    releaseYear: 2023,
    tracks: MOCK_TRACKS.slice(4, 5)
  }
];

export const MOCK_TOUR_DATES: TourDate[] = [
  { id: '1', date: 'MAY 15, 2025', venue: 'The Echo Vault', location: 'Los Angeles, USA', status: 'tickets' },
  { id: '2', date: 'MAY 18, 2025', venue: 'Neon Terrace', location: 'San Francisco, USA', status: 'tickets' },
  { id: '3', date: 'JUN 02, 2025', venue: 'Cyber Dome', location: 'Seattle, USA', status: 'tickets' },
  { id: '4', date: 'JUN 15, 2025', venue: 'Digital Garden', location: 'Vancouver, CA', status: 'tickets' },
  { id: '5', date: 'JUL 10, 2025', venue: 'The Grid', location: 'Tokyo, JP', status: 'sold-out' },
];
