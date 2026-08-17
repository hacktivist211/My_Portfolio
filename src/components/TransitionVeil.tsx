import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export type VeilHandle = {
  cover: (x: number, y: number, label: string) => Promise<void>;
  uncover: () => Promise<void>;
};

/**
 * Full-screen iris veil. A circle grows from the click point (transform-scale,
 * GPU friendly), covers the screen, the page swaps underneath, then the same
 * circle re-centers and shrinks away. Red ring rides the circle's edge.
 */
const TransitionVeil = forwardRef<VeilHandle>(function TransitionVeil(_, ref) {
  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    cover(x, y, label) {
      const root = rootRef.current!;
      const circle = circleRef.current!;
      const ring = ringRef.current!;
      const labelEl = labelRef.current!;
      const diag = Math.hypot(window.innerWidth, window.innerHeight);
      const size = diag * 2.4;

      labelEl.textContent = label;
      circle.style.width = circle.style.height = `${size}px`;
      ring.style.width = ring.style.height = `${size}px`;

      const place = (cx: number, cy: number) => {
        circle.style.left = `${cx - size / 2}px`;
        circle.style.top = `${cy - size / 2}px`;
        ring.style.left = `${cx - size / 2}px`;
        ring.style.top = `${cy - size / 2}px`;
      };
      place(x, y);
      (circle as any)._place = place;

      root.style.display = "block";

      return new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: () => resolve(),
        });
        tl.set([circle, ring], { scale: 0, x: 0, y: 0 })
          .set(labelEl, { opacity: 0, y: 12 })
          .set(scanRef.current, { opacity: 0 })
          .to([circle, ring], { scale: 1, duration: 0.62, ease: "power3.in" })
          .to(labelEl, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, "-=0.18")
          .to(scanRef.current, { opacity: 1, duration: 0.08 }, "<")
          .fromTo(
            scanRef.current,
            { yPercent: -120 },
            { yPercent: 120, duration: 0.3, ease: "power1.inOut" },
            "<"
          );
      });
    },
    uncover() {
      const root = rootRef.current!;
      const circle = circleRef.current!;
      const ring = ringRef.current!;
      const labelEl = labelRef.current!;
      const place = (circle as any)._place as (cx: number, cy: number) => void;

      // re-center the iris toward the optical center before opening
      place(window.innerWidth / 2, window.innerHeight * 0.42);

      return new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: () => {
            root.style.display = "none";
            resolve();
          },
        });
        tl.to(labelEl, { opacity: 0, y: -10, duration: 0.18, ease: "power2.in" })
          .set(scanRef.current, { opacity: 0 })
          .to([circle, ring], { scale: 0, duration: 0.72, ease: "power3.inOut" }, "-=0.05");
      });
    },
  }));

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] hidden"
      style={{ pointerEvents: "all" }}
      aria-hidden
    >
      {/* dark base behind the iris so the swap is invisible */}
      <div className="absolute inset-0 bg-ink" />
      <div
        ref={circleRef}
        className="absolute rounded-full will-cam"
        style={{ background: "#0a0a0c", scale: "0" }}
      />
      <div
        ref={ringRef}
        className="absolute rounded-full will-cam pointer-events-none"
        style={{ border: "1.5px solid rgba(179,18,46,0.55)", scale: "0" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={labelRef}
          className="font-archive text-[11px] md:text-xs tracking-[0.45em] text-ash uppercase opacity-0"
        />
      </div>
      <div
        ref={scanRef}
        className="absolute left-0 right-0 top-1/2 h-px opacity-0"
        style={{ background: "linear-gradient(90deg, transparent, rgba(179,18,46,0.9), transparent)" }}
      />
    </div>
  );
});

export default TransitionVeil;
