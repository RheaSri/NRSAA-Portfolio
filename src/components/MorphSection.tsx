import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import {
  ArrowRight,
  Cpu,
  BrainCircuit,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(MorphSVGPlugin);

const NS = "http://www.w3.org/2000/svg";

const STEPS = [
  {
    Icon: Cpu,
    title: "NRSAA Device",
    text: "High quality sensors on the portable device collect raw readings and send them onward.",
    href: "#device",
    linkLabel: "Explore the device",
  },
  {
    Icon: BrainCircuit,
    title: "NRSAA AI",
    text: "The model learns from those readings and flags what matters.",
    href: "#ai",
    linkLabel: "Explore the AI",
  },
  {
    Icon: LayoutDashboard,
    title: "NRSAA Dashboard",
    text: "Results appear as live charts and alerts you can act on.",
    href: "#dashboard",
    linkLabel: "Explore the dashboard",
  },
] as const;

const STEP_MS = 3800;

// Convert the Lucide icon into one compound path string.
const cache = new Map<LucideIcon, string>();
function iconToPathData(Icon: LucideIcon): string {
  const cached = cache.get(Icon);
  if (cached) return cached;

  // Render the icon to markup, then pull its shapes out
  const holder = document.createElement("div");
  holder.innerHTML = renderToStaticMarkup(<Icon />);
  const source = holder.querySelector("svg")!;

  const svg = document.createElementNS(NS, "svg");
  svg.style.cssText = "position:absolute;width:0;height:0;visibility:hidden";
  document.body.appendChild(svg);
  Array.from(source.children).forEach((child) => svg.appendChild(child));

  const paths = MorphSVGPlugin.convertToPath(
    Array.from(svg.children) as unknown as Parameters<
      typeof MorphSVGPlugin.convertToPath
    >[0]
  );
  const d = paths.map((p) => p.getAttribute("d")).join(" ");
  svg.remove();

  cache.set(Icon, d);
  return d;
}

export const MorphSection = () => {
  const [active, setActive] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [initialD] = useState(() => iconToPathData(STEPS[0].Icon));
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Morph whenever the active step changes
  useEffect(() => {
    if (!pathRef.current) return;
    const tween = gsap.to(pathRef.current, {
      duration: reduceMotion ? 0 : 0.9,
      ease: "power2.inOut",
      morphSVG: {
        shape: iconToPathData(STEPS[active].Icon),
        map: "complexity",
        shapeIndex: "auto",
      },
      overwrite: "auto",
    });
    return () => {
      tween.kill();
    };
  }, [active, reduceMotion]);

  // Auto-advance; restarts after any manual click
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % STEPS.length),
      STEP_MS
    );
    return () => window.clearTimeout(id);
  }, [active, reduceMotion]);

  return (
    <section id="project" className="py-24 sm:pt-60 sm:pb-24 px-4 min-h-screen">
      <div className="container">
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* Steps */}
          <div className="text-left">
            <h2 className="text-3xl font-bold md:text-4xl">
              The NRSAA Tech Stack
            </h2>

            <ol className="mt-8 space-y-3" aria-live="polite">
              {STEPS.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.title}>
                    <div
                      className={`relative overflow-hidden rounded-xl border transition-colors duration-300 ${
                        isActive
                          ? "border-primary/20 bg-card"
                          : "border-border/20 opacity-60 hover:opacity-100 focus-within:opacity-100"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-current={isActive ? "step" : undefined}
                        className="block w-full p-4 pb-2 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                      >
                        <span className="block text-lg font-semibold">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-sm">{step.text}</span>
                      </button>

                      <a
                        href={step.href}
                        className="group inline-flex items-center gap-1.5 px-4 pb-4 text-sm font-medium underline decoration-primary underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {step.linkLabel}
                        <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      </a>

                      {/* Timer bar for the active step */}
                      {isActive && !reduceMotion && (
                        <span
                          key={active}
                          className="absolute bottom-0 left-0 h-0.5 bg-primary"
                          style={{
                            animation: `step-progress ${STEP_MS}ms linear forwards`,
                          }}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Morphing icon */}
          <div className="flex justify-center">
            <div className="flex aspect-square w-full max-w-sm items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3/5 w-3/5 text-primary"
                aria-hidden="true"
              >
                <path ref={pathRef} d={initialD} />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes step-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};
