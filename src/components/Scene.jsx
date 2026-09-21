import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ scene, index, active }) {
  const root = useRef(null);
  const image = useRef(null);
  const secondaryImage = useRef(null);
  const copy = useRef(null);
  const badgeRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = root.current.querySelector(".scene-copy h2");
      const subtitle = root.current.querySelector(".scene-subtitle");
      const description = root.current.querySelector(".scene-description");
      const meta = root.current.querySelector(".scene-meta");
      const tag = root.current.querySelector(".scene-tag");

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      introTimeline
        .fromTo(
          copy.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }
        )
        .fromTo(
          [title, subtitle, description, meta, tag],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          badgeRefs.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" },
          "-=0.45"
        );

      gsap.fromTo(
        image.current,
        {
          y: 32,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (secondaryImage.current) {
        gsap.fromTo(
          secondaryImage.current,
          {
            x: 35,
            y: 18,
            opacity: 0,
            rotate: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 7,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(secondaryImage.current, {
          y: -12,
          rotate: 10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      }

      gsap.to(image.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(root.current.querySelector(".scene-ring"), {
        rotate: 360,
        duration: 22,
        repeat: -1,
        ease: "none",
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [index]);

  return (
    <section
      ref={root}
      className={`scene ${active ? "is-active" : ""}`}
      id={scene.id}
    >
      <div className="scene-inner">
        <div className="scene-copy" ref={copy}>
          <span className="scene-index">0{index + 1}</span>
          <span className="scene-eyebrow">{scene.eyebrow}</span>
          <h2>{scene.title}</h2>
          <p className="scene-subtitle">{scene.subtitle}</p>

          {scene.description && <p className="scene-description">{scene.description}</p>}

          {scene.highlights && (
            <div className="scene-badges">
              {scene.highlights.map((highlight, badgeIndex) => (
                <span
                  key={highlight}
                  ref={(el) => {
                    badgeRefs.current[badgeIndex] = el;
                  }}
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          <div className="scene-meta">
            <strong>{scene.detail}</strong>
            <span>{scene.location}</span>
          </div>

          <span className="scene-tag">{scene.tag}</span>
        </div>

        <div className="scene-media">
          <div
            ref={image}
            className="scene-image"
            style={{
              backgroundImage: `url("${scene.image}")`,
            }}
          />

          {scene.secondaryImage && (
            <div
              ref={secondaryImage}
              className="scene-secondary-image"
              style={{
                backgroundImage: `url("${scene.secondaryImage}")`,
              }}
            />
          )}

          <div className="scene-ring" />
        </div>
      </div>
    </section>
  );
}