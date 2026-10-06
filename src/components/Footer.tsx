import { ArrowUp, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Technology", href: "/technology#project" },
  { label: "Achievements", href: "/achievements" },
];

const emails = [
  "nikita@nrsaa.com",
  "rhea@nrsaa.com",
  "samrin@nrsaa.com",
];

const linkedinUrl = "https://www.linkedin.com/company/nrsaa";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // text-left is needed because #root sets text-align: center
    <footer className="border-t border-border/20 bg-background text-left text-foreground">
      <div className="container px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <p className="text-2xl font-semibold tracking-tight">NRSAA</p>
            <p className="mt-3 max-w-xs text-sm leading-6 opacity-60">
              Non-Restrictive Sensing with Algorithmic Assistance
            </p>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NRSAA on LinkedIn"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/20 transition hover:border-primary hover:text-primary"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="opacity-60 transition hover:text-primary hover:opacity-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 opacity-60 transition hover:text-primary hover:opacity-100"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-14 max-w-3xl text-xs leading-5 opacity-45">
          NRSAA is a research prototype and is not a certified medical device.
          It is intended to support, not replace, the clinical judgement of
          qualified healthcare staff.
        </p>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-border/20 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="opacity-55">
            © {year} NRSAA. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 opacity-55 transition hover:text-primary hover:opacity-100"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
