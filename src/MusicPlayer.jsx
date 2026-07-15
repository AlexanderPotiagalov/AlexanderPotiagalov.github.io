import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMusic, FiX } from "react-icons/fi";
import { SiSpotify } from "react-icons/si";

const tracks = [
  { title: "Passionfruit", artist: "Drake", id: "5mCPDVBb16L4XQwDdbRUpz" },
  { title: "Mask Off", artist: "Future", id: "0VgkVdmE4gld66l8iyGjgx" },
  { title: "MY EYES", artist: "Travis Scott", id: "4kjI1gwQZRKNDkw1nI475M" },
  { title: "Starboy", artist: "The Weeknd", id: "38JOdzBE9kPj5UhKtqIIqQ" },
];

function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const track = tracks[trackIndex];
  const moveTrack = (direction) => setTrackIndex((current) =>
    (current + direction + tracks.length) % tracks.length);

  return (
    <aside className={`music-player ${open ? "is-open" : ""}`} aria-label="Spotify music player">
      <button
        className="music-player-tab"
        type="button"
        onClick={() => setOpen((current) => !current)}
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
        <iframe
          key={track.id}
          title={`${track.title} by ${track.artist} on Spotify`}
          src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </aside>
  );
}

export default MusicPlayer;
