import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import blueprint from "../assets/blueprint.png";
import product from "../assets/dashboard.png";
import animation from "../assets/platform.webm";
import animationStill from "../assets/platform_final.png";

// Total flip time in seconds. Raise it for a slower, floatier page.
const FLIP_S = 1.2;

export const PlatformBlueprint = () => {
  const [flipped, setFlipped] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);

    const sheet = sheetRef.current;
    const shadow = shadowRef.current;
    const root = rootRef.current;
    if (!sheet || !shadow || !root) return;

    tlRef.current?.kill();

    const target = next ? 180 : 0;

    if (reduceMotion) {
      gsap.set(sheet, { rotationY: target });
      return;
    }

    const sheens = root.querySelectorAll(".sheen");
    const lean = next ? 1 : -1; // mirrors the bend when flipping back
    const half = FLIP_S / 2;

    const tl = gsap.timeline();

    // 1. The turn itself
    tl.to(
      sheet,
      { rotationY: target, duration: FLIP_S, ease: "power2.inOut" },
      0
    );

    // 2. Paper behavior
    tl.to(
      sheet,
      {
        y: -14,
        scale: 1.05,
        rotationX: 7 * lean,
        rotationZ: 2 * lean,
        skewY: -5 * lean,
        duration: half,
        ease: "sine.out",
      },
      0
    );

    // settle flat on the way down
    tl.to(
      sheet,
      {
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationZ: 0,
        skewY: 0,
        duration: half,
        ease: "sine.inOut",
      },
      half
    );

    // 3. Light catching the paper surface
    tl.to(sheens, { opacity: 1, duration: half, ease: "sine.out" }, 0);
    tl.to(sheens, { opacity: 0, duration: half, ease: "sine.in" }, half);

    // 4. Shadow narrows as the sheet goes edge-on, then widens again
    tl.to(
      shadow,
      { scaleX: 0.5, opacity: 0.15, duration: half, ease: "sine.out" },
      0
    );
    tl.to(
      shadow,
      { scaleX: 1, opacity: 0.35, duration: half, ease: "sine.inOut" },
      half
    );

    tlRef.current = tl;
  };

  return (
    <div ref={rootRef} className="flex w-full flex-col items-center gap-10">

      {/* Flip Container */}
      <div className="perspective-1000 relative aspect-6/5 w-full max-w-lg md:max-w-150">

        {/* Ground shadow */}
        <div
          ref={shadowRef}
          aria-hidden="true"
          className="absolute inset-x-6 -bottom-5 h-6 rounded-[50%] bg-foreground blur-xl"
          style={{ opacity: 0.35 }}
        />

        {/* The sheet of paper */}
        <div
          ref={sheetRef}
          className="transform-style-preserve-3d relative h-full w-full will-change-transform"
        >

          {/* FRONT - Blueprint */}
          <div
            aria-hidden={flipped}
            className="backface-hidden absolute inset-0 overflow-hidden rounded-xl"
          >
            <img
              src={blueprint}
              alt="Blueprint of the NRSAA platform"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Animation Overlay */}
            {!animationDone && (
              <video
                src={animation}
                autoPlay
                muted
                playsInline
                aria-hidden="true"
                onEnded={() => setAnimationDone(true)}
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}

            {/* Final Animation Still */}
            {animationDone && (
              <img
                src={animationStill}
                alt="Platform blueprint, final state"
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}

          </div>

          {/* BACK - Finished Product */}
          <div
            aria-hidden={!flipped}
            className="backface-hidden rotate-y-180 absolute inset-0 overflow-hidden rounded-xl"
          >
            <img
              src={product}
              alt="The finished NRSAA platform dashboard"
              className="h-full w-full object-contain"
            />

            
          </div>

        </div>
      </div>

      {/* Button */}
      <button
        onClick={toggle}
        className="cosmic-button"
      >
        {flipped ? "View Blueprint" : "View Product"}
      </button>

    </div>
  );
};
