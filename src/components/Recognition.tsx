import PhotoSlideshow from "./PhotoSlideshow";

type Achievement = {
  big: string;
  suffix?: string;
  title: string;
  sub?: string;
};

type Article = {
  outlet: string;
  title: string;
  url: string;
};

const achievements: Achievement[] = [
  { big: "1", suffix: "st", title: "Cre8", sub: "Arab Health" },
  { big: "2", suffix: "nd", title: "Envision the Future", sub: "Dell" },
  { big: "3", suffix: "rd", title: "Startup Dojo+ Pitch Competition" },
  { big: "$20k", title: "Grant", sub: "Awarded by SRITP" },
  { big: "Finalist", title: "UAE IoT Challenge" },
];

const exhibitions: string[] = [
  "Make it in the Emirates",
  "Sharjah Entrepreneurship Festival",
  "Expand North Star",
];

const articles: Article[] = [
  {
    outlet: "American University of Sharjah",
    title:
      "AUS team claims first prize in Arab Health 2024 Cre8 Competition with cutting-edge monitoring technology",
    url: "https://www.aus.edu/media/news/aus-team-claims-first-prize-in-arab-health-2024-cre8-competition-with-cutting-edge-monitoring-technology-0",
  },
  {
    outlet: "Gulf Today",
    title:
      "Sheikha Bodour launches MCM Student-Run Agency at American University of Sharjah",
    url: "https://gulftoday.ae/news/2024/09/05/sheikha-bodour-launches-mcm-student-run-agency",
  },
  {
    outlet: "American University of Sharjah",
    title:
      "Sharjah Launches 'Seal the Deal' to Support University Startups, raises AED 520,000",
    url: "https://www.aus.edu/media/news/sharjah-launches-seal-the-deal-to-support-university-startups-raises-aed-520000",
  },
  {
    outlet: "Dell Technologies",
    title:
      "Dell Technologies Envision the Future Annual Graduation Project Competition 2024!",
    url: "https://www.dell.com/en-ae/dt/campaigns/ecs-internet-things/envision-the-future/winners.htm#scroll=off&tab0=1",
  },
  {
    outlet: "Emirates News Agency-WAM",
    title:
      "Sheraa champions startup-led innovation at Make it in the Emirates",
    url: "https://www.wam.ae/en/article/bjr4hkp-sheraa-champions-startup-led-innovation-make-the",
  },
];

const accent = "text-primary";

export default function Recognition() {
  return (
    <section id="recognition" className="px-4 py-30">
      <div className="container text-left">
        <div className="pt-15 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="max-w-[14ch] text-3xl font-semibold leading-[1.05] md:text-5xl text-shine animate-text-shine">
              NRSAA, recognized across the UAE
            </h2>
            <p className="mt-3 max-w-[48ch] opacity-75">
              Competition wins, funding, exhibitions and press coverage from our
              first years building monitoring technology.
            </p>
          </div>

          <PhotoSlideshow />
        </div>


        <h3 className="mb-5 text-2xl font-semibold">Achievements</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {achievements.map((a) => (
            <div
              key={a.title}
              className="min-h-50 shrink-0 grow-0 basis-full rounded-2xl card-hover bg-card p-7 md:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
            >
              <p className={`text-5xl font-semibold leading-[0.95] ${accent}`}>
                {a.big}
                {a.suffix && (
                  <span className="ml-0.5 text-2xl font-semibold">
                    {a.suffix}
                  </span>
                )}
              </p>
              <h4 className="mt-5 text-lg font-semibold">{a.title}</h4>
              {a.sub && <p className="opacity-70">{a.sub}</p>}
            </div>
          ))}
        </div>

        <h3 className="mb-5 mt-16 text-2xl font-semibold">Exhibited at</h3>
        <ul className="flex flex-wrap gap-2.5">
          {exhibitions.map((name) => (
            <li
              key={name}
              className="rounded-full border border-border/30 px-4 py-2"
            >
              {name}
            </li>
          ))}
        </ul>

        <h3 className="mb-5 mt-16 text-2xl font-semibold">In the news</h3>
        <div className="border-t border-border/20">
          {articles.map((a) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-1.5 border-b border-border/20 px-1 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:grid-cols-[200px_1fr] md:gap-6"
            >
              <span className={`font-semibold ${accent}`}>{a.outlet}</span>
              <span className="text-lg underline-offset-4 group-hover:underline group-focus-visible:underline">
                {a.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
