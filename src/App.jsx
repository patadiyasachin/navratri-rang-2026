import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./components/Intro";
import Particles from "./components/Particles";
import Scene from "./components/Scene";
import BottomBar from "./components/BottomBar";
import { scenes } from "./data/content";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!entered) return;

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
      lerp: 0.08,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateScroll = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = scenes.findIndex((s) => s.id === entry.target.id);
            if (index >= 0) setActive(index);
          }
        });
      },
      { threshold: 0.55 }
    );

    document.querySelectorAll(".scene").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
    };
  }, [entered]);

  const enter = () => {
    setEntered(true);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  };

  if (!entered) return <Intro onEnter={enter} />;

  return (
    <main>
      <header className="top-nav">
        <div className="brand-mark">✦</div>
        <div className="nav-title">NAVRATRI RANG 2026</div>
        <div className="nav-count">{String(active + 1).padStart(2, "0")} / 04</div>
      </header>

      <Particles />

      <div className="progress">
        {scenes.map((scene, i) => (
          <a
            href={`#${scene.id}`}
            key={scene.id}
            className={i === active ? "active" : ""}
            aria-label={`Go to scene ${i + 1}`}
          />
        ))}
      </div>

      {scenes.map((scene, index) => (
        <Scene key={scene.id} scene={scene} index={index} active={index === active} />
      ))}

      <section className="closing">
        <div className="closing-orbit">✦</div>
        <p>રંગ • રાસ • સંસ્કૃતિ</p>
        <h2>See you on<br />10 October 2026</h2>
        <span>Sahiyar Club • Racecourse Grounds • Rajkot</span>
        <div className="closing-line" />
        <strong>SHRI SAVA GROUP</strong>
      </section>

      <BottomBar />
    </main>
  );
}