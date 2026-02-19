import { useEffect, useState, useRef } from "react";
import cpLogo from "@/assets/cp-logo.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const LAUNCH_DATE = new Date("2025-06-01T00:00:00");

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="countdown-card">
        <span className="countdown-number">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function Index() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
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

    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="coming-soon-root">
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
            background: `radial-gradient(circle, hsl(285 95% 75% / ${p.opacity}), hsl(300 85% 70% / ${p.opacity * 0.5}))`,
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

        {/* Countdown */}
        <div style={{ animationDelay: "0.4s" }} className="animate-fade-in-up countdown-wrapper">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <div className="countdown-dot">:</div>
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <div className="countdown-dot">:</div>
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <div className="countdown-dot">:</div>
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Divider dots */}
        <div style={{ animationDelay: "0.6s" }} className="animate-fade-in-up dots-row">
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
          background: var(--gradient-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: hsl(276 90% 55% / 0.25);
          top: -15%; left: -10%;
          animation: float 8s ease-in-out infinite;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: hsl(300 85% 65% / 0.2);
          bottom: -15%; right: -10%;
          animation: float 10s ease-in-out infinite reverse;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: hsl(260 80% 60% / 0.15);
          top: 40%; left: 60%;
          animation: float 7s ease-in-out infinite 2s;
        }

        .spin-ring {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          border: 1px solid hsl(276 90% 65% / 0.08);
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
          color: hsl(276 20% 75%);
          font-size: clamp(0.95rem, 2.5vw, 1.125rem);
          font-weight: 300;
          line-height: 1.7;
          letter-spacing: 0.02em;
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
          background: linear-gradient(135deg, hsl(276 90% 65%), hsl(300 85% 70%));
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
