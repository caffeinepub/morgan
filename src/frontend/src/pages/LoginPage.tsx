import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MorganLogo } from "../components/MorganLogo";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const { login, isLoggingIn, identity, loginStatus } = useInternetIdentity();
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if (identity && initiated) {
      // Try to register in case this is a new user from this flow
      if (actor) {
        actor.getCallerUserProfile().catch(() => {});
      }
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    }
  }, [identity, initiated, actor, navigate]);

  const handleLogin = () => {
    setInitiated(true);
    login();
  };

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
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your Morgan account
          </p>
        </div>

        {isLoggingIn ? (
          <div
            className="flex flex-col items-center gap-4 py-8"
            data-ocid="login.loading_state"
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
          <div className="space-y-5">
            <div
              className="p-4 rounded-xl text-sm text-muted-foreground leading-relaxed"
              style={{
                background: "oklch(0.17 0.05 240)",
                border: "1px solid oklch(1 0 0 / 10%)",
              }}
            >
              <p className="font-medium text-foreground mb-1">
                Secure, Password-Free Login
              </p>
              <p>
                Morgan uses Internet Identity for authentication — a secure,
                decentralized system that keeps your account safe without
                passwords.
              </p>
            </div>

            {loginStatus === "loginError" && (
              <p
                className="text-sm text-destructive"
                data-ocid="login.error_state"
              >
                Login failed. Please try again.
              </p>
            )}

            <Button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary/85 text-primary-foreground font-semibold rounded-xl"
              data-ocid="login.submit_button"
            >
              Sign In with Internet Identity
            </Button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium"
            style={{ color: "var(--blue-light)" }}
            data-ocid="login.link"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
