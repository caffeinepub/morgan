import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Lock, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <Shield size={22} />,
    title: "Verified Program",
    description:
      "Morgan is a legitimate, transparent compensation awareness initiative. All information is verified and up-to-date.",
  },
  {
    icon: <Zap size={22} />,
    title: "Fast Process",
    description:
      "Our streamlined process guides you through eligibility verification and participation in just a few simple steps.",
  },
  {
    icon: <Lock size={22} />,
    title: "Secure & Private",
    description:
      "Your personal data is protected. We never collect sensitive financial information or charge participation fees.",
  },
];

export function HomePage() {
  return (
    <div className="w-full">
      {/* Hero section with building background */}
      <section
        className="relative"
        style={{
          backgroundImage: "url('/assets/uploads/images-2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.10 0.04 240 / 75%)" }}
        />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-6"
                style={{
                  background: "oklch(0.52 0.20 262 / 25%)",
                  color: "oklch(0.82 0.16 262)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Program Now Open
              </span>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
                You May Be Eligible for{" "}
                <span style={{ color: "oklch(0.72 0.16 262)" }}>Morgan</span>{" "}
                Compensation
              </h1>
              <p
                className="text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: "oklch(0.85 0.02 240)" }}
              >
                The Morgan Compensation Program is designed to help eligible
                participants understand and claim their rightful benefits —
                completely free and fully transparent.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup">
                  <Button
                    size="lg"
                    data-ocid="hero.primary_button"
                    className="bg-primary hover:bg-primary/85 text-primary-foreground font-semibold rounded-xl px-7 text-base shadow-glow"
                  >
                    Get Started <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
                <Link to="/support">
                  <Button
                    size="lg"
                    variant="outline"
                    data-ocid="hero.secondary_button"
                    className="border-white/30 text-white hover:text-white hover:border-white/60 hover:bg-white/10 font-semibold rounded-xl px-7 text-base"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="hidden lg:block"
            >
              <div
                className="rounded-2xl p-6 shadow-card"
                style={{
                  background: "oklch(0.15 0.05 240 / 85%)",
                  border: "1px solid oklch(1 0 0 / 20%)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm font-semibold text-white">
                    Program Status
                  </p>
                  <span
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.55 0.18 155 / 20%)",
                      color: "oklch(0.75 0.14 155)",
                    }}
                  >
                    Active
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Enrolled Participants", value: "12,847" },
                    { label: "Claims Processed", value: "8,391" },
                    { label: "Avg. Processing Time", value: "4–8 weeks" },
                    { label: "Program Cost", value: "Free" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                      style={{ background: "oklch(0.12 0.04 240 / 70%)" }}
                    >
                      <span
                        className="text-sm"
                        style={{ color: "oklch(0.75 0.03 240)" }}
                      >
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-5 p-3 rounded-lg flex items-start gap-2"
                  style={{
                    background: "oklch(0.52 0.20 262 / 15%)",
                    border: "1px solid oklch(0.52 0.20 262 / 30%)",
                  }}
                >
                  <span className="text-base mt-0.5">ℹ️</span>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.80 0.03 240)" }}
                  >
                    Participation is 100% free. Morgan will never request
                    payment or sensitive financial data.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-24 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Why Choose Morgan?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our program is built on transparency, security, and your best
            interests.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 flex flex-col gap-4 shadow-card"
              style={{
                background: "var(--navy-card)",
                border: "1px solid oklch(1 0 0 / 10%)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "oklch(0.52 0.20 262 / 18%)",
                  color: "var(--blue-light)",
                }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
              <Link
                to="/giveaway"
                className="text-sm font-medium flex items-center gap-1 mt-auto transition-colors"
                style={{ color: "var(--blue-light)" }}
              >
                Learn More <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="py-20"
        style={{
          background: "oklch(0.16 0.04 240)",
          borderTop: "1px solid oklch(1 0 0 / 8%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                About the Giveaway
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                The Morgan Compensation Program is an awareness and
                claims-assistance initiative. It helps individuals who may be
                entitled to compensation benefits navigate the process —
                providing clear guidance, eligibility review, and step-by-step
                support from registration through to completion.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                This program is informational in nature. Morgan does not
                guarantee outcomes. All participation is free. No payment,
                banking details, or sensitive personal financial information
                will ever be collected.
              </p>
              <Link to="/giveaway">
                <Button
                  data-ocid="explanation.primary_button"
                  className="bg-primary hover:bg-primary/85 text-primary-foreground font-semibold rounded-xl px-7"
                >
                  View Full Program Details
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
