import { BellRing, EarOff, BatteryLow } from "lucide-react";

const problems = [
  {
    icon: BellRing,
    title: "Most alarms don't need action",
    body: "A loose sensor, a shifted arm, or a brief dip in a reading is enough to set off a monitor. Across a shift, staff hear dozens of alerts that turn out to be nothing.",
  },
  {
    icon: EarOff,
    title: "Staff start to tune them out",
    body: "When every alarm sounds urgent, none of them are. Responses slow, alarms get silenced, and the one that signals real deterioration can get lost among the false ones.",
  },
  {
    icon: BatteryLow,
    title: "The constant noise wears people down",
    body: "Repeated interruptions add stress and break concentration during other tasks, adding to burnout in teams that are already stretched thin.",
  },
];

export const AlarmFatigueSection = () => {
  return (
    <section id="problem" className="py-24 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shine animate-text-shine">
            When every alarm sounds urgent, none of them are
          </h2>
          <p className="text-foreground/80 text-sm sm:text-lg">
            Alarm fatigue is a recognized patient-safety concern. NRSAA focuses
            on meaningful changes in vital signs instead of every momentary
            fluctuation, so an alert deserves attention when it sounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {problems.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-card card-hover rounded-lg p-6"
            >
              <Icon className="h-8 w-8 text-primary mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
