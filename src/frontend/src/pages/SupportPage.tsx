import { motion } from "motion/react";

const channels = [
  {
    name: "Email",
    description:
      "Send us an email and we'll get back to you as soon as possible.",
    link: "mailto:Mrjamiedamonofficial@gmail.com",
    label: "Mrjamiedamonofficial@gmail.com",
    emoji: "✉️",
    color: "oklch(0.65 0.18 50)",
    bg: "oklch(0.55 0.18 50 / 15%)",
    border: "oklch(0.55 0.18 50 / 30%)",
  },
  {
    name: "WhatsApp",
    description:
      "Chat with our support team on WhatsApp. Typically respond within 1 hour.",
    link: "https://wa.me/19402793736",
    label: "+19402793736",
    emoji: "💬",
    color: "oklch(0.65 0.18 155)",
    bg: "oklch(0.55 0.18 155 / 15%)",
    border: "oklch(0.55 0.18 155 / 30%)",
  },
  {
    name: "Signal",
    description:
      "Reach us on Signal for encrypted, private communication with our team.",
    link: "https://signal.me/#p/+19284386688",
    label: "+19284386688",
    emoji: "🔒",
    color: "oklch(0.65 0.18 270)",
    bg: "oklch(0.52 0.18 270 / 15%)",
    border: "oklch(0.52 0.18 270 / 30%)",
  },
];

export function SupportPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Contact Support
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Our support team is available to assist you with any questions about
          the Morgan program. Choose your preferred channel below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channels.map((ch, i) => (
          <motion.div
            key={ch.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl p-6 flex flex-col items-center text-center shadow-card"
            style={{
              background: "var(--navy-card)",
              border: "1px solid oklch(1 0 0 / 12%)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
              style={{ background: ch.bg, border: `1px solid ${ch.border}` }}
            >
              {ch.emoji}
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">
              {ch.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
              {ch.description}
            </p>
            <a
              href={ch.link}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`support.${ch.name.toLowerCase()}.button`}
              className="w-full py-2.5 px-5 rounded-xl text-sm font-semibold text-white text-center transition-opacity hover:opacity-85 truncate"
              style={{ background: "var(--blue-accent)" }}
            >
              {ch.label}
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 rounded-2xl p-6 text-center"
        style={{
          background: "var(--navy-card)",
          border: "1px solid oklch(1 0 0 / 12%)",
        }}
      >
        <h3 className="text-base font-semibold text-foreground mb-2">
          Live Chat
        </h3>
        <p className="text-sm text-muted-foreground">
          If you're logged in, you can also use the floating chat button at the
          bottom right of your screen to chat directly with our team.
        </p>
      </motion.div>
    </div>
  );
}
