"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const starterPrompts = [
  "What is your background in software engineering?",
  "What kind of leadership roles have you held?",
  "What technologies are you strongest in?",
  "What is your career journey from 2014 to now?",
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m Alejandro’s Digital Twin. Ask me about his career, leadership style, technical background, or the projects he has led.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextUserMessage: Message = { role: "user", content: trimmed };
    setMessages((current) => [...current, nextUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get a response.");
      }

      const replyText = data?.reply || "I’m here to help with career questions.";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: replyText,
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `The assistant is temporarily unavailable. ${message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="digital-twin" className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-violet-300">
        <span className="h-px w-10 bg-violet-400/60" />
        Digital Twin
      </div>

      <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 md:p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-500/10 via-white/[0.02] to-cyan-500/10 p-6">
          <p className="text-sm uppercase tracking-[0.26em] text-violet-200/80">Career AI</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
            Ask about my journey, skills, and leadership.
          </h3>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            This assistant reflects Alejandro’s career story, technical strengths, and product-minded approach to engineering leadership.
          </p>

          <div className="mt-6 space-y-3">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setInput(prompt)}
                className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-500/10"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-[520px] flex-col rounded-[1.5rem] border border-white/10 bg-[#0b1220]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-zinc-200">Digital Twin</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">OpenRouter</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                  message.role === "user"
                    ? "ml-auto bg-violet-500 text-white"
                    : "bg-white/[0.04] text-zinc-200"
                }`}
              >
                {message.content}
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[90%] rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                Thinking…
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={3}
                placeholder="Ask about his experience, skills, leadership, or projects..."
                className="min-h-[88px] flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="self-end rounded-xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
