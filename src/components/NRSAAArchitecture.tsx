import {ExternalLink } from "lucide-react";
import {useState } from "react";
import { Activity as ActivityIcon} from "lucide-react";

type FeatureStep = {
  id: string;
  title: string;
  metric: string;
  description: string;
};

type Result = {
  id: string;
  title: string;
  subtitle: string;
  accuracy?: number;
  precision: number;
  recall: number;
};

const featureSteps: FeatureStep[] = [
  {
    id: "01",
    title: "Standardize",
    metric: "5,000 samples",
    description:
      "ECG recordings were padded or truncated to a consistent length for uniform model input.",
  },
  {
    id: "02",
    title: "Denoise",
    metric: "Symlet-5 DWT",
    description:
      "Wavelet transformation reduced noise while preserving important ECG morphology.",
  },
  {
    id: "03",
    title: "Extract",
    metric: "HRV · PSD · DWT",
    description:
      "Heart-rate variability, spectral and wavelet features captured complementary cardiac patterns.",
  },
  {
    id: "04",
    title: "Context",
    metric: "Age · Gender",
    description:
      "Patient demographic information was added as contextual information for classification.",
  },
];

const results: Result[] = [
  {
    id: "01",
    title: "Baseline",
    subtitle: "SE-ResNet",
    accuracy: 84.63,
    precision: 88.87,
    recall: 81.27,
  },
  {
    id: "02",
    title: "+ Wavelet",
    subtitle: "DWT + SE-ResNet",
    accuracy: 88.06,
    precision: 89.05,
    recall: 82.1,
  },
  {
    id: "03",
    title: "+ Context",
    subtitle: "Demographics + K-Fold",
    precision: 90.26,
    recall: 86.57,
  },
  {
    id: "04",
    title: "Feature Model",
    subtitle: "HRV + PSD + DWT",
    accuracy: 92.01,
    precision: 83.51,
    recall: 93.14,
  },
];

export default function NRSAAArchitecture() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeAnatomy, setActiveAnatomy] = useState(2);
  const [activeResult, setActiveResult] = useState(3);

  return (
    <section id="ai" className="bg-background text-left text-foreground">
      <div className="container px-6 py-24">

        <div className="max-w-3xl pb-30">
          <p className="text-lg font-semibold uppercase tracking-[0.25em] text-primary">
            The AI
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            An AI that listens to the heart before it raises an alarm.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-65">
            NRSAA reads ECG recordings and classifies nine cardiac conditions,
            so staff are alerted to real changes in a patient instead of
            constant false alarms.
          </p>

          <div className="mt-10 flex gap-4 rounded-2xl card-hover bg-card p-6">
            <ActivityIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />

            <div>
              <h3 className="font-semibold">Built to catch what matters</h3>
              <p className="mt-1 text-sm leading-6 opacity-65">
                Our SE-ResNet model reaches 93.14% recall on the PhysioNet 2020
                dataset, so fewer genuine cardiac events slip through.
              </p>
            </div>
          </div>

  
        </div>

        {/* DATASET */}
        <SectionHeader
          eyebrow="01 · Dataset"
          title="Built on real cardiac data."
          description="ECG recordings from the PhysioNet 2020 Challenge dataset provided the foundation for training and evaluation."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value="500 Hz" label="Sampling rate" />
          <StatCard value="5,000" label="Samples / recording" />
          <StatCard value="3" label="ECG leads" />
          <StatCard value="9" label="Cardiac classes" />
        </div>

        <a
          href="https://physionet.org/content/challenge-2020/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium opacity-70 transition hover:text-primary hover:opacity-100"
        >
          View PhysioNet 2020
          <ExternalLink className="h-4 w-4" />
        </a>

        <Divider />

        {/* FEATURE ENGINEERING */}
        <SectionHeader
          eyebrow="02 · Feature Engineering"
          title="Turning ECG signals into usable features."
          description="The signal pipeline progressively standardized, cleaned and enriched each recording before classification."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">

          <div className="space-y-2">
            {featureSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveFeature(index)}
                className={`flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition ${
                  activeFeature === index
                    ? "border-primary bg-card"
                    : "border-border/20 hover:bg-card"
                }`}
              >
                <span className="font-mono text-xs opacity-40">
                  {step.id}
                </span>

                <span className="font-medium">
                  {step.title}
                </span>

                <span className="ml-auto text-xs opacity-50">
                  {step.metric}
                </span>
              </button>
            ))}
          </div>

          <div className="flex min-h-62.5 flex-col justify-center rounded-2xl border border-border/20 bg-card p-8">
            <span className="font-mono text-xs opacity-40">
              {featureSteps[activeFeature].id} / 04
            </span>

            <h3 className="mt-4 text-2xl font-semibold">
              {featureSteps[activeFeature].title}
            </h3>

            <p className="mt-2 text-sm font-medium opacity-50">
              {featureSteps[activeFeature].metric}
            </p>

            <p className="mt-5 max-w-xl leading-7 opacity-70">
              {featureSteps[activeFeature].description}
            </p>
          </div>
        </div>

        <Divider />

        {/* WHY SERESNET */}
        <SectionHeader
          eyebrow="03 · Model Choice"
          title="Why SE-ResNet?"
          description="ECG signals contain subtle patterns across many learned feature channels. SE-ResNet combines deep residual learning with attention that determines which channels deserve greater emphasis."
        />

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          <ReasonCard
            number="01"
            title="Residual Learning"
            description="Skip connections preserve information and support deeper feature learning."
          />

          <ReasonCard
            number="02"
            title="Channel Attention"
            description="SE blocks learn which feature channels are most informative."
          />

          <ReasonCard
            number="03"
            title="Adaptive Focus"
            description="Useful signals are emphasized while less informative responses are reduced."
          />
        </div>

        <Divider />

        {/* ANATOMY */}
        <SectionHeader
          eyebrow="04 · Inside The Model"
          title="Anatomy of an SE-Residual Block."
          description="Select each step to follow how a feature representation moves through the attention mechanism."
        />

        <SEResNetAnatomy
          active={activeAnatomy}
          setActive={setActiveAnatomy}
        />

        <Divider />

        {/* RESULTS */}
        <SectionHeader
          eyebrow="05 · Results"
          title="Improving the signal, one experiment at a time."
          description="Each iteration tested a different approach to signal representation and classification."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => setActiveResult(index)}
              className={`rounded-xl border p-5 text-left transition ${
                activeResult === index
                  ? "border-primary bg-card"
                  : "border-border/20 hover:bg-card"
              }`}
            >
              <span className="font-mono text-xs opacity-40">
                {result.id}
              </span>

              <p className="mt-3 font-medium">
                {result.title}
              </p>

              <p className="mt-1 text-xs opacity-50">
                {result.subtitle}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-border/20 bg-card p-7 md:p-10">

          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="font-mono text-xs opacity-40">
                EXPERIMENT {results[activeResult].id}
              </span>

              <h3 className="mt-3 text-3xl font-semibold">
                {results[activeResult].title}
              </h3>

              <p className="mt-2 opacity-60">
                {results[activeResult].subtitle}
              </p>
            </div>

            <div className="space-y-5">
              {results[activeResult].accuracy !== undefined && (
                <MetricBar
                  label="Accuracy"
                  value={results[activeResult].accuracy!}
                />
              )}

              <MetricBar
                label="Precision"
                value={results[activeResult].precision}
              />

              <MetricBar
                label="Recall"
                value={results[activeResult].recall}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ResultHighlight
            value="+7.38 pp"
            label="Accuracy improvement"
            detail="84.63% → 92.01%"
          />

          <ResultHighlight
            value="+11.87 pp"
            label="Recall improvement"
            detail="81.27% → 93.14%"
          />
        </div>

      </div>
    </section>
  );
}

/* -------------------------------------------------------
   SE-RESNET ANATOMY
------------------------------------------------------- */

const anatomy = [
  {
    number: "01",
    title: "Transform",
    formula: "X → F(X)",
    description:
      "Convolutional layers transform the incoming ECG representation into learned feature maps.",
  },
  {
    number: "02",
    title: "Squeeze",
    formula: "F(X) → z",
    description:
      "Global average pooling compresses each feature channel into a compact descriptor.",
  },
  {
    number: "03",
    title: "Excitation",
    formula: "z → s",
    description:
      "A small neural network learns an importance score for every channel.",
  },
  {
    number: "04",
    title: "Reweight",
    formula: "F(X) ⊙ s",
    description:
      "Feature channels are scaled according to their learned importance.",
  },
  {
    number: "05",
    title: "Residual Add",
    formula: "Y = X + F̃(X)",
    description:
      "The refined representation is combined with the original shortcut connection.",
  },
];

function SEResNetAnatomy({
  active,
  setActive,
}: {
  active: number;
  setActive: (value: number) => void;
}) {
  const current = anatomy[active];

  return (
    <div className="mt-10 grid overflow-hidden rounded-2xl border border-border/20 lg:grid-cols-[1.1fr_0.9fr]">

      <div className="border-b border-border/20 p-5 lg:border-b-0 lg:border-r">
        <div className="space-y-2">
          {anatomy.map((step, index) => (
            <button
              key={step.number}
              onClick={() => setActive(index)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition ${
                active === index
                  ? "bg-card"
                  : "hover:bg-card"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] ${
                  active === index
                    ? "border-primary text-primary"
                    : "border-border/20 opacity-50"
                }`}
              >
                {step.number}
              </span>

              <span className="font-medium">
                {step.title}
              </span>

              <code className="ml-auto text-xs opacity-40">
                {step.formula}
              </code>
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-border/30 p-4">
          <p className="text-sm font-medium">
            Residual Shortcut
          </p>

          <p className="mt-1 text-sm leading-6 opacity-50">
            The original representation bypasses the transformation and is
            added back at the end.
          </p>
        </div>
      </div>

      <div className="flex min-h-97.5 flex-col justify-between bg-card p-8">
        <div>
          <span className="font-mono text-xs opacity-40">
            {current.number} / 05
          </span>

          <h3 className="mt-5 text-3xl font-semibold">
            {current.title}
          </h3>

          <code className="mt-4 inline-flex rounded-lg border border-border/20 px-3 py-2 text-sm">
            {current.formula}
          </code>

          <p className="mt-6 max-w-md leading-7 opacity-65">
            {current.description}
          </p>

          <AnatomyVisual step={active} />
        </div>

        <div className="mt-8 flex gap-2">
          {anatomy.map((_, index) => (
            <button
              key={index}
              aria-label={`View step ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-1 rounded-full bg-primary transition-all ${
                active === index
                  ? "w-8 opacity-100"
                  : "w-3 opacity-25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnatomyVisual({ step }: { step: number }) {
  if (step === 2) {
    const values = [74, 36, 91, 52, 82];

    return (
      <div className="mt-8 space-y-3">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-5 font-mono text-[10px] opacity-40">
              C{index + 1}
            </span>

            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${value}%`,
                  opacity: 0.5 + value / 200,
                }}
              />
            </div>

            <span className="w-8 text-right font-mono text-[10px] opacity-40">
              {(value / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="mt-10 flex items-center gap-4 text-sm">
        <MiniBox>X</MiniBox>
        <span className="opacity-30">+</span>
        <MiniBox>F̃(X)</MiniBox>
        <span className="opacity-30">→</span>
        <MiniBox>Y</MiniBox>
      </div>
    );
  }

  return (
    <div className="mt-10 flex items-end gap-2">
      {[40, 62, 85, 54, 72, 45].map((height, index) => (
        <div
          key={index}
          className="w-7 rounded-md border border-border/20 bg-background"
          style={{
            height,
            opacity: 0.45 + index * 0.08,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   SHARED COMPONENTS
------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl leading-7 opacity-60">
        {description}
      </p>
    </div>
  );
}

function StatCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="rounded-xl border border-border/20 bg-card p-5">
      <div className="text-2xl font-semibold">
        {value}
      </div>

      <p className="mt-2 text-sm opacity-55">
        {label}
      </p>

      {detail && (
        <p className="mt-1 text-xs opacity-35">
          {detail}
        </p>
      )}
    </div>
  );
}

function ReasonCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/20 bg-card p-6">
      <span className="font-mono text-xs opacity-35">
        {number}
      </span>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 opacity-55">
        {description}
      </p>
    </div>
  );
}

function MetricBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="opacity-55">
          {label}
        </span>

        <span className="font-mono">
          {value.toFixed(2)}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ResultHighlight({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-border/20 bg-card p-6">
      <div className="text-3xl font-semibold text-primary">
        {value}
      </div>

      <p className="mt-2 text-sm opacity-60">
        {label}
      </p>

      <p className="mt-1 font-mono text-xs opacity-35">
        {detail}
      </p>
    </div>
  );
}

function MiniBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/20 bg-background px-4 py-3 font-mono">
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="my-24 border-t border-border/20" />
  );
}
