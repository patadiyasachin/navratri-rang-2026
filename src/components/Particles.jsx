import React, { useMemo } from "react";

export default function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 101}%`,
        delay: `${(i % 9) * 0.7}s`,
        duration: `${6 + (i % 7)}s`,
        size: `${2 + (i % 4)}px`,
      })),
    []
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}