import { useEffect, useRef, useState } from "react";
import {
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiX,
} from "react-icons/fi";

const INITIAL_FEATURED_INDEX = 9;
const imageCache = new Map();

const moments = [
  ["beach.jpg", "Quiet coast", "COAST", "A quiet shoreline, an open horizon, and nowhere else I needed to be."],
  ["beach2.jpg", "Saltwater reset", "COAST", "The kind of ocean air that clears a crowded head almost immediately."],
  ["beach3.jpg", "End of the road", "COAST", "Where the pavement stops and the view becomes the only plan."],
  ["bridge.jpg", "Ways across", "WANDER", "A reminder that the route matters just as much as the destination."],
  ["cow.jpg", "Alpine locals", "COUNTRY", "An unhurried trail-side meeting with the residents who know the landscape best."],
  ["desert.jpg", "Last light", "TRAVEL", "Warm light stretching across open ground before the day disappears."],
  ["dock.jpg", "Dockside", "WATER", "Still water, weathered boards, and a good excuse to stay a little longer."],
  ["fishing.jpg", "Slow afternoon", "OUTSIDE", "No rush, no notifications, just patience and time near the water."],
  ["germany.jpg", "Old streets", "EUROPE", "Following unfamiliar streets and letting the details decide where to turn next."],
  ["mountain1.jpg", "Higher ground", "TRAIL", "The climb gets quieter as the view gets wider."],
  ["mountain2.jpg", "Above the noise", "PEAKS", "A little distance from everything, with enough elevation to reset perspective."],
  ["music.jpg", "Full volume", "MUSIC", "One of those nights where the room, the sound, and the crowd move together."],
  ["night.jpg", "City after dark", "NIGHT", "The city feels different when the daylight leaves and every sign switches on."],
  ["night2.jpg", "Blue hour", "CITY", "That brief window when daylight and city lights share the same frame."],
  ["park.jpg", "Green detour", "NATURE", "A break from straight lines, schedules, and taking the quickest route."],
  ["park2.jpg", "Take the long way", "PATH", "The better route is sometimes the one with no reason to hurry."],
  ["sea.jpg", "Nothing but blue", "WATER", "A wide stretch of water that makes everything else feel smaller."],
  ["sky2.jpg", "Look up", "SKY", "Proof that the best part of the view is not always at eye level."],
  ["skyline.jpg", "From up here", "CITY", "A familiar city rearranged into shapes, lights, and distance."],
  ["skyline2.jpg", "City lines", "CITY", "Glass, concrete, and streets drawing their own geometry across the horizon."],
  ["sun1.jpg", "Chasing light", "SUN", "Staying out long enough to catch the last good light of the day."],
].map(([file, title, tag, description]) => ({
  id: file.replace(/\.[^.]+$/, ""),
  src: `${import.meta.env.BASE_URL}outsideoftech/web/${file}`,
  alt: `${title}, from Alexander's life outside of tech`,
  title,
  tag,
  description,
  focus: "50% 50%",
}));

const preloadImage = (src) => {
  if (typeof Image === "undefined" || imageCache.has(src)) {
    return imageCache.get(src)?.promise ?? Promise.resolve();
  }

  const image = new Image();
  image.decoding = "async";

  const promise = new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;

      if (typeof image.decode === "function") {
        image.decode().catch(() => {}).finally(resolve);
      } else {
        resolve();
      }
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = src;
  });

  imageCache.set(src, { image, promise });
  return promise;
};

const preloadAround = (index, radius = 2) => {
  for (let distance = 0; distance <= radius; distance += 1) {
    const offsets = distance === 0 ? [0] : [distance, -distance];
    offsets.forEach((offset) => {
      const target = (index + offset + moments.length) % moments.length;
      preloadImage(moments[target].src);
    });
  }
};

function OutsideTech() {
  const sectionRef = useRef(null);
  const [featuredIndex, setFeaturedIndex] = useState(INITIAL_FEATURED_INDEX);
  const [activeIndex, setActiveIndex] = useState(null);
  const featuredMoment = moments[featuredIndex];
  const activeMoment = activeIndex === null ? null : moments[activeIndex];
  const hasCompactTitle =
    featuredMoment.title.length > 13 ||
    featuredMoment.title.split(" ").some((word) => word.length > 8);

  useEffect(() => {
    let observer;
    let idleId;
    let timer;
    let started = false;

    const startPreloading = () => {
      if (started) return;
      started = true;
      preloadAround(INITIAL_FEATURED_INDEX, 3);

      timer = window.setTimeout(() => {
        const preloadRemaining = () => moments.forEach((moment) => preloadImage(moment.src));

        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(preloadRemaining, { timeout: 4000 });
        } else {
          preloadRemaining();
        }
      }, 350);
    };

    if ("IntersectionObserver" in window && sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            startPreloading();
            observer.disconnect();
          }
        },
        { rootMargin: "1000px 0px" },
      );
      observer.observe(sectionRef.current);
    } else {
      startPreloading();
    }

    return () => {
      observer?.disconnect();
      if (timer !== undefined) window.clearTimeout(timer);
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + moments.length) % moments.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % moments.length);
      }
    };

    document.body.classList.add("gallery-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("gallery-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const move = (direction) => {
    setActiveIndex((current) => {
      const next = (current + direction + moments.length) % moments.length;
      preloadAround(next, 3);
      return next;
    });
  };

  const moveFeatured = (direction) => {
    setFeaturedIndex((current) => {
      const next = (current + direction + moments.length) % moments.length;
      preloadAround(next, 3);
      return next;
    });
  };

  return (
    <section ref={sectionRef} id="outside" className="travel-section">
      <div className="travel-ribbon" aria-hidden="true">
        <span>FIELD NOTES</span>
        <i />
        <span>{moments.length} ENTRIES</span>
        <i />
        <span>PACK LIGHT</span>
        <i />
        <span>LOOK UP</span>
      </div>

      <div className="page-shell travel-shell">
        <div className="travel-intro" data-reveal>
          <div className="travel-stamp">
            <FiCamera />
            <span>03</span>
            <strong>FIELD NOTES</strong>
          </div>

          <div className="travel-heading">
            <span className="micro-label">Life beyond the terminal</span>
            <h2>
              I COLLECT
              <em>HORIZONS.</em>
            </h2>
          </div>

          <div className="travel-copy">
            <p>
              When the laptop closes, I go looking for elevation, unfamiliar
              streets, loud music, and somewhere worth stopping.
            </p>

            <div className="travel-coordinates" aria-label="Outside interests">
              <span><FiMapPin /> VANCOUVER -&gt; WHEREVER</span>
              <span>PACK LIGHT / CAMERA READY</span>
            </div>
          </div>
        </div>

        <div className="travel-book" data-reveal>
          <div className="notebook-rings" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => <i key={index} />)}
          </div>

          <button
            className="notebook-page notebook-photo-page"
            type="button"
            onClick={() => setActiveIndex(featuredIndex)}
            aria-label={`Open featured photo: ${featuredMoment.title}`}
          >
            <span className="notebook-entry">
              ENTRY {String(featuredIndex + 1).padStart(2, "0")} / {moments.length}
            </span>
            <img
              src={featuredMoment.src}
              alt={featuredMoment.alt}
              decoding="async"
              fetchPriority="high"
              loading="lazy"
              style={{ "--focus": featuredMoment.focus }}
            />
            <span className="travel-photo-tape" aria-hidden="true" />
            <span className="notebook-photo-caption">{featuredMoment.tag} / VIEW FULL PHOTO</span>
          </button>

          <article className="notebook-page notebook-notes-page">
            <div className="notebook-page-topline">
              <span>OFF THE CLOCK</span>
              <span>VANCOUVER -&gt; EVERYWHERE</span>
            </div>

            <div className="notebook-entry-copy">
              <span className="travel-feature-kicker">CURRENT ENTRY / {featuredMoment.tag}</span>
              <h3 className={hasCompactTitle ? "compact-title" : undefined}>
                {featuredMoment.title}
              </h3>
              <p>{featuredMoment.description}</p>

              <div className="notebook-scribble" aria-hidden="true">
                keep moving / stay curious
              </div>
            </div>

            <div className="notebook-page-footer">
              <div className="travel-feature-controls">
                <button type="button" onClick={() => moveFeatured(-1)} aria-label="Previous frame">
                  <FiChevronLeft />
                </button>
                <span>{String(featuredIndex + 1).padStart(2, "0")} / {moments.length}</span>
                <button type="button" onClick={() => moveFeatured(1)} aria-label="Next frame">
                  <FiChevronRight />
                </button>
              </div>

              <span className="notebook-turn-note">FLIP THROUGH THE NOTEBOOK</span>
            </div>
          </article>
        </div>
      </div>

      {activeMoment && (
        <div
          className="life-lightbox-backdrop"
          role="presentation"
          onMouseDown={() => setActiveIndex(null)}
        >
          <section
            className="life-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeMoment.title} photo`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="lightbox-topline">
              <span>FRAME {String(activeIndex + 1).padStart(2, "0")} / {moments.length}</span>
              <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close photo">
                <FiX />
              </button>
            </div>

            <div
              className="lightbox-photo"
              style={{ "--focus": activeMoment.focus }}
            >
              <img
                src={activeMoment.src}
                alt={activeMoment.alt}
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <div className="lightbox-caption">
              <div>
                <span className="micro-label">{activeMoment.tag}</span>
                <h3>{activeMoment.title}</h3>
                <p>{activeMoment.description}</p>
              </div>
              <div className="lightbox-controls">
                <button type="button" onClick={() => move(-1)} aria-label="Previous photo">
                  <FiChevronLeft />
                </button>
                <button type="button" onClick={() => move(1)} aria-label="Next photo">
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export default OutsideTech;
