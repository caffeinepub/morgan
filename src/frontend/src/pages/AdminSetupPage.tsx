import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Loader2, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export function AdminSetupPage() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleClaim = async () => {
    if (!actor) return;
    setLoading(true);
    setError("");
    try {
      await actor.claimFirstAdmin();
      await queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
      setDone(true);
      toast.success("You are now admin!");
      setTimeout(() => navigate({ to: "/admin" }), 1500);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("admin already exists")) {
        setError(
          "An admin already exists. Only the first user can claim admin this way.",
        );
      } else if (msg.includes("must be registered")) {
        setError("You must be logged in and registered to claim admin.");
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl p-8 text-center"
        style={{
          background: "var(--navy-card)",
          border: "1px solid oklch(1 0 0 / 12%)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "oklch(0.52 0.20 262 / 20%)" }}
        >
          <Shield size={28} style={{ color: "var(--blue-light)" }} />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Admin Setup</h1>
        <p className="text-muted-foreground text-sm mb-6">
          This page lets you claim the admin role if no admin exists yet. You
          must be logged in and registered to proceed.
        </p>

        {done ? (
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle size={20} />
            <span className="font-medium">
              Admin access granted! Redirecting...
            </span>
          </div>
        ) : error ? (
          <div className="mb-4">
            <div
              className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm text-left"
              style={{
                background: "oklch(0.45 0.20 25 / 15%)",
                border: "1px solid oklch(0.55 0.20 25 / 30%)",
              }}
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
              <span className="text-red-300">{error}</span>
            </div>
            <Button
              className="mt-4 w-full"
              variant="outline"
              onClick={() => setError("")}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Button
            className="w-full font-semibold"
            onClick={handleClaim}
            disabled={loading}
            style={{ background: "var(--blue-accent)" }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" /> Claiming...
              </>
            ) : (
              "Claim Admin Access"
            )}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
