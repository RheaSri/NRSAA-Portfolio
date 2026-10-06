import { AlarmFatigueSection } from "./AlarmFatigueSection";
import { MuscleAtrophyAbout } from "./MuscleAtrophyAbout";
import { NursesSection } from "./NursesSection";

export const AboutSection = () => {
  return (
    <section
      id="about"
    >
      <AlarmFatigueSection />
      <MuscleAtrophyAbout />
      <NursesSection />

    </section>
  );
};