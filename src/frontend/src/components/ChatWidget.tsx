import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useChatMessages, useSendMessage } from "../hooks/useQueries";

const SEEN_KEY = "morgan_chat_seen_replies";

function getSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function markAllSeen(ids: string[]) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function ChatWidget() {
  const { identity } = useInternetIdentity();
  const { isFetching: actorLoading, actor } = useActor();
  const isAuthenticated = !!identity;
  const isReady = isAuthenticated && !!actor && !actorLoading;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [seenIds, setSeenIds] = useState<Set<string>>(getSeenIds);
  const { data: messages = [] } = useChatMessages();
  const sendMessage = useSendMessage();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Count unseen admin replies
  const unreadCount = messages.filter(
    (msg) => msg.adminReply && !seenIds.has(msg.id.toString()),
  ).length;

  // When chat opens, mark all current replied messages as seen
  useEffect(() => {
    if (open && messages.length > 0) {
      const allIds = messages.map((m) => m.id.toString());
      markAllSeen(allIds);
      setSeenIds(new Set(allIds));
    }
  }, [open, messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !isReady) return;
    sendMessage.mutate(trimmed, {
      onSuccess: () => {
        setInput("");
        setTimeout(
          () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
          100,
        );
      },
      onError: (err) => {
        console.error("Chat send error:", err);
        toast.error("Failed to send message. Please try again.");
      },
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-ocid="chat.open_modal_button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all hover:scale-105 active:scale-95"
        style={{ background: "var(--blue-accent)" }}
        aria-label="Open support chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} color="white" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} color="white" />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Unread badge */}
        <AnimatePresence>
          {!open && unreadCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[11px] font-bold text-white pointer-events-none"
              style={{ background: "oklch(0.55 0.22 25)" }}
              data-ocid="chat.toast"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            data-ocid="chat.modal"
            className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden flex flex-col shadow-card"
            style={{ border: "1px solid oklch(1 0 0 / 12%)" }}
          >
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ background: "var(--navy-dark)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "var(--blue-accent)" }}
              >
                <MessageCircle size={15} color="white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Morgan Support
                </p>
                <p className="text-xs text-muted-foreground">
                  We typically reply within minutes
                </p>
              </div>
            </div>
            <div
              className="flex-1 h-72"
              style={{ background: "oklch(0.20 0.04 240)" }}
            >
              <ScrollArea className="h-full">
                <div className="p-4 flex flex-col gap-2">
                  {!isAuthenticated ? (
                    <div className="text-center py-8 space-y-2">
                      <MessageCircle
                        size={28}
                        className="mx-auto opacity-40"
                        style={{ color: "var(--blue-light)" }}
                      />
                      <p className="text-sm text-muted-foreground">
                        Please log in to send us a message.
                      </p>
                      <a
                        href="/login"
                        className="inline-block text-sm font-semibold underline"
                        style={{ color: "var(--blue-light)" }}
                      >
                        Log in
                      </a>
                    </div>
                  ) : (
                    <>
                      {messages.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-xs text-muted-foreground">
                            No messages yet. Send us a message!
                          </p>
                        </div>
                      )}
                      {messages.map((msg) => (
                        <div
                          key={msg.id.toString()}
                          className="flex flex-col gap-1"
                        >
                          <div className="flex justify-end">
                            <div
                              className="max-w-[85%] px-3 py-2 rounded-2xl rounded-br-sm text-sm text-white"
                              style={{ background: "var(--blue-accent)" }}
                            >
                              {msg.message}
                            </div>
                          </div>
                          {msg.adminReply && (
                            <div className="flex justify-start">
                              <div
                                className="max-w-[85%] px-3 py-2 rounded-2xl rounded-bl-sm text-sm"
                                style={{
                                  background: "oklch(0.95 0.02 240)",
                                  color: "oklch(0.22 0.05 240)",
                                }}
                              >
                                <span
                                  className="block text-[10px] font-semibold mb-0.5"
                                  style={{ color: "var(--blue-accent)" }}
                                >
                                  Support
                                </span>
                                {msg.adminReply}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>
            </div>
            <div
              className="p-3 flex gap-2"
              style={{
                background: "var(--navy-dark)",
                borderTop: "1px solid oklch(1 0 0 / 10%)",
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  isReady &&
                  !sendMessage.isPending &&
                  handleSend()
                }
                placeholder={
                  !isAuthenticated
                    ? "Log in to send a message"
                    : actorLoading || !actor
                      ? "Connecting..."
                      : "Type a message..."
                }
                disabled={!isReady || sendMessage.isPending}
                data-ocid="chat.input"
                className="flex-1 text-sm h-9"
                style={{
                  background: "oklch(0.22 0.05 240)",
                  border: "1px solid oklch(1 0 0 / 15%)",
                  color: "oklch(0.97 0.01 270)",
                }}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!isReady || !input.trim() || sendMessage.isPending}
                data-ocid="chat.submit_button"
                className="h-9 w-9 shrink-0"
                style={{ background: "var(--blue-accent)" }}
              >
                <Send size={14} color="white" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
