import { useEffect, useState } from "react";
import cpLogo from "@/assets/cp-logo.png";
import bgHero from "@/assets/bg-hero.jpg";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Index() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ps: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.15,
    }));
    setParticles(ps);
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="coming-soon-root" style={{ backgroundImage: `url(${bgHero})` }}>
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsl(272 58% 70% / ${p.opacity}), hsl(38 85% 65% / ${p.opacity * 0.4}))`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            position: "absolute",
          }}
        />
      ))}

      {/* Spinning ring decoration */}
      <div className="spin-ring" />

      {/* Main content */}
      <main className={`coming-soon-content ${visible ? "content-visible" : "content-hidden"}`}>
        {/* Logo */}
        <div className="logo-wrapper animate-float animate-pulse-glow" style={{ animationDelay: "0s" }}>
          <img src={cpLogo} alt="CP Logo" className="logo-image" />
        </div>

        {/* Heading */}
        <div style={{ animationDelay: "0.2s" }} className="animate-fade-in-up text-center">
          <h1 className="coming-soon-title shimmer-text">Coming Soon</h1>
          <p className="coming-soon-subtitle">
            Something extraordinary is on its way.
            <br className="hidden sm:block" /> Stay tuned for the big reveal.
          </p>
        </div>

        {/* Divider dots */}
        <div style={{ animationDelay: "0.4s" }} className="animate-fade-in-up dots-row">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="dot"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>

        {/* Footer */}
        <p style={{ animationDelay: "0.8s" }} className="animate-fade-in-up coming-soon-footer">
          © 2025 CP · All rights reserved
        </p>
      </main>

      <style>{`
        .coming-soon-root {
          min-height: 100vh;
          width: 100%;
          background-color: hsl(228 35% 7%);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Dark overlay over the background image */
        .coming-soon-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, hsl(228 40% 5% / 0.82) 0%, hsl(260 35% 10% / 0.75) 50%, hsl(228 35% 5% / 0.85) 100%);
          z-index: 1;
        }

        /* Ensure orbs and content sit above the overlay */
        .orb, .spin-ring { z-index: 2; }
        .coming-soon-content { z-index: 10; }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, hsl(272 58% 52% / 0.3), hsl(240 50% 40% / 0.1));
          top: -20%; left: -12%;
          animation: float 8s ease-in-out infinite;
        }
        .orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, hsl(38 85% 58% / 0.18), hsl(20 70% 45% / 0.06));
          bottom: -18%; right: -12%;
          animation: float 10s ease-in-out infinite reverse;
        }
        .orb-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, hsl(210 60% 50% / 0.15), hsl(240 50% 35% / 0.05));
          top: 35%; left: 55%;
          animation: float 7s ease-in-out infinite 2s;
        }

        .spin-ring {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          border: 1px solid hsl(272 58% 52% / 0.08);
          animation: spin-slow 20s linear infinite;
          pointer-events: none;
        }

        .coming-soon-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem 1.5rem;
          max-width: 640px;
          width: 100%;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .content-hidden { opacity: 0; transform: translateY(20px); }
        .content-visible { opacity: 1; transform: translateY(0); }

        .logo-wrapper {
          width: 140px; height: 140px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: var(--shadow-glow);
        }
        @media (min-width: 640px) {
          .logo-wrapper { width: 180px; height: 180px; border-radius: 40px; }
        }

        .logo-image {
          width: 100%; height: 100%;
          object-fit: cover;
        }

        .coming-soon-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.75rem;
        }

        .coming-soon-subtitle {
          color: hsl(228 20% 72%);
          font-size: clamp(0.95rem, 2.5vw, 1.125rem);
          font-weight: 300;
          line-height: 1.7;
          letter-spacing: 0.02em;
          margin-top: 1.25rem;
        }

        .countdown-wrapper {
          display: flex;
          align-items: center;
          gap: clamp(0.5rem, 2vw, 1.25rem);
          flex-wrap: nowrap;
        }

        .countdown-card {
          background: hsl(276 50% 16% / 0.8);
          border: 1px solid hsl(276 90% 65% / 0.25);
          border-radius: 16px;
          padding: clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 1.75rem);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px hsl(276 80% 5% / 0.4), inset 0 1px 0 hsl(276 90% 75% / 0.1);
          min-width: clamp(60px, 14vw, 90px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .countdown-number {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 700;
          color: hsl(0 0% 98%);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .countdown-label {
          font-size: clamp(0.6rem, 1.5vw, 0.75rem);
          color: hsl(276 20% 65%);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 500;
        }

        .countdown-dot {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          color: hsl(276 90% 65% / 0.6);
          font-weight: 300;
          margin-bottom: 1.5rem;
          line-height: 1;
        }

        .dots-row {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .dot {
          display: block;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, hsl(272 58% 52%), hsl(272 50% 65%));
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .coming-soon-footer {
          color: hsl(276 15% 55%);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
        }
      `}</style>
    </div>
  );
}
