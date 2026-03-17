import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MorganLogo } from "../components/MorganLogo";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function SignupPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const [form, setForm] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [step, setStep] = useState<"form" | "connecting">("form");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.displayName) {
      setError("Please fill in all fields.");
      return;
    }
    setStep("connecting");
    login();
  };

  // After login completes, register the profile
  const [registered, setRegistered] = useState(false);
  if (identity && step === "connecting" && !registered) {
    setRegistered(true);
    if (actor) {
      actor
        .register(form.email, form.displayName)
        .then(() => {
          toast.success("Account created! Welcome to Morgan.");
          navigate({ to: "/dashboard" });
        })
        .catch(() => {
          // Profile may already exist, still redirect
          navigate({ to: "/dashboard" });
        });
    } else {
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-card"
        style={{
          background: "var(--navy-card)",
          border: "1px solid oklch(1 0 0 / 12%)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <MorganLogo size={40} />
          <h1 className="text-2xl font-bold text-foreground mt-3 mb-1">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join the Morgan Compensation Program
          </p>
        </div>
        {step === "connecting" || isLoggingIn ? (
          <div
            className="flex flex-col items-center gap-4 py-8"
            data-ocid="signup.loading_state"
          >
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "var(--blue-light)" }}
            />
            <p className="text-sm text-muted-foreground">
              Connecting to Internet Identity...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="displayName"
                className="text-sm font-medium text-muted-foreground"
              >
                Full Name
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Jane Smith"
                value={form.displayName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, displayName: e.target.value }))
                }
                required
                autoComplete="name"
                data-ocid="signup.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-muted-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                required
                autoComplete="email"
                data-ocid="signup.input"
              />
            </div>
            <div
              className="mt-2 p-3 rounded-lg text-xs text-muted-foreground"
              style={{
                background: "oklch(0.52 0.20 262 / 10%)",
                border: "1px solid oklch(0.52 0.20 262 / 20%)",
              }}
            >
              <strong style={{ color: "var(--blue-light)" }}>
                Secure Login:
              </strong>{" "}
              Authentication is handled via Internet Identity — a secure,
              password-free login system. You'll be redirected to authenticate.
            </div>
            {error && (
              <p
                className="text-sm text-destructive"
                data-ocid="signup.error_state"
              >
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/85 text-primary-foreground font-semibold rounded-xl mt-2"
              data-ocid="signup.submit_button"
            >
              Continue with Internet Identity
            </Button>
          </form>
        )}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium"
            style={{ color: "var(--blue-light)" }}
            data-ocid="signup.link"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
