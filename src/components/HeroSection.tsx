import { ArrowDown } from "lucide-react";
//import heroVideoDark from "../assets/heartbeat_slow.webm";
//import heroVideoLight from "../assets/heartbeat_lt.webm"
import heroLight from "../assets/hero-light.webp"
import heroDark from "../assets/hero-dark.webp"

export const HeroSection = () => {

  //const videoClass = "w-full max-w-250 animate-heartbeat-glow";
  const videoClass = "h-auto w-full max-w-250 animate-heartbeat-glow";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
       {/* <div className="space-y-6 flex justify-center">
          <video
            src={heroVideoLight}
            autoPlay muted playsInline loop
            className={`${videoClass} block dark:hidden`}
          />
          <video
            src={heroVideoDark}
            autoPlay muted playsInline loop
            className={`${videoClass} hidden dark:block`}
          />
        </div> */}
        <div className="container max-w-4xl mx-auto text-center z-10">
          <div className="space-y-6 flex justify-center">
            <img
              src={heroLight}
              alt="NRSAA"
              className={`${videoClass} block dark:hidden`}
            />
            <img
              src={heroDark}
              alt=""
              aria-hidden="true"
              className={`${videoClass} hidden dark:block`}
            /> 
          </div>
        </div>
        <h1 className="text-xl sm:text-3xl font-bold text-foreground animate-fade-in py-3">
          <span className="text-primary text-xl sm:text-3xl font-bold animate-pulse-subtle">Smarter</span> monitoring.{" "}
          <span className="text-primary text-xl sm:text-3xl font-bold animate-pulse-subtle">Better</span> recovery.{" "}
          <span className="text-primary text-xl sm:text-3xl font-bold animate-pulse-subtle">Lighter</span> workloads.
        </h1>
        <p className="text-sm sm:text-lg text-foreground/80 animate-scan-text">NRSAA continuously tracks vital signs to catch problems early, helping prevent muscle atrophy in bedridden patients while cutting the alarm fatigue that wears down healthcare teams.</p>
      </div>
      <div className="absolute bottom-8   flex flex-col items-center animate-bounce">
            <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};