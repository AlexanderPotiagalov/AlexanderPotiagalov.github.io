import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMusic, FiX } from "react-icons/fi";
import { SiSpotify } from "react-icons/si";

const tracks = [
  { title: "NIGHTS LIKE THIS", artist: "The Kid LAROI", id: "3UDpwoxz9SUvVE0e1mnsxx", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f1c781567b8ba35f5312e2cd" },
  { title: "The Thrill", artist: "Wiz Khalifa, Empire Of The Sun", id: "56oGoEjA9eTZYgsttEFKY3" },
  { title: "Passionfruit", artist: "Drake", id: "5mCPDVBb16L4XQwDdbRUpz", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e024f0fd9dad63977146e685700" },
  { title: "After Party", artist: "Don Toliver", id: "527k23H0A4Q0UJN3vGs0Da", cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029d04d25e732c593fb94e7193" },
  { title: "MY EYES", artist: "Travis Scott", id: "4kjI1gwQZRKNDkw1nI475M", cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0204481c826dd292e5e4983b3f" },
  { title: "No Pole", artist: "Don Toliver", id: "0eaVIYo2zeOaGJeqZ5TwYz", cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02307323fa550564b0201b1d76" },
  { title: "on one tonight", artist: "Gunna", id: "6EUcP55GlbmsmCzfL2vxtZ", cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029a0cbe7c93bc691f48f356ed" },
  { title: "Too Many Nights", artist: "Metro Boomin, Future, Don Toliver", id: "2Hh3ETdQKrmSI3QS0hme7g", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c4fee55d7b51479627c31f89" },
  { title: "After Hours", artist: "The Weeknd", id: "2p8IUWQDrpjuFltbdgLOag", cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e028863bc11d2aa12b54f5aeb36" },
  { title: "Mask Off", artist: "Future", id: "0VgkVdmE4gld66l8iyGjgx", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02278b422af022b7fa7eb4a672" },
];

function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const track = tracks[trackIndex];
  const moveTrack = (direction) => setTrackIndex((current) =>
    (current + direction + tracks.length) % tracks.length);

  return (
    <aside className={`music-player ${open ? "is-open" : ""}`} aria-label="Spotify music player">
      <button
        className="music-player-tab"
        type="button"
        onClick={() => {
          setHasOpened(true);
          setOpen((current) => !current);
        }}
        aria-expanded={open}
        aria-controls="spotify-player"
        title="Open music playlist"
      >
        <SiSpotify className="music-note" />
        <span className="music-notification-dot" aria-hidden="true" />
      </button>

      <div className="music-embed" id="spotify-player">
        <div className="music-embed-head">
          <span className="music-disc"><FiMusic /></span>
          <span className="music-player-copy">
            <strong>{track.title}</strong>
            <small>{track.artist} · {trackIndex + 1}/{tracks.length}</small>
          </span>
          <div className="music-track-controls">
            <button type="button" onClick={() => moveTrack(-1)} aria-label="Previous song"><FiChevronLeft /></button>
            <button type="button" onClick={() => moveTrack(1)} aria-label="Next song"><FiChevronRight /></button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Spotify player"><FiX /></button>
          </div>
        </div>
        {hasOpened && (
          <iframe
            key={track.id}
            title={`${track.title} by ${track.artist} on Spotify`}
            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}
      </div>
    </aside>
  );
}

export default MusicPlayer;
