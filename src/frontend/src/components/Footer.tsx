import { Link } from "@tanstack/react-router";
import { MorganLogo } from "./MorganLogo";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="mt-auto"
      style={{
        background: "oklch(0.13 0.03 240)",
        borderTop: "1px solid oklch(1 0 0 / 10%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <MorganLogo size={28} />
              <span className="text-base font-bold text-foreground">
                Morgan
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A transparent compensation awareness program helping eligible
              participants understand their benefits.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Program
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/giveaway"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Giveaway Info
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/assistant"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Account
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/signup"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground"
          style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <span>
            © {year} Morgan Compensation Program. All rights reserved.
          </span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
