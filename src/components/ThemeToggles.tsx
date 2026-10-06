import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

type ThemeToggleProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  variant?: "icon" | "text";
  className?: string;
};

export const ThemeToggle = ({
  isDarkMode,
  toggleTheme,
  variant = "icon",
  className,
}: ThemeToggleProps) => {
  if (variant === "text") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "text-foreground/80 hover:text-primary transition-colors focus:outline-none",
          className
        )}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "rounded-full transition-colors duration-300 focus:outline-none",
        className
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};