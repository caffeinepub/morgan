import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const scriptedResponses: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["what is morgan", "what's morgan", "about morgan"],
    response:
      "Morgan is a compensation awareness program designed to help eligible participants understand and claim their benefits. The program is free, transparent, and operates with full accountability.",
  },
  {
    keywords: ["am i eligible", "eligibility", "do i qualify"],
    response:
      "Eligibility is based on several factors including age (18+), residency, and prior participation history. Please review the full eligibility criteria on the Giveaway Info page for complete details.",
  },
  {
    keywords: [
      "how do i apply",
      "how to apply",
      "how to participate",
      "how can i participate",
    ],
    response:
      "To participate, complete your registration, verify your information, and submit your participation form through the dashboard. The process typically takes 5–10 minutes to complete.",
  },
  {
    keywords: [
      "when will i receive",
      "how long",
      "processing time",
      "timeline",
    ],
    response:
      "Processing times vary depending on verification complexity. The current estimated timeline is 4–8 weeks after verification is complete. You'll receive email updates at each stage.",
  },
  {
    keywords: ["is this free", "cost", "fee", "payment", "charge"],
    response:
      "Yes, participation in the Morgan program is completely free. We will never ask for payment of any kind. If anyone claiming to represent Morgan asks for money, please contact our support team immediately.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    response:
      "Hello! I'm the Morgan AI Assistant. I'm here to help answer your questions about the compensation program. What would you like to know?",
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const item of scriptedResponses) {
    if (item.keywords.some((kw) => lower.includes(kw))) return item.response;
  }
  return "Thank you for your question. For personalized assistance, please contact our support team via the Support page. You can also use the live chat button at the bottom right of your screen.";
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hi there! I'm the Morgan AI Assistant. I can answer questions about the compensation program, eligibility, application process, and more. How can I help you today?",
  },
];

export function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: getResponse(trimmed),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.52 0.20 262 / 20%)" }}
          >
            <Bot size={20} style={{ color: "var(--blue-light)" }} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Ask questions about the Morgan program. Responses are scripted and
          informational.
        </p>
      </motion.div>

      <div
        className="rounded-2xl overflow-hidden flex flex-col shadow-card"
        style={{
          background: "var(--navy-card)",
          border: "1px solid oklch(1 0 0 / 12%)",
          height: "520px",
        }}
      >
        <ScrollArea className="flex-1 p-5">
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background:
                        msg.role === "assistant"
                          ? "oklch(0.52 0.20 262 / 20%)"
                          : "oklch(0.52 0.20 262)",
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={15} style={{ color: "var(--blue-light)" }} />
                    ) : (
                      <User size={15} color="white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                    style={{
                      background:
                        msg.role === "user"
                          ? "var(--blue-accent)"
                          : "oklch(0.20 0.04 240)",
                      color: "oklch(0.97 0.01 270)",
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.52 0.20 262 / 20%)" }}
                  >
                    <Bot size={15} style={{ color: "var(--blue-light)" }} />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm"
                    style={{ background: "oklch(0.20 0.04 240)" }}
                    data-ocid="assistant.loading_state"
                  >
                    <span className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        <div
          className="p-4 flex gap-3"
          style={{ borderTop: "1px solid oklch(1 0 0 / 10%)" }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isTyping && handleSend()}
            placeholder="Ask a question about the Morgan program..."
            disabled={isTyping}
            data-ocid="assistant.input"
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            data-ocid="assistant.submit_button"
            className="bg-primary hover:bg-primary/85 text-primary-foreground shrink-0"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-muted-foreground mb-2">
          Suggested questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "What is Morgan?",
            "Am I eligible?",
            "Is this free?",
            "How do I apply?",
          ].map((q) => (
            <button
              type="button"
              key={q}
              onClick={() => setInput(q)}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors text-muted-foreground hover:text-foreground"
              style={{
                borderColor: "oklch(1 0 0 / 15%)",
                background: "oklch(0.22 0.05 240)",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
