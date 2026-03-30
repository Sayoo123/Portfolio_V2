"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Command, Loader2, Sparkles } from "lucide-react";
import { personal } from "@/lib/data";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I am Sayooj's Personal Assistant (PA). How can I help you explore his work today?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: error.message || "I encountered a glitch in my circuits. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--color-gold)] text-[#0c0c0f] shadow-[0_0_20px_rgba(201,168,76,0.5)] flex items-center justify-center group"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[550px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--color-surface-2)] p-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-gold)] flex items-center justify-center text-[#0c0c0f] font-bold text-xs">
                  {personal.initials}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tighter">Sayooj's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                    <span className="text-[10px] text-[var(--color-text-subtle)] font-bold uppercase tracking-widest">Connection Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-subtle)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                      ? "bg-[var(--color-surface-2)] text-white rounded-br-none border border-[var(--color-border)]"
                      : "bg-[rgba(201,168,76,0.05)] text-[var(--color-text-muted)] rounded-bl-none border border-[var(--color-gold-dim)] border-opacity-20"
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[rgba(201,168,76,0.05)] p-3 rounded-2xl rounded-bl-none border border-[var(--color-gold-dim)] border-opacity-20">
                    <Loader2 size={16} className="text-[var(--color-gold)] animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Overlay */}
            <div className="p-4 bg-[var(--color-surface-2)] border-t border-[var(--color-border)]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me something about Sayooj..."
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-gold)] transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 text-[var(--color-gold)] disabled:opacity-30 hover:scale-110 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-[var(--color-text-subtle)] mt-2 text-center uppercase tracking-widest font-bold font-mono">
                System: 15 Requests Per Minute Limit
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
