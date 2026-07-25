import { useState } from "react";
import { FiMusic, FiX } from "react-icons/fi";
import { SiSpotify } from "react-icons/si";

const LOFI_PLAYLIST_ID = "37i9dQZF1DWWQRwui0ExPn";

function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
            <strong>FOCUS MODE</strong>
            <small>Lo-fi beats · instrumental playlist</small>
          </span>
          <div className="music-track-controls">
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Spotify player"><FiX /></button>
          </div>
        </div>
        {hasOpened && (
          <div className="music-frame-wrap">
            {!loaded && <span className="music-loading">Loading playlist…</span>}
            <iframe
              className={loaded ? "is-loaded" : ""}
              title="Lo-fi beats instrumental playlist on Spotify"
              src={`https://open.spotify.com/embed/playlist/${LOFI_PLAYLIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              onLoad={() => setLoaded(true)}
            />
          </div>
        )}
      </div>
    </aside>
  );
}

export default MusicPlayer;
