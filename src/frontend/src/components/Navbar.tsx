import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { MorganLogo } from "./MorganLogo";

const navLinks = [
  { label: "Home", href: "/" as const },
  { label: "Giveaway", href: "/giveaway" as const },
  { label: "Support", href: "/support" as const },
  { label: "Terms", href: "/terms" as const },
];

export function Navbar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { identity, clear } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "oklch(0.17 0.05 240 / 90%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(1 0 0 / 10%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center h-16 gap-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 flex-shrink-0"
          data-ocid="nav.link"
        >
          <MorganLogo size={30} />
          <span className="text-lg font-bold text-foreground tracking-tight">
            Morgan
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              data-ocid="nav.link"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              data-ocid="nav.link"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => clear()}
              data-ocid="nav.button"
              className="hidden md:flex border-white/15 text-muted-foreground hover:text-foreground hover:border-white/30"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/login" data-ocid="nav.link">
              <Button
                size="sm"
                data-ocid="nav.primary_button"
                className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 font-semibold"
              >
                Login / Sign Up
              </Button>
            </Link>
          )}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ background: "oklch(0.17 0.05 240)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  clear();
                  setMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-primary"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
