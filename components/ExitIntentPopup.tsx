'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribeUpdates, setSubscribeUpdates] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    if (typeof window === "undefined") return;
    
    const alreadyShown = sessionStorage.getItem("exitPopupShown");
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ email, phone, subscribeUpdates });
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-background rounded-2xl shadow-2xl border border-border p-8 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close popup"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Get the Cyber Snapshot Checklist
                </h3>
                <p className="text-muted-foreground text-sm">
                  A quick-start guide to assess your security posture.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="subscribe"
                    checked={subscribeUpdates}
                    onCheckedChange={(checked) => setSubscribeUpdates(checked === true)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor="subscribe"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    I'd like to receive occasional updates
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-medium"
                >
                  Get the Checklist
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
