import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import logoLight from "../assets/NRSAA (lt_tp).svg"
import logoDark from "../assets/NRSAA (dk_tp).svg";
import { ThemeToggle } from "./ThemeToggles";
import { useTheme } from "../hooks/useTheme";

const navItems = [
  { name: "Home", href: "/#hero", type: "section" },
  { name: "About", href: "/#about", type: "section" },
  { name: "Technology", href: "/technology", type: "page" },
  { name: "Achievements", href: "/achievements", type: "page" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300 border-b-4 border-border",
          isScrolled
            ? "py-3 bg-background/80 border-b-3 backdrop-blur-md shadow-xs"
            : "py-5"
        )}
      >
        <div className="px-3 sm:px-10 flex items-center justify-between">
          {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={isDarkMode ? logoDark : logoLight}
            alt="NRSAA"
            className="h-10 w-auto"
          />
        </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) =>
              item.type === "page" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-semibold"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-semibold"
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* Desktop-only icon toggle */}
          <div className="hidden md:block">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-md",
          "flex flex-col items-center justify-center",
          "transition-all duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto z-30"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center space-y-8 text-xl">
          {navItems.map((item) =>
            item.type === "page" ? (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            )
          )}

          {/* Text toggle inside hamburger menu */}
          <ThemeToggle
            variant="text"
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    </>
  );
};