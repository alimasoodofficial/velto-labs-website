import { motion } from "framer-motion";

// Services page - Network/nodes illustration (Modernized)
export const ServicesIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
    <defs>
      <pattern id="services-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--brand-teal) / 0.05)" strokeWidth="1" />
      </pattern>
    </defs>

    <rect width="400" height="300" fill="url(#services-grid)" />

    {/* Connection lines (Circuit style) */}
    {[
      "M200 150 L100 150 L80 100",
      "M200 150 L300 150 L320 100",
      "M200 150 L120 220 L80 220",
      "M200 150 L280 220 L320 220",
      "M200 150 L200 50 L250 50",
      "M200 150 L200 250 L150 250",
    ].map((path, i) => (
      <g key={i}>
        <motion.path
          d={path}
          stroke="hsl(var(--brand-teal) / 0.2)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.1 }}
        />
        {/* Moving data packets */}
        <motion.circle r="3" fill="hsl(var(--brand-teal))"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 1, 0.5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear"
          }}
          style={{ offsetPath: `path("${path}")` }}
        />
      </g>
    ))}

    {/* Central hub with rotating rings */}
    <g transform="translate(200, 150)">
      <motion.circle r="35" stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="1" strokeDasharray="10 5"
        animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
      <motion.circle r="25" stroke="hsl(var(--brand-teal))" strokeWidth="2" strokeDasharray="5 15"
        animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
      <motion.circle r="15" fill="hsl(var(--brand-teal) / 0.2)" stroke="hsl(var(--brand-teal))" strokeWidth="2"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M-6 -2 L0 4 L8 -6" stroke="hsl(var(--brand-teal))" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
    </g>

    {/* Satellite Nodes */}
    {[
      { x: 80, y: 100 }, { x: 320, y: 100 },
      { x: 80, y: 220 }, { x: 320, y: 220 },
      { x: 250, y: 50 }, { x: 150, y: 250 }
    ].map((node, i) => (
      <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
        <circle cx={node.x} cy={node.y} r="10" fill="hsl(var(--brand-navy) / 0.8)" stroke="hsl(var(--brand-teal) / 0.5)" strokeWidth="1" />
        <motion.circle cx={node.x} cy={node.y} r="4" fill="hsl(var(--brand-teal))"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
      </motion.g>
    ))}
  </svg>
);

// Blog page - Document/insights illustration
export const BlogIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
    {/* Main document */}
    <motion.rect x="130" y="40" width="140" height="180" rx="8" fill="hsl(var(--brand-teal) / 0.06)" stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="1.5"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />
    {/* Lines */}
    {[70, 90, 110, 130, 150, 170].map((y, i) => (
      <motion.line key={i} x1="155" y1={y} x2={250 - i * 8} y2={y} stroke="hsl(var(--brand-teal) / 0.25)" strokeWidth="2" strokeLinecap="round"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 + i * 0.08 }} />
    ))}

    {/* Floating cards */}
    {[{ x: 60, y: 80, r: -8 }, { x: 290, y: 100, r: 6 }, { x: 80, y: 200, r: -4 }].map((card, i) => (
      <motion.g key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.15 }}>
        <rect x={card.x} y={card.y} width="50" height="60" rx="6" fill="hsl(var(--brand-teal) / 0.08)" stroke="hsl(var(--brand-teal) / 0.2)" strokeWidth="1"
          transform={`rotate(${card.r} ${card.x + 25} ${card.y + 30})`} />
      </motion.g>
    ))}

    {/* Magnifying glass */}
    <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.0 }}>
      <circle cx="310" cy="60" r="18" fill="none" stroke="hsl(var(--brand-teal))" strokeWidth="2.5" />
      <line x1="323" y1="73" x2="338" y2="88" stroke="hsl(var(--brand-teal))" strokeWidth="3" strokeLinecap="round" />
    </motion.g>

    {/* Sparkles */}
    {[{ x: 100, y: 50 }, { x: 320, y: 180 }, { x: 150, y: 250 }].map((s, i) => (
      <motion.circle key={i} cx={s.x} cy={s.y} r="3" fill="hsl(var(--brand-teal))"
        initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0] }} transition={{ delay: 1.2 + i * 0.3, duration: 2, repeat: Infinity }} />
    ))}
  </svg>
);

// Contact page - Communication/message illustration
export const ContactIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
    {/* Chat bubble main */}
    <motion.path d="M100 80 L300 80 C310 80 320 90 320 100 L320 180 C320 190 310 200 300 200 L180 200 L140 240 L140 200 L100 200 C90 200 80 190 80 180 L80 100 C80 90 90 80 100 80Z"
      fill="hsl(var(--brand-teal) / 0.08)" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="2"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} />

    {/* Message lines */}
    {[120, 145, 170].map((y, i) => (
      <motion.line key={i} x1="110" y1={y} x2={270 - i * 20} y2={y} stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 + i * 0.12 }} />
    ))}

    {/* Send icon */}
    <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
      <path d="M290 130 L340 110 L320 160 L310 135 Z" fill="hsl(var(--brand-teal) / 0.2)" stroke="hsl(var(--brand-teal))" strokeWidth="1.5" strokeLinejoin="round" />
    </motion.g>

    {/* Signal waves */}
    {[20, 30, 40].map((r, i) => (
      <motion.circle key={i} cx="340" cy="110" r={r} fill="none" stroke="hsl(var(--brand-teal) / 0.15)" strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: [0, 0.3, 0] }} transition={{ delay: 1.2 + i * 0.2, duration: 2, repeat: Infinity }} />
    ))}
  </svg>
);

// Privacy page - Shield/lock illustration
export const PrivacyIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
    {/* Shield */}
    <motion.path d="M200 30 L310 80 L310 170 C310 230 260 270 200 290 C140 270 90 230 90 170 L90 80 Z"
      fill="hsl(var(--brand-teal) / 0.06)" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.0 }} />

    {/* Inner shield */}
    <motion.path d="M200 70 L280 105 L280 170 C280 215 245 245 200 260 C155 245 120 215 120 170 L120 105 Z"
      fill="hsl(var(--brand-teal) / 0.08)" stroke="hsl(var(--brand-teal) / 0.2)" strokeWidth="1.5"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />

    {/* Eye icon */}
    <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
      <ellipse cx="200" cy="160" rx="35" ry="20" fill="none" stroke="hsl(var(--brand-teal))" strokeWidth="2.5" />
      <circle cx="200" cy="160" r="10" fill="hsl(var(--brand-teal) / 0.3)" stroke="hsl(var(--brand-teal))" strokeWidth="2" />
      <circle cx="200" cy="160" r="4" fill="hsl(var(--brand-teal))" />
    </motion.g>

    {/* Cross-out line for "no watching" */}
    <motion.line x1="165" y1="190" x2="235" y2="130" stroke="hsl(var(--brand-teal))" strokeWidth="2.5" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.4 }} />
  </svg>
);

// Terms page - Document/gavel illustration
export const TermsIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
    {/* Document */}
    <motion.rect x="120" y="50" width="160" height="210" rx="8" fill="hsl(var(--brand-teal) / 0.06)" stroke="hsl(var(--brand-teal) / 0.3)" strokeWidth="1.5"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />

    {/* Section lines */}
    {[80, 100, 120, 150, 170, 190, 220].map((y, i) => (
      <motion.line key={i} x1="145" y1={y} x2={i % 3 === 0 ? 200 : 255} y2={y}
        stroke={i % 3 === 0 ? "hsl(var(--brand-teal) / 0.5)" : "hsl(var(--brand-teal) / 0.2)"}
        strokeWidth={i % 3 === 0 ? 2.5 : 2} strokeLinecap="round"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 + i * 0.06 }} />
    ))}

    {/* Seal/stamp */}
    <motion.g initial={{ opacity: 0, scale: 0, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.9, type: "spring" }}>
      <circle cx="240" cy="210" r="25" fill="hsl(var(--brand-teal) / 0.12)" stroke="hsl(var(--brand-teal))" strokeWidth="2" />
      <circle cx="240" cy="210" r="18" fill="none" stroke="hsl(var(--brand-teal) / 0.4)" strokeWidth="1" />
      <path d="M230 210 L238 218 L252 204" stroke="hsl(var(--brand-teal))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>

    {/* Pen */}
    <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
      <line x1="300" y1="100" x2="340" y2="60" stroke="hsl(var(--brand-teal) / 0.6)" strokeWidth="3" strokeLinecap="round" />
      <polygon points="298,104 302,96 310,104" fill="hsl(var(--brand-teal))" />
    </motion.g>
  </svg>
);
