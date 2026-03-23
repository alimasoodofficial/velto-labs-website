import { motion } from "framer-motion";

export const RealityIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" className="w-full max-w-md mx-auto relative z-10">
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(var(--brand-teal) / 0.1)" />
        <stop offset="50%" stopColor="hsl(var(--brand-teal))" />
        <stop offset="100%" stopColor="hsl(var(--brand-teal) / 0.1)" />
      </linearGradient>
    </defs>

    {/* Connecting lines background grid */}
    <g opacity="0.3">
      {[40, 80, 120, 160, 200, 240, 260].map((y, i) => (
        <line key={`h-${i}`} x1="0" y1={y} x2="400" y2={y} stroke="url(#gradientLine)" strokeWidth="0.5" />
      ))}
      {[80, 160, 240, 320].map((x, i) => (
        <motion.line
          key={`v-${i}`} x1={x} y1="0" x2={x} y2="300" stroke="hsl(var(--brand-teal) / 0.2)" strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: i * 0.2 }}
        />
      ))}
    </g>

    {/* Central Core */}
    <motion.circle
      cx="200" cy="150" r="45"
      fill="hsl(var(--brand-teal) / 0.15)"
      stroke="hsl(var(--brand-teal))"
      strokeWidth="2"
      filter="url(#glow)"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
    <motion.circle
      cx="200" cy="150" r="24"
      fill="hsl(var(--brand-teal) / 0.3)"
      stroke="hsl(var(--brand-teal))"
      strokeWidth="1"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
    />

    {/* Orbiting rings */}
    <motion.ellipse
      cx="200" cy="150" rx="140" ry="45"
      fill="none"
      stroke="hsl(var(--brand-teal) / 0.4)"
      strokeWidth="1.5"
      initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
      whileInView={{ rotate: -15, scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    <motion.ellipse
      cx="200" cy="150" rx="140" ry="45"
      fill="none"
      stroke="hsl(var(--brand-teal) / 0.2)"
      strokeWidth="1.5"
      strokeDasharray="4 8"
      initial={{ rotate: 45, scale: 0.8, opacity: 0 }}
      whileInView={{ rotate: 45, scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
    />

    {/* Pressure points (arrows pointing in) */}
    {[
      { angle: 0, delay: 0.5 },
      { angle: 72, delay: 0.6 },
      { angle: 144, delay: 0.7 },
      { angle: 216, delay: 0.8 },
      { angle: 288, delay: 0.9 }
    ].map((point, i) => (
      <motion.g
        key={`pressure-${i}`}
        initial={{ opacity: 0, x: 200 + Math.cos(point.angle * Math.PI / 180) * 180, y: 150 + Math.sin(point.angle * Math.PI / 180) * 180 }}
        whileInView={{ opacity: 1, x: 200 + Math.cos(point.angle * Math.PI / 180) * 90, y: 150 + Math.sin(point.angle * Math.PI / 180) * 90 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: point.delay, type: "spring" }}
      >
        <line
          x1="0" y1="0"
          x2={-Math.cos(point.angle * Math.PI / 180) * 20}
          y2={-Math.sin(point.angle * Math.PI / 180) * 20}
          stroke="hsl(var(--brand-teal))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="0" cy="0" r="5" fill="hsl(var(--brand-teal))" filter="url(#glow)" />
      </motion.g>
    ))}

    {/* Floating elements representing "assessments" & "pressure" */}
    {[{ x: 60, y: 50 }, { x: 340, y: 70 }, { x: 80, y: 250 }, { x: 320, y: 230 }].map((pos, i) => (
      <motion.g
        key={`doc-${i}`}
        initial={{ opacity: 0, x: pos.x, y: pos.y + 20 }}
        whileInView={{ opacity: 1, x: pos.x, y: pos.y }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
      >
        <rect x="-20" y="-24" width="40" height="48" rx="6" fill="hsl(var(--brand-teal) / 0.08)" stroke="hsl(var(--brand-teal) / 0.5)" strokeWidth="1.5" />
        <rect x="-24" y="-28" width="48" height="56" rx="8" fill="none" stroke="hsl(var(--brand-teal) / 0.1)" strokeWidth="1" />
        <line x1="-10" y1="-10" x2="10" y2="-10" stroke="hsl(var(--brand-teal) / 0.6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="hsl(var(--brand-teal) / 0.6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="-10" y1="10" x2="4" y2="10" stroke="hsl(var(--brand-teal) / 0.6)" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    ))}

    {/* Subtle animated dots moving radially */}
    {[30, 150, 270].map((angle, i) => (
      <motion.circle
        key={`dot-${i}`}
        r="3"
        fill="hsl(var(--brand-teal))"
        initial={{
          cx: 200 + Math.cos(angle * Math.PI / 180) * 160,
          cy: 150 + Math.sin(angle * Math.PI / 180) * 160,
          opacity: 0
        }}
        whileInView={{
          cx: 200 + Math.cos(angle * Math.PI / 180) * 45,
          cy: 150 + Math.sin(angle * Math.PI / 180) * 45,
          opacity: [0, 1, 0]
        }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1 + i * 0.3, repeat: Infinity, repeatDelay: 1 }}
      />
    ))}
  </svg>
);

export const EvidenceIllustration = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 mx-auto">
    <rect x="10" y="10" width="60" height="60" rx="8" fill="hsl(var(--brand-teal) / 0.1)" stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="1.5" />
    <path d="M25 40 L35 50 L55 30" stroke="hsl(var(--brand-teal))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SnapshotIllustration = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 mx-auto">
    <circle cx="40" cy="40" r="28" fill="hsl(var(--brand-teal) / 0.1)" stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="12" fill="hsl(var(--brand-teal) / 0.15)" stroke="hsl(var(--brand-teal))" strokeWidth="2" />
    <circle cx="40" cy="40" r="4" fill="hsl(var(--brand-teal))" />
    {/* Crosshairs */}
    <line x1="40" y1="8" x2="40" y2="20" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="1.5" />
    <line x1="40" y1="60" x2="40" y2="72" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="1.5" />
    <line x1="8" y1="40" x2="20" y2="40" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="1.5" />
    <line x1="60" y1="40" x2="72" y2="40" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="1.5" />
  </svg>
);

export const PlanIllustration = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 mx-auto">
    <rect x="12" y="15" width="56" height="50" rx="6" fill="hsl(var(--brand-teal) / 0.1)" stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="1.5" />
    {/* Lines */}
    <line x1="22" y1="30" x2="58" y2="30" stroke="hsl(var(--brand-teal) / 0.5)" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="40" x2="50" y2="40" stroke="hsl(var(--brand-teal) / 0.35)" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="50" x2="42" y2="50" stroke="hsl(var(--brand-teal) / 0.25)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DeliverIllustration = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 mx-auto">
    <circle cx="40" cy="40" r="28" fill="hsl(var(--brand-teal) / 0.1)" stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="1.5" />
    {/* Gear */}
    <path d="M40 25 L43 30 L49 30 L45 35 L47 41 L40 38 L33 41 L35 35 L31 30 L37 30 Z"
      fill="hsl(var(--brand-teal) / 0.2)" stroke="hsl(var(--brand-teal))" strokeWidth="1.5" />
    {/* Arrow up */}
    <path d="M40 45 L40 58 M34 52 L40 45 L46 52" stroke="hsl(var(--brand-teal))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
