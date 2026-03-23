'use client';

 import { useEffect, useRef, useCallback } from "react";
 import gsap from "gsap";
 
 interface SplitTextProps {
   text: string;
   className?: string;
   delay?: number;
   duration?: number;
   stagger?: number;
   ease?: string;
   splitType?: "chars" | "words" | "lines";
   from?: gsap.TweenVars;
   to?: gsap.TweenVars;
   tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
   onComplete?: () => void;
 }
 
 export const SplitText = ({
   text,
   className = "",
   delay = 0,
   duration = 0.6,
   stagger = 0.03,
   ease = "power3.out",
   splitType = "chars",
   from = { opacity: 0, y: 40 },
   to = { opacity: 1, y: 0 },
   tag: Tag = "div",
   onComplete,
 }: SplitTextProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const hasAnimated = useRef(false);
 
   const splitContent = useCallback(() => {
     if (splitType === "chars") {
       return text.split("").map((char, i) => (
         <span
           key={i}
           className="split-char inline-block"
           style={{ opacity: 0 }}
         >
           {char === " " ? "\u00A0" : char}
         </span>
       ));
     } else if (splitType === "words") {
       return text.split(" ").map((word, i) => (
         <span
           key={i}
           className="split-word inline-block mr-[0.25em]"
           style={{ opacity: 0 }}
         >
           {word}
         </span>
       ));
     } else {
       // lines - treat whole text as one line
       return (
         <span className="split-line inline-block" style={{ opacity: 0 }}>
           {text}
         </span>
       );
     }
   }, [text, splitType]);
 
   useEffect(() => {
     if (!containerRef.current || hasAnimated.current) return;
 
     const elements = containerRef.current.querySelectorAll(
       `.split-${splitType === "chars" ? "char" : splitType === "words" ? "word" : "line"}`
     );
 
     if (elements.length === 0) return;
 
     hasAnimated.current = true;
 
     gsap.fromTo(
       elements,
       from,
       {
         ...to,
         duration,
         stagger,
         delay,
         ease,
         onComplete,
       }
     );
   }, [delay, duration, stagger, ease, splitType, from, to, onComplete]);
 
   return (
     <Tag ref={containerRef as any} className={className}>
       {splitContent()}
     </Tag>
   );
 };