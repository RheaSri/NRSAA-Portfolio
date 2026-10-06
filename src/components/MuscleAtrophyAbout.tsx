import { useEffect, useRef } from "react";
import { Footprints } from "lucide-react";

export const MuscleAtrophyAbout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const icon = iconRef.current;
    if (!container || !track || !icon) return;

    // Leave the icon at the start if the user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;

      // 0 when the section reaches 60% of the viewport, 1 when its bottom does
      const rect = container.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight * 0.6 - rect.top) / rect.height, 0),
        1
      );

      if (window.innerWidth < 768) {
        // Mobile: horizontal
        const distance = track.clientWidth - icon.offsetWidth;
        icon.style.transform = `translate3d(${progress * distance}px, 0, 0)`;
      } else {
        // Desktop: vertical
        const distance = track.clientHeight - icon.offsetHeight;
        icon.style.transform = `translate3d(0, ${progress * distance}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="muscle-atrophy" className="py-24 px-4">
      <div
        ref={containerRef}
        className="container max-w-5xl mx-auto flex flex-col gap-6 md:grid md:grid-cols-[1fr_auto] md:gap-10 text-left"
      >
        {/* Text */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">For patients</h2>
          <p className="text-xl font-semibold text-primary mb-6">
            Monitoring that moves with the patient.
          </p>

          <div className="space-y-4 text-foreground/80 leading-relaxed max-w-2xl">
            <p>
              Being confined to bed is one of the fastest ways to lose muscle
              strength. Muscle atrophy slows recovery, extends hospital stays,
              and makes it harder for patients to regain their independence.
            </p>
            <p>
              Patients often end up stuck in bed for a simple reason: they need
              to stay connected to monitoring equipment. Even a trip to the
              washroom becomes a task that takes extra time and effort.
            </p>
            <p>
              NRSAA is a portable device that monitors vital signs continuously
              wherever the patient is. Patients no longer have to stay in bed
              just to stay monitored. They can move, sit up, and use the
              washroom with far less hassle, while their care team keeps a
              constant eye on them.
            </p>
          </div>
        </div>

        {/* Footstep track: horizontal and sticky on mobile, vertical on desktop */}
        <div
          ref={trackRef}
          className="order-1 md:order-2 w-full h-19 md:w-19 md:h-auto sticky top-24 md:static z-10 bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        >

          <div
            ref={iconRef}
            className="relative z-1 w-fit p-4 rounded-full bg-card will-change-transform"
          >
            <Footprints
              className="h-10 w-10 text-primary rotate-90 md:rotate-180"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
