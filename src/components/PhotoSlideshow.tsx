import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import photo1 from "../assets/cre8.jpg"
import photo2 from "../assets/StartupDojo.jpg"
import photo3 from "../assets/ExpandNorthStar.jpg"
import photo4 from "../assets/SealTheDeal.jpg"

type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

const photos: Photo[] = [
  { src: photo1, alt: "Photo 1 description", caption: "Arab Health" },
  { src: photo2, alt: "Photo 2 description", caption: "Startup Dojo+" },
  { src: photo3, alt: "Photo 3 description", caption: "Expand Northstar" },
  { src: photo4, alt: "Photo 4 description", caption: "Seal The Deal" },
];

const AUTOPLAY_MS = 5000;

export default function PhotoSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    []
  );

  // Autoplay, skipped when paused or when the user prefers reduced motion
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (paused || reduceMotion) return;

    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="mb-16 w-full max-w-2xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="NRSAA photos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/20 bg-card">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />

            {photo.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-6 pb-5 pt-16 text-sm text-white md:text-base">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}

        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full bg-primary transition-all ${
              i === index ? "w-8 opacity-100" : "w-3 opacity-30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
