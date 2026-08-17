import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img01 from "@/assets/img01-corridor.jpg";
import img02 from "@/assets/img02-workspace.jpg";
import img03 from "@/assets/img03-workstation.jpg";
import { featured } from "@/data/projects";
import type { Route } from "@/lib/routes";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  booted: boolean;
  onNavigate: (to: Route, e: React.MouseEvent) => void;
  onOpenFile: (fileId: string, e: React.MouseEvent) => void;
};

export default function Home({ booted, onNavigate, onOpenFile }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const s1Ref = useRef<HTMLDivElement>(null);
  const s1ImgRef = useRef<HTMLImageElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s2ImgRef = useRef<HTMLImageElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const s3ImgRef = useRef<HTMLImageElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const barTopRef = useRef<HTMLDivElement>(null);
  const barBotRef = useRef<HTMLDivElement>(null);

  /* ---------- scroll-driven camera journey ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      /* ACT 0 — the corridor settles (0.00 – 0.12) */
      tl.fromTo(
        s1ImgRef.current,
        { scale: 1.18, yPercent: -3 },
        { scale: 1.05, yPercent: 1.5, duration: 0.12 },
        0
      );
      tl.to(hintRef.current, { opacity: 0, duration: 0.03 }, 0.04);

      /* hero text leaves before any image motion (0.10 – 0.17) */
      tl.to(heroRef.current, { yPercent: -26, opacity: 0, duration: 0.07, ease: "power1.in" }, 0.1);

      /* ACT 1 — camera pushes into the archive (0.14 – 0.30) */
      tl.fromTo(capRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.04 }, 0.17);
      tl.to(s1ImgRef.current, { scale: 1.22, xPercent: -4.5, duration: 0.16 }, 0.14);
      tl.to(capRef.current, { opacity: 0, y: -18, duration: 0.04 }, 0.27);

      /* TRANSITION A — clean stage, no text: workbench iris-opens (0.30 – 0.45) */
      tl.fromTo(
        s2Ref.current,
        { clipPath: "circle(0% at 50% 56%)" },
        { clipPath: "circle(130% at 50% 56%)", duration: 0.15, ease: "power1.inOut" },
        0.3
      );
      tl.fromTo(s2ImgRef.current, { scale: 1.16 }, { scale: 1.02, duration: 0.15 }, 0.3);

      /* ACT 2 — work index slides in, workbench drifts left (0.47 – 0.62) */
      tl.fromTo(
        workRef.current,
        { opacity: 0, xPercent: 10 },
        { opacity: 1, xPercent: 0, duration: 0.05, ease: "power1.out" },
        0.47
      );
      tl.to(s2ImgRef.current, { xPercent: -5.5, scale: 1.07, duration: 0.17 }, 0.46);
      tl.to(workRef.current, { opacity: 0, xPercent: -7, duration: 0.045, ease: "power1.in" }, 0.6);

      /* TRANSITION B — clean stage: the window emerges from the dark (0.64 – 0.78) */
      tl.fromTo(
        s3Ref.current,
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.14, ease: "power1.inOut" },
        0.64
      );
      tl.fromTo(s3ImgRef.current, { scale: 1.14, xPercent: 4 }, { scale: 1.03, xPercent: 0, duration: 0.14 }, 0.64);

      /* ACT 3 — the person behind the files (0.79 – 0.88) */
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.045, ease: "power1.out" },
        0.795
      );
      tl.to(aboutRef.current, { opacity: 0, y: -22, duration: 0.04, ease: "power1.in" }, 0.875);

      /* FINALE — letterbox pull-back, contact surfaces (0.89 – 1.0) */
      tl.to(stageRef.current, { scale: 0.92, duration: 0.11, ease: "power1.inOut" }, 0.89);
      tl.fromTo(barTopRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.09, ease: "power1.inOut" }, 0.9);
      tl.fromTo(barBotRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.09, ease: "power1.inOut" }, 0.9);
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.055, ease: "power1.out" },
        0.935
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  /* ---------- entrance after the loader ---------- */
  useEffect(() => {
    if (!booted) return;
    const q = gsap.utils.selector(heroRef);
    gsap.fromTo(
      q("[data-rise]"),
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.09, delay: 0.15 }
    );
    gsap.fromTo(
      q("[data-fade]"),
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.08, delay: 0.7 }
    );
  }, [booted]);

  return (
    <div>
      <div ref={wrapRef} className="relative" style={{ height: "640vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-ink">
          {/* letterboxed stage */}
          <div ref={stageRef} className="absolute inset-0 will-cam origin-center">
            {/* SCENE 01 — corridor */}
            <div ref={s1Ref} className="absolute inset-0 overflow-hidden">
              <img
                ref={s1ImgRef}
                src={img01}
                alt=""
                draggable={false}
                className="w-full h-full object-cover will-cam"
              />
            </div>

            {/* SCENE 02 — workbench (iris reveal) */}
            <div ref={s2Ref} className="absolute inset-0 overflow-hidden" style={{ clipPath: "circle(0% at 50% 56%)" }}>
              <img
                ref={s2ImgRef}
                src={img02}
                alt=""
                draggable={false}
                className="w-full h-full object-cover will-cam"
              />
            </div>

            {/* SCENE 03 — window (wipe from the dark) */}
            <div ref={s3Ref} className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0% 0% 0% 100%)" }}>
              <img
                ref={s3ImgRef}
                src={img03}
                alt=""
                draggable={false}
                className="w-full h-full object-cover will-cam"
              />
            </div>

            {/* shared vignette + grade */}
            <div className="absolute inset-0 scene-vignette pointer-events-none" />
          </div>

          {/* letterbox bars */}
          <div ref={barTopRef} className="absolute top-0 left-0 right-0 h-[8vh] bg-black origin-top z-20" style={{ transform: "scaleY(0)" }} />
          <div ref={barBotRef} className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black origin-bottom z-20" style={{ transform: "scaleY(0)" }} />

          {/* HERO */}
          <div ref={heroRef} className="absolute inset-0 z-10 flex flex-col justify-end pb-[10vh] px-5 md:px-10 pointer-events-none">
            <div className="overflow-hidden">
              <p data-fade className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-4">
                Personal archive — Bengaluru, IN
              </p>
            </div>
            <h1 className="font-black-ops uppercase text-bone leading-[0.9] text-[13.5vw] md:text-[9.5vw]">
              <span className="block overflow-hidden"><span data-rise className="block">Niraj Kumar</span></span>
              <span className="block overflow-hidden"><span data-rise className="block">Chennupati<span className="text-blood">.</span></span></span>
            </h1>
            <div className="overflow-hidden mt-5">
              <p data-fade className="max-w-md text-ash text-sm md:text-base leading-relaxed">
                AI/ML engineer. I build systems that listen, remember, verify and hold up
                under pressure — then I file them here.
              </p>
            </div>
            <div className="overflow-hidden mt-6">
              <div data-fade className="flex items-center gap-6 font-archive text-[10px] tracking-[0.3em] text-ash uppercase">
                <span>30+ builds on record</span>
                <span className="w-8 h-px bg-blood inline-block" />
                <span>Est. 2024 — PES University</span>
              </div>
            </div>
          </div>

          {/* scroll hint */}
          <div ref={hintRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
            <span className="font-archive text-[9px] tracking-[0.5em] text-ash uppercase">Scroll to enter</span>
            <span className="w-px h-10 bg-gradient-to-b from-blood to-transparent" />
          </div>

          {/* ACT 1 caption */}
          <div ref={capRef} className="absolute inset-0 z-10 flex items-end justify-start pb-[12vh] px-5 md:px-10 opacity-0 pointer-events-none">
            <div>
              <p className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-3">Environment 01</p>
              <h2 className="font-display uppercase text-bone text-4xl md:text-7xl leading-none">
                The Archive<span className="text-blood">.</span>
              </h2>
              <p className="mt-3 max-w-sm text-ash text-sm leading-relaxed">
                Everything I've built ends up in a room like this. Keep walking.
              </p>
            </div>
          </div>

          {/* ACT 2 — work index */}
          <div ref={workRef} className="absolute inset-0 z-10 flex items-center justify-end px-5 md:px-10 opacity-0">
            <div className="w-full max-w-xl">
              <p className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-2">Environment 02 — The Workbench</p>
              <h2 className="font-display uppercase text-bone text-4xl md:text-6xl leading-none mb-6">
                Selected files<span className="text-blood">.</span>
              </h2>
              <div className="border-t rule-line">
                {featured.map((p) => (
                  <button
                    key={p.id}
                    onClick={(e) => onOpenFile(p.id, e)}
                    className="group w-full flex items-baseline gap-4 py-3 border-b rule-line text-left"
                  >
                    <span className="font-archive text-[10px] text-blood">{p.fileNo}</span>
                    <span className="font-display uppercase text-bone text-lg md:text-2xl group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      {p.name}
                    </span>
                    <span className="ml-auto font-archive text-[9px] tracking-[0.2em] text-ash uppercase hidden sm:block">
                      {p.category}
                    </span>
                    <span className="text-blood opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </button>
                ))}
              </div>
              <button
                onClick={(e) => onNavigate("work", e)}
                className="mt-5 font-archive text-[10px] tracking-[0.35em] text-ash hover:text-bone uppercase transition-colors"
              >
                Open full archive — 32 files ↗
              </button>
            </div>
          </div>

          {/* ACT 3 — about teaser */}
          <div ref={aboutRef} className="absolute inset-0 z-10 flex items-end pb-[12vh] px-5 md:px-10 opacity-0 pointer-events-none">
            <div className="max-w-2xl">
              <p className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-3">Environment 03 — The Window</p>
              <h2 className="font-display uppercase text-bone text-4xl md:text-6xl leading-[0.95]">
                Built at night,<br />filed by morning<span className="text-blood">.</span>
              </h2>
              <p className="mt-4 max-w-md text-ash text-sm md:text-base leading-relaxed">
                Machine learning, systems, security and voice — 30+ projects deep,
                and the desk light is still on.
              </p>
            </div>
          </div>

          {/* FINALE — CTA */}
          <div ref={ctaRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0">
            <p className="font-archive text-[10px] md:text-xs tracking-[0.5em] text-ash uppercase mb-5">End of tour</p>
            <button
              onClick={(e) => onNavigate("contact", e)}
              className="group font-black-ops uppercase text-bone text-[11vw] md:text-[7vw] leading-none hover:text-white transition-colors"
            >
              Let's talk<span className="text-blood group-hover:translate-x-2 inline-block transition-transform duration-300">.</span>
            </button>
            <div className="mt-8 flex gap-8 font-archive text-[10px] tracking-[0.3em] uppercase">
              <button onClick={(e) => onNavigate("work", e)} className="text-ash hover:text-bone transition-colors">Work</button>
              <button onClick={(e) => onNavigate("experience", e)} className="text-ash hover:text-bone transition-colors">Experience</button>
              <button onClick={(e) => onNavigate("about", e)} className="text-ash hover:text-bone transition-colors">About</button>
            </div>
          </div>
        </div>
      </div>

      {/* footer strip after the journey */}
      <footer className="relative bg-black border-t rule-line px-5 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <span className="font-archive text-[10px] tracking-[0.3em] text-ash uppercase">NKC — Personal Archive</span>
        <a href="mailto:chennupatiniraj@gmail.com" className="font-archive text-[10px] tracking-[0.3em] text-ash hover:text-bone uppercase transition-colors">
          chennupatiniraj@gmail.com
        </a>
        <span className="font-archive text-[10px] tracking-[0.3em] text-ash uppercase">Bengaluru, IN — 2026</span>
      </footer>
    </div>
  );
}
