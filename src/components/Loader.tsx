import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BOOT_LINES = [
  "ESTABLISHING SECURE CHANNEL ……… OK",
  "VERIFYING IDENTITY: CHENNUPATI, NIRAJ K.",
  "CLEARANCE: LEVEL 5 — ARCHIVE ACCESS GRANTED",
  "MOUNTING PROJECT VAULT [32 FILES] ……… OK",
  "CALIBRATING OPTICS / GRAIN / LIGHT ……… OK",
  "LOADING ENVIRONMENT 01 — THE CORRIDOR",
  "LOADING ENVIRONMENT 02 — THE WORKBENCH",
  "LOADING ENVIRONMENT 03 — THE WINDOW",
  "DISABLING DECORATIVE PARTICLES ……… DONE",
  "FINAL CHECK — NOTHING HERE IS FAKE",
];

const GLYPHS = "█▓▒░<>/\\|#@$%&0123456789ABCDEF";

function useScramble(target: string, active: boolean, speed = 28) {
  const [out, setOut] = useState(target.replace(/./g, " "));
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = target.length;
    const id = setInterval(() => {
      frame++;
      const resolved = Math.floor(frame / 2.2);
      let s = "";
      for (let i = 0; i < total; i++) {
        const ch = target[i];
        if (ch === " ") { s += " "; continue; }
        s += i < resolved ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (resolved >= total) {
        setOut(target);
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [active, target, speed]);
  return out;
}

export default function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(0);
  const [pct, setPct] = useState(0);
  const [nameActive, setNameActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const name = useScramble("NIRAJ KUMAR", nameActive);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    // boot lines cascade
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLineCount(i + 1), 240 + i * 210));
    });
    // progress counter
    const start = performance.now();
    const DUR = 2650;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DUR);
      // ease with a couple of stalls for texture
      const eased = p < 0.5 ? p * 1.1 : 0.55 + (p - 0.5) * 0.9;
      setPct(Math.min(100, Math.floor(eased * 100)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPct(100);
    };
    raf = requestAnimationFrame(tick);

    timers.push(setTimeout(() => setNameActive(true), 900));
    timers.push(setTimeout(() => exit(), 3050));

    const skip = () => exit();
    window.addEventListener("keydown", skip);
    const root = rootRef.current;
    root?.addEventListener("click", skip);

    function exit() {
      if (doneRef.current) return;
      doneRef.current = true;
      setExiting(true);
      const size = Math.hypot(window.innerWidth, window.innerHeight) * 2.4;
      const iris = irisRef.current!;
      const ring = ringRef.current!;
      iris.style.width = iris.style.height = `${size}px`;
      ring.style.width = ring.style.height = `${size}px`;
      iris.style.left = ring.style.left = `${window.innerWidth / 2 - size / 2}px`;
      iris.style.top = ring.style.top = `${window.innerHeight / 2 - size / 2}px`;

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onDone();
        },
      });
      tl.to(contentRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" })
        .set([iris, ring], { scale: 1 })
        .to([iris, ring], { scale: 0, duration: 0.85, ease: "power4.inOut" }, "-=0.1");
    }

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      root?.removeEventListener("click", skip);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] bg-black overflow-hidden select-none">
      {/* iris masks the loader out — sits above content, below nothing */}
      <div ref={irisRef} className="absolute rounded-full will-cam bg-black z-20" style={{ scale: "1" }} />
      <div
        ref={ringRef}
        className="absolute rounded-full will-cam z-20 pointer-events-none"
        style={{ border: "1.5px solid rgba(179,18,46,0.7)", scale: "1" }}
      />

      <div ref={contentRef} className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10">
        {/* top strip */}
        <div className="flex items-center justify-between font-archive text-[10px] md:text-[11px] tracking-[0.35em] text-ash uppercase">
          <span>NKC // PERSONAL ARCHIVE</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-blood animate-pulse" />
            LIVE FEED
          </span>
        </div>

        {/* center name */}
        <div className="flex flex-col items-center gap-6">
          <p className="font-archive text-[10px] md:text-xs tracking-[0.5em] text-blood uppercase">
            Opening the vault
          </p>
          <h1 className="font-black-ops uppercase text-bone text-center leading-none text-[11vw] md:text-[8vw] whitespace-pre">
            {name}
          </h1>
          <p className="font-archive text-[10px] md:text-xs tracking-[0.4em] text-ash uppercase">
            AI / ML Engineer — Bengaluru
          </p>
        </div>

        {/* bottom: log + progress */}
        <div className="grid md:grid-cols-[1fr_220px] gap-6 items-end">
          <div className="font-archive text-[9px] md:text-[10px] leading-relaxed text-ash/80 h-24 overflow-hidden flex flex-col justify-end">
            {BOOT_LINES.slice(0, lineCount).slice(-5).map((l, i) => (
              <p key={i} className={i === Math.min(lineCount, 5) - 1 ? "text-bone" : ""}>
                <span className="text-blood mr-2">&gt;</span>
                {l}
              </p>
            ))}
          </div>
          <div className="text-right">
            <div className="font-black-ops text-5xl md:text-6xl text-bone tabular-nums">
              {pct}
              <span className="text-blood text-2xl align-top">%</span>
            </div>
            <div className="mt-2 h-px bg-white/10 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-blood transition-[width] duration-100"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 font-archive text-[9px] tracking-[0.3em] text-ash uppercase">
              {exiting ? "Entering" : "Click to skip"}
            </p>
          </div>
        </div>
      </div>

      {/* scan sweep */}
      <div
        className="absolute left-0 right-0 h-[2px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(179,18,46,0.85), transparent)",
          animation: "loader-scan 1.6s cubic-bezier(.6,.05,.35,.95) infinite",
        }}
      />
      <style>{`
        @keyframes loader-scan {
          0% { top: -2px; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
