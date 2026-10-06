import { HeartPulse, Wifi, BrainCircuit, LayoutDashboard } from "lucide-react";

const steps = [
  {
    icon: HeartPulse,
    title: "Sensors collect vital signs",
    body: "Connected medical sensors measure heart rate, blood oxygen saturation (SpO₂), ECG, and temperature.",
  },
  {
    icon: Wifi,
    title: "Data is sent securely",
    body: "Readings are transmitted securely to the NRSAA platform as they are recorded.",
  },
  {
    icon: BrainCircuit,
    title: "Models look for patterns",
    body: "Deep learning models analyse the incoming signals to identify patterns and potential abnormalities.",
  },
  {
    icon: LayoutDashboard,
    title: "Nurses see what matters",
    body: "Insights appear on a clear dashboard that highlights important patient information and alerts.",
  },
];

export const NursesSection = () => {
  return (
    <section id="nurses" className="py-24 px-4">
      <div className="container max-w-5xl mx-auto text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">For nurses</h2>
        <p className="text-xl font-semibold text-primary mb-6">
          Less raw data to interpret. More time with patients.
        </p>

        <div className="space-y-4 text-foreground/80 leading-relaxed max-w-2xl mb-14">
          <p>
            Nurses are under sustained pressure. Burnout is common among
            healthcare providers in the Middle East, with studies mostly
            estimating it at 40 to 60 percent, and many expatriate nurses
            leave the Gulf for other countries, which adds to staffing
            shortages.
          </p>
          <p>
            NRSAA is built to support nurses by making patient monitoring more
            efficient and easier to interpret. Instead of reading large amounts
            of raw data themselves, nurses get a clear overview of their
            patients, so they can quickly spot changes that need attention with
            less of the mental load of continuous monitoring.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="bg-card card-hover rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8 text-primary animate-pulse-subtle" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground/60">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {body}
              </p>
            </li>
          ))}
        </ol>

        <p className="text-xs text-foreground/60 mt-8 max-w-2xl">
          Burnout range: Chemali et al., systematic review of burnout among
          healthcare providers in the Middle East, BMC Public Health, 2019.
        </p>
      </div>
    </section>
  );
};
