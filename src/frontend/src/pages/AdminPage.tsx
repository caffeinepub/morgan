import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MessageSquare, Send, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ChatMessage } from "../backend.d";
import {
  useAllChatMessages,
  useAllUsers,
  useReplyToMessage,
} from "../hooks/useQueries";

function groupByUser(messages: ChatMessage[]): Record<string, ChatMessage[]> {
  return messages.reduce(
    (acc, msg) => {
      const key = msg.userEmail;
      if (!acc[key]) acc[key] = [];
      acc[key].push(msg);
      return acc;
    },
    {} as Record<string, ChatMessage[]>,
  );
}

function MessageThread({
  email,
  messages,
}: { email: string; messages: ChatMessage[] }) {
  const [replies, setReplies] = useState<Record<string, string>>({});
  const replyMutation = useReplyToMessage();

  const handleReply = async (messageId: bigint) => {
    const text = replies[messageId.toString()]?.trim();
    if (!text) return;
    try {
      await replyMutation.mutateAsync({ messageId, replyText: text });
      setReplies((prev) => ({ ...prev, [messageId.toString()]: "" }));
      toast.success("Reply sent");
    } catch {
      toast.error("Failed to send reply");
    }
  };

  return (
    <div
      className="rounded-xl p-4 mb-3"
      style={{
        background: "oklch(0.17 0.05 240)",
        border: "1px solid oklch(1 0 0 / 10%)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare size={14} style={{ color: "var(--blue-light)" }} />
        <span className="text-sm font-semibold text-foreground">{email}</span>
        <Badge variant="secondary" className="text-xs">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </Badge>
      </div>
      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id.toString()} className="space-y-1.5">
            <div
              className="px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--navy-card)" }}
            >
              <p className="text-xs text-muted-foreground mb-0.5">
                {new Date(Number(msg.timestamp) / 1_000_000).toLocaleString()}
              </p>
              <p className="text-foreground">{msg.message}</p>
            </div>
            {msg.adminReply ? (
              <div
                className="ml-4 px-3 py-2 rounded-lg text-sm"
                style={{
                  background: "oklch(0.52 0.20 262 / 15%)",
                  border: "1px solid oklch(0.52 0.20 262 / 25%)",
                }}
              >
                <p
                  className="text-xs font-semibold mb-0.5"
                  style={{ color: "var(--blue-light)" }}
                >
                  Admin reply
                </p>
                <p className="text-muted-foreground">{msg.adminReply}</p>
              </div>
            ) : (
              <div className="ml-4 flex gap-2">
                <Input
                  placeholder="Type a reply..."
                  value={replies[msg.id.toString()] || ""}
                  onChange={(e) =>
                    setReplies((prev) => ({
                      ...prev,
                      [msg.id.toString()]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleReply(msg.id)}
                  data-ocid="admin.reply.input"
                  className="text-sm h-8"
                />
                <Button
                  size="sm"
                  onClick={() => handleReply(msg.id)}
                  disabled={
                    replyMutation.isPending ||
                    !replies[msg.id.toString()]?.trim()
                  }
                  data-ocid="admin.reply.submit_button"
                  className="h-8 w-8 shrink-0 p-0"
                  style={{ background: "var(--blue-accent)" }}
                >
                  {replyMutation.isPending ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Send size={13} color="white" />
                  )}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPage() {
  const { data: users = [], isLoading: usersLoading } = useAllUsers();
  const { data: messages = [], isLoading: messagesLoading } =
    useAllChatMessages();
  const grouped = groupByUser(messages);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.52 0.20 262 / 20%)" }}
        >
          <Shield size={20} style={{ color: "var(--blue-light)" }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            Manage users and support messages
          </p>
        </div>
      </motion.div>

      <Tabs defaultValue="users" data-ocid="admin.tab">
        <TabsList
          className="mb-6"
          style={{
            background: "var(--navy-card)",
            border: "1px solid oklch(1 0 0 / 12%)",
          }}
        >
          <TabsTrigger value="users" data-ocid="admin.users.tab">
            Users ({users.length})
          </TabsTrigger>
          <TabsTrigger value="messages" data-ocid="admin.messages.tab">
            Messages ({messages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" data-ocid="admin.users.panel">
          <div
            className="rounded-2xl overflow-hidden shadow-card"
            style={{
              background: "var(--navy-card)",
              border: "1px solid oklch(1 0 0 / 12%)",
            }}
          >
            {usersLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="admin.users.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : users.length === 0 ? (
              <div
                className="p-12 text-center"
                data-ocid="admin.users.empty_state"
              >
                <p className="text-muted-foreground">
                  No registered users yet.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(1 0 0 / 10%)" }}>
                    <TableHead className="text-muted-foreground">#</TableHead>
                    <TableHead className="text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Registered
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, idx) => (
                    <TableRow
                      key={user.id.toString()}
                      data-ocid={`admin.users.item.${idx + 1}`}
                      style={{ borderColor: "oklch(1 0 0 / 8%)" }}
                    >
                      <TableCell className="text-muted-foreground text-sm">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="text-foreground text-sm font-medium">
                        {user.displayName}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(
                          Number(user.registeredAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="messages" data-ocid="admin.messages.panel">
          {messagesLoading ? (
            <div className="space-y-3" data-ocid="admin.messages.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div
              className="rounded-2xl p-12 text-center"
              data-ocid="admin.messages.empty_state"
              style={{
                background: "var(--navy-card)",
                border: "1px solid oklch(1 0 0 / 12%)",
              }}
            >
              <p className="text-muted-foreground">No support messages yet.</p>
            </div>
          ) : (
            Object.entries(grouped).map(([email, msgs]) => (
              <MessageThread key={email} email={email} messages={msgs} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
