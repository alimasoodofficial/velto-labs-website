import { motion } from "framer-motion";
import { useState } from "react";

export const HeroIllustration = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg mx-auto cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        {/* Glow filter */}
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="heroGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Shield gradient */}
        <linearGradient id="shieldGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--brand-teal) / 0.25)" />
          <stop offset="100%" stopColor="hsl(var(--brand-teal) / 0.05)" />
        </linearGradient>
        {/* Radial glow behind shield */}
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--brand-teal) / 0.2)" />
          <stop offset="100%" stopColor="hsl(var(--brand-teal) / 0)" />
        </radialGradient>
        {/* Ring gradient */}
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--brand-teal))" />
          <stop offset="50%" stopColor="hsl(var(--brand-teal) / 0.3)" />
          <stop offset="100%" stopColor="hsl(var(--brand-teal))" />
        </linearGradient>
      </defs>

      {/* ── Background Rings ── */}
      <motion.circle
        cx="250" cy="250" r="230"
        fill="none"
        stroke="hsl(var(--brand-teal) / 0.06)"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      />
      <motion.circle
        cx="250" cy="250" r="200"
        fill="hsl(var(--brand-teal) / 0.04)"
        stroke="hsl(var(--brand-teal) / 0.1)"
        strokeWidth="1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.circle
        cx="250" cy="250" r="150"
        fill="hsl(var(--brand-teal) / 0.06)"
        stroke="hsl(var(--brand-teal) / 0.08)"
        strokeWidth="1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Radial glow behind shield */}
      <motion.circle
        cx="250" cy="250" r="120"
        fill="url(#coreGlow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Animated orbit ring (dashed, rotating) ── */}
      <motion.circle
        cx="250" cy="250" r="200"
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="1.5"
        strokeDasharray="8 12"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "250px 250px" }}
      />
      <motion.circle
        cx="250" cy="250" r="165"
        fill="none"
        stroke="hsl(var(--brand-teal) / 0.12)"
        strokeWidth="1"
        strokeDasharray="3 9"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "250px 250px" }}
      />

      {/* ── Connection lines (radial spokes) ── */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 250 + 100 * Math.cos(rad);
        const y1 = 250 + 100 * Math.sin(rad);
        const x2 = 250 + 200 * Math.cos(rad);
        const y2 = 250 + 200 * Math.sin(rad);
        return (
          <motion.line
            key={`spoke-${angle}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="hsl(var(--brand-teal) / 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.2 + angle / 600 }}
          />
        );
      })}

      {/* ── Shield ── */}
      <motion.path
        d="M250 100 L340 150 L340 270 C340 330 300 380 250 400 C200 380 160 330 160 270 L160 150 Z"
        fill="url(#shieldGrad)"
        stroke="hsl(var(--brand-teal))"
        strokeWidth="2.5"
        filter="url(#heroGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      {/* Inner shield highlight */}
      <motion.path
        d="M250 125 L325 168 L325 268 C325 320 290 362 250 380 C210 362 175 320 175 268 L175 168 Z"
        fill="none"
        stroke="hsl(var(--brand-teal) / 0.2)"
        strokeWidth="1"
        strokeDasharray="4 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* ── Lock shackle ── */}
      <motion.path
        d="M230 230 L230 210 C230 195 240 185 250 185 C260 185 270 195 270 210 L270 230"
        fill="none"
        stroke="hsl(var(--brand-teal))"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      />

      {/* ── Lock body ── */}
      <motion.rect
        x="218" y="228" width="64" height="54" rx="8"
        fill="hsl(var(--brand-teal))"
        stroke="hsl(var(--brand-teal))"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
      {/* Lock body inner border */}
      <motion.rect
        x="222" y="232" width="56" height="46" rx="6"
        fill="none"
        stroke="hsl(var(--background) / 0.15)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      />

      {/* ── Keyhole ── */}
      <motion.circle
        cx="250" cy="249" r="7"
        fill="hsl(var(--background))"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      />
      <motion.rect
        x="247" y="254" width="6" height="12" rx="3"
        fill="hsl(var(--background))"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />

      {/* ── Orbiting nodes ── */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 250 + 200 * Math.cos(rad);
        const cy = 250 + 200 * Math.sin(rad);
        return (
          <g key={`node-${angle}`}>
            {/* Outer ring per node */}
            <motion.circle
              cx={cx} cy={cy} r="12"
              fill="none"
              stroke="hsl(var(--brand-teal) / 0.25)"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 3, delay: 1.6 + i * 0.15, repeat: Infinity }}
            />
            {/* Node dot */}
            <motion.circle
              cx={cx} cy={cy} r="5"
              fill="hsl(var(--brand-teal))"
              filter="url(#heroGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, delay: 1.5 + i * 0.15, repeat: Infinity }}
            />
          </g>
        );
      })}

      {/* ── Data stream particles (moving along spokes) ── */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const startX = 250 + 200 * Math.cos(rad);
        const startY = 250 + 200 * Math.sin(rad);
        const endX = 250 + 100 * Math.cos(rad);
        const endY = 250 + 100 * Math.sin(rad);
        return (
          <motion.circle
            key={`particle-${angle}`}
            r="2.5"
            fill="hsl(var(--brand-teal))"
            filter="url(#heroGlow)"
            initial={{ cx: startX, cy: startY, opacity: 0 }}
            animate={{ cx: endX, cy: endY, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 2 + i * 0.4, repeat: Infinity, repeatDelay: 1.5 }}
          />
        );
      })}

      {/* ── Scan line effect ── */}
      <motion.line
        x1="160" y1="250" x2="340" y2="250"
        stroke="hsl(var(--brand-teal) / 0.15)"
        strokeWidth="1"
        initial={{ y1: 150, y2: 150 }}
        animate={{ y1: [150, 380, 150], y2: [150, 380, 150] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Floating status icons (checkmarks) ── */}
      {[
        { x: 130, y: 140, delay: 1.8 },
        { x: 355, y: 160, delay: 2.1 },
        { x: 145, y: 360, delay: 2.4 },
      ].map(({ x, y, delay }, i) => (
        <motion.g
          key={`check-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, type: "spring", stiffness: 150 }}
        >
          <circle cx={x} cy={y} r="14" fill="hsl(var(--brand-teal) / 0.1)" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="1" />
          <motion.path
            d={`M${x - 5} ${y} L${x - 1} ${y + 4} L${x + 6} ${y - 4}`}
            fill="none"
            stroke="hsl(var(--brand-teal))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
          />
        </motion.g>
      ))}

      {/* ── Hover pulse ring ── */}
      <motion.circle
        cx="250" cy="250" r="110"
        fill="none"
        stroke="hsl(var(--brand-teal))"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isHovered ? [0, 0.5, 0] : 0,
          scale: isHovered ? [0.9, 1.3, 1.6] : 0.9,
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        style={{ transformOrigin: "250px 250px" }}
      />

      {/* ── Corner accent brackets ── */}
      {[
        { d: "M95 95 L95 120 M95 95 L120 95", delay: 1.6 },
        { d: "M405 95 L405 120 M405 95 L380 95", delay: 1.7 },
        { d: "M95 405 L95 380 M95 405 L120 405", delay: 1.8 },
        { d: "M405 405 L405 380 M405 405 L380 405", delay: 1.9 },
      ].map(({ d, delay }, i) => (
        <motion.path
          key={`bracket-${i}`}
          d={d}
          fill="none"
          stroke="hsl(var(--brand-teal) / 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay }}
        />
      ))}

      {/* ── Bottom checkmark (kept from original, refined) ── */}
      <motion.path
        d="M200 330 L230 355 L310 285"
        fill="none"
        stroke="hsl(var(--brand-teal) / 0.35)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      />
    </motion.svg>
  );
};
