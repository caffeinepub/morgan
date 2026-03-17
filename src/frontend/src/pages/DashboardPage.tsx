import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Gift, MessageCircle, User } from "lucide-react";
import { motion } from "motion/react";
import { useChatMessages, useUserProfile } from "../hooks/useQueries";

export function DashboardPage() {
  const { data: profile, isLoading } = useUserProfile();
  const { data: messages = [] } = useChatMessages();
  const unansweredCount = messages.filter((m) => !m.adminReply).length;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.52 0.20 262 / 20%)" }}
          >
            <User size={18} style={{ color: "var(--blue-light)" }} />
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : (
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {profile?.displayName || "there"}!
            </h1>
          )}
        </div>
        <p className="text-muted-foreground">
          Here's your Morgan dashboard overview.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            className="h-full rounded-2xl shadow-card flex flex-col"
            style={{
              background: "var(--navy-card)",
              border: "1px solid oklch(1 0 0 / 12%)",
            }}
          >
            <CardHeader>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "oklch(0.52 0.20 262 / 18%)" }}
              >
                <Gift size={20} style={{ color: "var(--blue-light)" }} />
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                Giveaway Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-3">
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                Review eligibility requirements, participation steps, and
                timeline for the Morgan Compensation Program.
              </p>
              <Link to="/giveaway">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="dashboard.giveaway.button"
                  className="w-full border-white/15 hover:border-white/30 text-muted-foreground hover:text-foreground font-medium"
                >
                  View Details <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            className="h-full rounded-2xl shadow-card flex flex-col"
            style={{
              background: "var(--navy-card)",
              border: "1px solid oklch(1 0 0 / 12%)",
            }}
          >
            <CardHeader>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "oklch(0.55 0.18 155 / 18%)" }}
              >
                <Bot size={20} style={{ color: "oklch(0.75 0.14 155)" }} />
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-3">
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                Ask questions about the program, eligibility, application steps,
                and more. Get instant answers.
              </p>
              <Link to="/assistant">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="dashboard.assistant.button"
                  className="w-full border-white/15 hover:border-white/30 text-muted-foreground hover:text-foreground font-medium"
                >
                  Open Assistant <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            className="h-full rounded-2xl shadow-card flex flex-col"
            style={{
              background: "var(--navy-card)",
              border: "1px solid oklch(1 0 0 / 12%)",
            }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "oklch(0.65 0.18 42 / 18%)" }}
                >
                  <MessageCircle
                    size={20}
                    style={{ color: "oklch(0.78 0.15 42)" }}
                  />
                </div>
                {unansweredCount > 0 && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "var(--blue-accent)", color: "white" }}
                  >
                    {unansweredCount} pending
                  </span>
                )}
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                Live Support Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-3">
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                Chat directly with our support team. Available via the floating
                chat button at the bottom right.
              </p>
              <p className="text-xs text-muted-foreground">
                {messages.length} message{messages.length !== 1 ? "s" : ""} in
                your conversation
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 rounded-2xl p-5"
          style={{
            background: "var(--navy-card)",
            border: "1px solid oklch(1 0 0 / 12%)",
          }}
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Account Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Name</p>
              <p className="text-sm font-medium text-foreground">
                {profile.displayName}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Email</p>
              <p className="text-sm font-medium text-foreground">
                {profile.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Member Since
              </p>
              <p className="text-sm font-medium text-foreground">
                {new Date(
                  Number(profile.registeredAt) / 1_000_000,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
