import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Intro({ onEnter }) {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".intro-symbol", { scale: 0.65, opacity: 0, duration: 1.1, ease: "back.out(1.7)" })
        .from(".intro-kicker", { y: 20, opacity: 0, duration: 0.55 }, "-=0.55")
        .from(".intro-title", { y: 35, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.35")
        .from(".intro-button", { y: 20, opacity: 0, duration: 0.6 }, "-=0.35");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="intro">
      <div className="intro-glow" />
      <div className="intro-symbol">✦</div>
      <div className="intro-kicker">SHRI SAVA GROUP • 2026</div>
      <h1 className="intro-title">નિધિવન રાત્રિ</h1>
      <p className="intro-copy">A cinematic Navratri experience</p>
      <button className="intro-button" onClick={onEnter}>
        ENTER THE EXPERIENCE <span>↓</span>
      </button>
      <div className="intro-foot">10 OCTOBER 2026 • RAJKOT</div>
    </div>
  );
}