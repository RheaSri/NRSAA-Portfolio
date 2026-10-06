import { Check } from "lucide-react";

type Part = {
  name: string;
  detail: string;
};

type DeviceGroup = {
  title: string;
  description: string;
  parts: Part[];
};

const groups: DeviceGroup[] = [
  {
    title: "Monitoring Device",
    description:
      "A small sensor module worn by the patient. It collects the signals the AI needs and sends them on wirelessly.",
    parts: [
      {
        name: "Sensor Module",
        detail: "The compact unit that gathers and transmits patient data.",
      },
      {
        name: "Chest Leads",
        detail: "Three electrodes on the chest record the electrocardiogram (ECG).",
      },
      {
        name: "Armband for Contact Sensors",
        detail: "Measures oxygen saturation and temperature.",
      },
      {
        name: "Flexible Sensor Ports",
        detail: "Sensors plug in as needed, so the setup can fit each patient.",
      },
    ],
  },
  {
    title: "Base Station",
    description:
      "A communication hub that receives the signals and runs the deep learning algorithm to classify them.",
    parts: [
      {
        name: "Communication Hub",
        detail: "Receives patient data from the sensor module.",
      },
      {
        name: "ZigBee 3 Antenna",
        detail: "Wireless link between the sensor module and the hub.",
      },
      {
        name: "Ethernet Connection",
        detail: "Connects the hub to the hospital network.",
      },
    ],
  },
];

const benefits = [
  {
    title: "Wireless transmission",
    description:
      "Patients stay mobile instead of being tied to a bedside monitor, which helps combat muscle atrophy.",
  },
  {
    title: "Fewer false alarms",
    description:
      "The deep learning algorithm classifies signals before they reach staff, so alarms are worth acting on.",
  },
];

export default function DeviceSection() {
  return (
    // text-left is needed because #root sets text-align: center
    <section id="device" className="bg-background px-4 py-24 text-left text-foreground">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-lg font-semibold uppercase tracking-[0.25em] text-primary">
            The Device
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Two parts, one connected system.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 opacity-65">
            A wearable sensor module collects the patient's signals and sends
            them wirelessly to a base station, where the AI decides what
            deserves attention.
          </p>
        </div>

        {/* Device groups */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-border/20 bg-card p-7 md:p-8"
            >
              <h3 className="text-2xl font-semibold">{group.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-6 opacity-65">
                {group.description}
              </p>

              <ul className="mt-6 divide-y divide-border/20 border-t border-border/20">
                {group.parts.map((part) => (
                  <li
                    key={part.name}
                    className="grid gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-6"
                  >
                    <span className="font-medium">{part.name}</span>
                    <span className="text-sm leading-6 opacity-60">
                      {part.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex gap-4 rounded-2xl border border-border/20 p-6"
            >
              <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />

              <div>
                <h4 className="font-semibold">{benefit.title}</h4>
                <p className="mt-1 text-sm leading-6 opacity-65">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
