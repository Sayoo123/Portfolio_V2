"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { Terminal as TerminalIcon, X, ChevronRight, Command } from "lucide-react";

type LogEntry = {
  id: string;
  type: "command" | "response" | "error";
  content: string | React.ReactNode;
};

interface TerminalViewProps {
  onExit: () => void;
}

export function TerminalView({ onExit }: TerminalViewProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: "init",
      type: "response",
      content: "System initialized. Welcome to SS-CLI v1.0.4. Type 'help' for commands.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      type: "command",
      content: `${trimmedCmd}`,
    };

    setHistory((prev) => [...prev, newEntry]);
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Process commands
    if (trimmedCmd === "help") {
      addResponse(
        <div className="space-y-1 mt-2">
          <p className="text-[var(--color-gold)] font-bold">Available Commands:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 opacity-80 pl-4">
            <p><span className="w-24 inline-block text-white">projects</span> - List all projects</p>
            <p><span className="w-24 inline-block text-white">project [id]</span> - View project details</p>
            <p><span className="w-24 inline-block text-white">clear</span> - Clear output</p>
            <p><span className="w-24 inline-block text-white">exit</span> - Return to GUI view</p>
          </div>
        </div>
      );
    } else if (trimmedCmd === "projects") {
      addResponse(
        <div className="space-y-4 mt-4 mb-4">
          <p className="text-[var(--color-gold)] font-bold underline underline-offset-4">Active Production Systems:</p>
          {projects.map((p, i) => (
            <div key={p.id} className="pl-4 group">
              <p className="text-white font-bold mb-1">
                {i + 1}. {p.title} <span className="text-[var(--color-text-subtle)] font-normal ml-2">[{p.id}]</span>
              </p>
              <p className="text-[var(--color-text-muted)] text-sm mb-1 italic">"{p.impact}"</p>
              <p className="text-[var(--color-text-subtle)] text-xs uppercase tracking-widest">{p.stack.join(" · ")}</p>
            </div>
          ))}
          <p className="text-xs text-[var(--color-text-subtle)] mt-2 italic">Tip: Type 'project [id]' to see technical deep-dive.</p>
        </div>
      );
    } else if (trimmedCmd.startsWith("project ")) {
      const id = trimmedCmd.split(" ")[1];
      const project = projects.find((p) => p.id === id);
      if (project) {
        addResponse(
          <div className="space-y-6 mt-4 p-4 border-l-2 border-[var(--color-gold)] bg-[rgba(201,168,76,0.03)] selection:bg-[var(--color-gold)] selection:text-black">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{project.emoji}</span>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">{project.title}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-gold)] mb-2">Technical Problem</p>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{project.problem}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-gold)] mb-2">Engineered Solution</p>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{project.solution}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-gold)] mb-2">Stack / Infrastructure</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span key={s} className="px-2 py-0.5 text-[10px] border border-[var(--color-border)] text-[var(--color-text-muted)] font-bold">{s}</span>
                    ))}
                  </div>
                </div>
                {project.metrics && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-gold)] mb-2">Key Metrics</p>
                    <div className="space-y-1">
                      {project.metrics.map(m => (
                        <p key={m.label} className="text-xs flex justify-between">
                          <span className="text-[var(--color-text-subtle)]">{m.label}:</span>
                          <span className="text-white font-black">{m.value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      } else {
        addResponse(`Project ID '${id}' not found. Type 'projects' to see list.`, "error");
      }
    } else if (trimmedCmd === "clear") {
      setHistory([]);
    } else if (trimmedCmd === "exit") {
      addResponse("Closing secure session... Switching to GUI.");
      setTimeout(onExit, 800);
    } else if (trimmedCmd === "") {
      // Do nothing
    } else {
      addResponse(`Command not found: '${trimmedCmd}'. Type 'help' for assist.`, "error");
    }

    setInput("");
  };

  const addResponse = (content: string | React.ReactNode, type: LogEntry["type"] = "response") => {
    setHistory((prev) => [
      ...prev,
      { id: Date.now().toString(), type, content },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-2xl font-mono selection:bg-[var(--color-gold)] selection:text-black">
      {/* Top Bar */}
      <div className="bg-[var(--color-surface-3)] px-4 py-3 flex items-center justify-between border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 px-2">
            <div className="w-3 h-3 rounded-full bg-red-900/40" />
            <div className="w-3 h-3 rounded-full bg-yellow-900/40" />
            <div className="w-3 h-3 rounded-full bg-green-900/40" />
          </div>
          <div className="h-4 w-px bg-[var(--color-border)] mx-2" />
          <div className="flex items-center gap-2 text-[var(--color-text-subtle)]">
            <TerminalIcon size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Projects_CLI_Session</span>
          </div>
        </div>
        <button 
          onClick={onExit}
          className="text-[var(--color-text-subtle)] hover:text-white transition-colors p-1"
        >
          <X size={16} />
        </button>
      </div>

      {/* Terminal Area */}
      <div 
        ref={scrollRef}
        className="h-[550px] overflow-y-auto p-6 md:p-10 space-y-3 custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence initial={false}>
          {history.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-4 min-w-0"
            >
              {entry.type === "command" ? (
                <>
                  <span className="text-[var(--color-gold)] font-bold flex-shrink-0">
                    sayooj@portfolio:~$
                  </span>
                  <span className="text-white break-all">{entry.content}</span>
                </>
              ) : (
                <div className={cn(
                  "break-words whitespace-pre-wrap w-full",
                  entry.type === "error" ? "text-red-400" : "text-[var(--color-text-muted)]"
                )}>
                  {entry.content}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Prompt */}
        <div className="flex gap-4 items-center mt-6">
          <span className="text-[var(--color-gold)] font-bold flex-shrink-0">
            sayooj@portfolio:~$
          </span>
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-white font-mono p-0 h-auto"
              spellCheck={false}
              autoComplete="off"
            />
            {/* Blinking cursor simulation if input is empty */}
            {input === "" && (
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2.5 h-5 bg-[var(--color-gold)] absolute left-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
