import {
  Activity,
  ArrowUpRight,
  CircleAlert,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";
import { PlatformBlueprint } from "./PlatformBlueprint";

const DEMO_URL = "https://vitals-dashboard-vercel.vercel.app/";

const features = [
  {
    number: "01",
    title: "Fewer false alarms",
    description:
      "Severity-tiered alerts replace a single uniform alarm, so staff can tell what needs action now from what can wait.",
  },
  {
    number: "02",
    title: "Built for fast triage",
    description:
      "A clear visual hierarchy puts the most critical patients and alerts first, so decisions stay quick when the ward is under stress.",
  },
  {
    number: "03",
    title: "Accessible to every nurse",
    description:
      "WCAG-compliant contrast, and severity is never shown by color alone, so it works for all staff in all conditions.",
  },
];

// Colors are fixed (not theme tokens) so severity reads the same in light and dark mode.
const tiers = [
  {
    label: "Red Alert",
    text: "Needs action now",
    Icon: OctagonAlert,
    badge: "bg-red-600 text-[#060220]",
  },
  {
    label: "Orange ALert",
    text: "Needs attention soon",
    Icon: TriangleAlert,
    badge: "bg-orange-500 text-[#060220]",
  },
  {
    label: "Yellow Alert",
    text: "Worth monitoring",
    Icon: CircleAlert,
    badge: "bg-yellow-400 text-[#060220]",
  },
];

export const PlatformSection = () => {
  return (
    <section id="dashboard" className="scroll-mt-20 px-4 pt-32 pb-24 text-left">
      <div className="container">

        {/* Pitch + flip card */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.18em] text-primary">
              The Dashboard
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              A dashboard nurses already know how to read.
            </h2>

            <p className="mt-5 max-w-xl leading-7 opacity-70">
              The NRSAA dashboard cuts through alarm noise and helps staff act
              on the right patient first, without adding anything new to learn.
            </p>

            <div className="mt-8 flex max-w-xl gap-4 rounded-xl card-hover bg-card p-5">
              <Activity
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold">Familiar by design</p>
                <p className="mt-1 text-sm leading-6 opacity-70">
                  The layout follows how an ECG machine displays information,
                  so there is no learning curve and no extra burden on nurses.
                </p>
              </div>
            </div>

            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button mt-8 inline-flex items-center gap-2"
            >
              Try the demo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="flex justify-center">
            <PlatformBlueprint />
          </div>
        </div>

        {/* Three design goals */}
        <div className="mt-24 grid gap-3 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="rounded-xl border border-border/20 bg-card p-6"
            >
              <span className="font-mono text-xs opacity-40">
                {feature.number}
              </span>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 opacity-65">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Severity tiers */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold">
            Three severity levels. Never color alone.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 opacity-65">
            Each level pairs its color with its own shape and a text label, so
            it stays clear for colorblind staff and in poor lighting.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {tiers.map(({ label, text, Icon, badge }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-border/20 p-4"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${badge}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">{label}</p>
                  <p className="text-sm opacity-65">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
