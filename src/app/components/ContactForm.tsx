"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          product,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full rounded-2xl glass p-8 text-center flex flex-col items-center gap-4 reveal relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-iridescent" />
        <CheckCircle2 className="text-success w-12 h-12 animate-bounce" />
        <h3 className="font-display text-xl font-semibold">Message Received</h3>
        <p className="text-sm text-fg-muted max-w-sm leading-relaxed">
          Thank you for reaching out. A product engineer from the Tymora Labs team will review your inquiry and get back to you within 2 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl glass p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-border group-hover:bg-iridescent transition-colors" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-fg-dim">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            disabled={status === "submitting"}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-bg border border-border text-fg outline-none focus:border-brand-500/60 transition-colors disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-fg-dim">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            disabled={status === "submitting"}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-bg border border-border text-fg outline-none focus:border-brand-500/60 transition-colors disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="product" className="text-xs font-mono uppercase tracking-wider text-fg-dim">
            What can we help you with?
          </label>
          <div className="relative">
            <select
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              disabled={status === "submitting"}
              className="w-full px-4 py-2.5 rounded-lg text-sm bg-bg border border-border text-fg outline-none focus:border-brand-500/60 transition-colors appearance-none cursor-pointer disabled:opacity-50"
            >
              <option value="general">General Inquiry / Message</option>
              <option value="competition-scheduler">Competition Scheduler (Leagues & Venues)</option>
              <option value="appointment-engine">Appointment Engine (Client Bookings)</option>
              <option value="race-communicator">Race-Day Communicator (Mass Event Broadcasts)</option>
              <option value="custom-integration">Custom Software Project / Integration</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-fg-dim text-xs">
              ▼
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-fg-dim">
            How can we help?
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your event scale, timeline, or deployment requirements..."
            disabled={status === "submitting"}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-bg border border-border text-fg outline-none focus:border-brand-500/60 transition-colors resize-none disabled:opacity-50"
          />
        </div>

        {status === "error" && (
          <p className="text-xs text-danger font-medium font-mono text-center">
            Failed to send message. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-brand-500 text-fg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50 cursor-pointer"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending message...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
