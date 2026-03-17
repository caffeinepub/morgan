import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useChatMessages, useSendMessage } from "../hooks/useQueries";

export function ChatWidget() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { data: messages = [] } = useChatMessages();
  const sendMessage = useSendMessage();
  const bottomRef = useRef<HTMLDivElement>(null);

  if (!isAuthenticated) return null;

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage.mutate(trimmed);
    setInput("");
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
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
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
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
                disabled={!input.trim() || sendMessage.isPending}
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
