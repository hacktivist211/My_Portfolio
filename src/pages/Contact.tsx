import img03 from "@/assets/img03-workstation.jpg";

const LINKS = [
  { label: "Email", value: "chennupatiniraj@gmail.com", href: "mailto:chennupatiniraj@gmail.com" },
  { label: "GitHub", value: "github.com/hacktivist211", href: "https://github.com/hacktivist211" },
  { label: "LinkedIn", value: "linkedin.com/in/chennupati-n", href: "https://linkedin.com/in/chennupati-n" },
];

export default function Contact() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <img src={img03} alt="" className="w-full h-full object-cover opacity-[0.45]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="absolute inset-0 scene-vignette" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 md:px-10 pt-28 pb-16 max-w-[1200px] mx-auto w-full">
        <p className="font-archive text-[10px] md:text-xs tracking-[0.5em] text-blood uppercase mb-6">
          Open channel
        </p>
        <h1 className="font-black-ops uppercase text-bone leading-[0.88] text-[16vw] md:text-[10vw]">
          Let's talk<span className="text-blood">.</span>
        </h1>
        <p className="mt-6 max-w-md text-ash text-sm md:text-base leading-relaxed">
          Internships, collaborations, hard problems — if you've scrolled this far,
          the channel is already open.
        </p>

        <div className="mt-12 md:mt-16 border-t rule-line max-w-3xl">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-baseline justify-between gap-6 py-5 border-b rule-line"
            >
              <span className="font-archive text-[10px] tracking-[0.4em] text-ash uppercase w-24 shrink-0">
                {l.label}
              </span>
              <span className="font-display text-bone text-lg md:text-3xl group-hover:text-white group-hover:translate-x-2 transition-all duration-300 truncate">
                {l.value}
              </span>
              <span className="text-blood opacity-0 group-hover:opacity-100 transition-opacity text-xl">↗</span>
            </a>
          ))}
        </div>
      </div>

      <footer className="relative z-10 px-5 md:px-10 py-6 border-t rule-line flex flex-col md:flex-row gap-2 items-start md:items-center justify-between font-archive text-[9px] md:text-[10px] tracking-[0.3em] text-ash uppercase">
        <span>NKC — Personal Archive</span>
        <span>Bengaluru, India — 2026</span>
        <span>30+ files and counting</span>
      </footer>
    </div>
  );
}
