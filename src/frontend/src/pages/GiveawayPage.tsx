import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ClipboardList,
  Info,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const eligibility = [
  "You are 18 years of age or older",
  "You are a legal resident or citizen of an eligible jurisdiction",
  "You have not previously received compensation under this program",
  "You can provide valid identification documentation if required",
  "Your participation request is submitted within the open enrollment window",
];

const steps = [
  {
    step: "1",
    title: "Register",
    description:
      "Create your free account on Morgan and verify your email address.",
  },
  {
    step: "2",
    title: "Review Eligibility",
    description:
      "Read the eligibility criteria and confirm you meet all requirements.",
  },
  {
    step: "3",
    title: "Submit Information",
    description:
      "Provide your basic identification details through the secure dashboard.",
  },
  {
    step: "4",
    title: "Verification",
    description: "Our team reviews your submission within 3–5 business days.",
  },
  {
    step: "5",
    title: "Receive Decision",
    description: "You'll be notified of your participation status via email.",
  },
];

const timeline = [
  { phase: "Enrollment Open", date: "January 2026", status: "active" },
  {
    phase: "Verification Period",
    date: "February – March 2026",
    status: "upcoming",
  },
  { phase: "Decision Notifications", date: "April 2026", status: "upcoming" },
  { phase: "Processing Period", date: "May – August 2026", status: "upcoming" },
  { phase: "Program Close", date: "September 2026", status: "upcoming" },
];

export function GiveawayPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Morgan Compensation Program
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Full details about what the program covers, who qualifies, and how to
          participate.
        </p>
      </motion.div>

      <section className="mb-10">
        <div
          className="rounded-2xl p-6 shadow-card"
          style={{
            background: "var(--navy-card)",
            border: "1px solid oklch(1 0 0 / 12%)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Info size={18} style={{ color: "var(--blue-light)" }} />
            <h2 className="text-xl font-bold text-foreground">
              About the Program
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Morgan Compensation Program is an officially structured
            initiative designed to assist eligible individuals in understanding
            and claiming compensation benefits they may be entitled to. The
            program operates with full transparency and is administered at no
            cost to participants.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Morgan acts as an informational and process-guidance platform. We do
            not serve as legal counsel and do not guarantee specific outcomes.
            Our role is to help you navigate the compensation claim process
            clearly and efficiently.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <div
          className="rounded-2xl p-6 shadow-card"
          style={{
            background: "var(--navy-card)",
            border: "1px solid oklch(1 0 0 / 12%)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Users size={18} style={{ color: "var(--blue-light)" }} />
            <h2 className="text-xl font-bold text-foreground">
              Eligibility Requirements
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            To qualify for the Morgan program, you must meet all of the
            following criteria:
          </p>
          <ul className="space-y-2.5">
            {eligibility.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: "oklch(0.72 0.16 155)" }}
                />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <div
          className="rounded-2xl p-6 shadow-card"
          style={{
            background: "var(--navy-card)",
            border: "1px solid oklch(1 0 0 / 12%)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <ClipboardList size={18} style={{ color: "var(--blue-light)" }} />
            <h2 className="text-xl font-bold text-foreground">
              How to Participate
            </h2>
          </div>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{ background: "var(--blue-accent)", color: "white" }}
                >
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">
                    {s.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div
          className="rounded-2xl p-6 shadow-card"
          style={{
            background: "var(--navy-card)",
            border: "1px solid oklch(1 0 0 / 12%)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Calendar size={18} style={{ color: "var(--blue-light)" }} />
            <h2 className="text-xl font-bold text-foreground">
              Program Timeline
            </h2>
          </div>
          <div className="space-y-3">
            {timeline.map((t) => (
              <div
                key={t.phase}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                style={{ background: "oklch(0.17 0.05 240)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background:
                        t.status === "active"
                          ? "oklch(0.72 0.16 155)"
                          : "oklch(0.5 0 0)",
                    }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {t.phase}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {t.date}
                  </span>
                  {t.status === "active" && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.55 0.18 155 / 20%)",
                        color: "oklch(0.72 0.16 155)",
                      }}
                    >
                      Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.65 0.18 75 / 10%)",
            border: "1px solid oklch(0.65 0.18 75 / 30%)",
          }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="shrink-0 mt-0.5"
              style={{ color: "oklch(0.78 0.15 75)" }}
            />
            <div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "oklch(0.85 0.12 75)" }}
              >
                Important Disclaimer
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.78 0.10 75)" }}
              >
                This is an informational program only. Morgan does not collect
                financial information, bank account details, or sensitive
                personal data beyond identity verification. Morgan does not
                guarantee compensation outcomes. Participation in this program
                is completely free — you will never be asked to make any
                payment. Always verify any compensation claims through official
                government or legal channels. If you are uncertain about any
                aspect of this program, please consult a qualified legal
                professional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
