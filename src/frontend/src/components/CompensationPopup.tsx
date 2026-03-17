import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const names = [
  "John",
  "Michael",
  "James",
  "Robert",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Charles",
  "Thomas",
  "Daniel",
  "Matthew",
  "Anthony",
  "Donald",
  "Mark",
  "Sarah",
  "Jessica",
  "Ashley",
  "Amanda",
  "Emily",
  "Brittany",
  "Samantha",
  "Elizabeth",
  "Jennifer",
  "Megan",
  "Melissa",
  "Michelle",
  "Christina",
  "Lauren",
];

const locations = [
  "Texas",
  "California",
  "Florida",
  "New York",
  "Georgia",
  "Ohio",
  "Michigan",
  "North Carolina",
  "Pennsylvania",
  "Illinois",
  "Arizona",
  "Tennessee",
  "Indiana",
  "Missouri",
  "Virginia",
  "Washington",
  "Colorado",
  "Nevada",
  "Alabama",
  "Louisiana",
  "Kentucky",
  "Wisconsin",
  "Minnesota",
  "Oklahoma",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Notification {
  id: number;
  name: string;
  location: string;
}

export function CompensationPopup() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Show first popup after 3 seconds
    const initialDelay = setTimeout(() => {
      triggerPopup();
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (counter === 0) return;
    // After first, show a new one every 8-14 seconds
    const delay = 8000 + Math.random() * 6000;
    const t = setTimeout(() => {
      triggerPopup();
    }, delay);
    return () => clearTimeout(t);
  }, [counter]);

  function triggerPopup() {
    const id = Date.now();
    const notif: Notification = {
      id,
      name: randomFrom(names),
      location: randomFrom(locations),
    };
    setNotifications((prev) => [...prev.slice(-2), notif]);
    setCounter((c) => c + 1);
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }

  function dismiss(id: number) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div
      className="fixed top-20 right-4 z-50 flex flex-col gap-2 items-end"
      style={{ pointerEvents: "none" }}
    >
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
            style={{
              pointerEvents: "auto",
              background: "oklch(0.18 0.03 250 / 96%)",
              border: "1px solid oklch(0.8 0.15 50 / 35%)",
              backdropFilter: "blur(12px)",
              maxWidth: "300px",
              minWidth: "240px",
            }}
          >
            {/* USA Flag */}
            <div className="text-2xl flex-shrink-0" aria-label="USA Flag">
              🇺🇸
            </div>

            {/* Message */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-snug">
                {notif.name} from {notif.location}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.82 0.18 50)" }}
              >
                just received their compensation!
              </p>
            </div>

            {/* Dismiss */}
            <button
              type="button"
              onClick={() => dismiss(notif.id)}
              className="text-white/40 hover:text-white/80 transition-colors flex-shrink-0 text-lg leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
