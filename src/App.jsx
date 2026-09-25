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
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState(0.25);
  const audioRef = React.useRef(null);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = !audioEnabled;
  }, [volume, audioEnabled]);

  const enter = () => {
    setEntered(true);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = !audioEnabled;
      audio.play().catch(() => { });
    }
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  if (!entered) return <Intro onEnter={enter} />;

  return (
    <main>
      <div className="audio-control">
        <button
          type="button"
          className="audio-toggle"
          onClick={toggleAudio}
          aria-label={audioEnabled ? "Mute music" : "Unmute music"}
        >
          {audioEnabled ? "🔊" : "🔇"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volume"
          className="audio-slider"
        />
      </div>

      <audio
        ref={audioRef}
        src="/music/kalsstockmedia-free-soul-instrumental-garba-song-2025-405946.mp3"
        loop
        autoPlay
        playsInline
      />

      <header className="top-nav">
        <div className="brand-mark">✦</div>
        <div className="nav-title">Nidhivan Ratri 2026</div>
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

      <footer className="site-footer">
        <div className="photographer-card-wrap">
          <img
            className="photographer-card-image"
            src="/images/photographer-card.png"
            alt="Photographer card"
          />
        </div>

        <div className="footer-credit-strip">
          <span>Made by this website</span>
          <span className="credit-divider">•</span>
          <strong>Sachin Patadiya</strong>
          <span className="credit-divider">•</span>
          <a href="tel:+917572819370">+91 75728 19370</a>
          <span className="credit-divider">•</span>
          <a
            href="https://instagram.com/mr.sachin2004"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Instagram profile"
            className="instagram-link"
          >
            <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="insta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="30%" stopColor="#fa7e1e" />
                  <stop offset="60%" stopColor="#d62976" />
                  <stop offset="100%" stopColor="#4f5bd5" />
                </linearGradient>
              </defs>
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="url(#insta-gradient)" />
              <rect x="7" y="7" width="10" height="10" rx="3" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2.5" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="16.3" cy="7.7" r="1.1" fill="white" />
            </svg>
            <span>@mr.sachin2004</span>
          </a>
        </div>
      </footer>

      <BottomBar />
    </main>
  );
}