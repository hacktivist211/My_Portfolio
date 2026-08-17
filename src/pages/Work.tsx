import { useEffect, useMemo, useState } from "react";
import { projects, repoUrl, totalCount, type Project } from "@/data/projects";
import img01 from "@/assets/img01-corridor.jpg";

function fileParam(): string | null {
  const m = window.location.hash.match(/[?&]f=([\w-]+)/);
  return m ? m[1] : null;
}

function Row({
  p,
  open,
  onToggle,
  index,
}: {
  p: Project;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className="border-b rule-line row-enter"
      style={{ animationDelay: `${Math.min(index, 14) * 45}ms` }}
    >
      <button
        onClick={onToggle}
        className="group relative w-full text-left px-3 md:px-5 py-4 md:py-5 transition-colors duration-300 hover:bg-white/[0.025]"
        aria-expanded={open}
      >
        {/* red bar rides in on hover / open */}
        <span
          className={`absolute left-0 top-0 bottom-0 w-[3px] bg-blood transition-transform duration-300 origin-top ${
            open ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
          }`}
        />
        <div className="grid grid-cols-[52px_1fr_auto] md:grid-cols-[90px_1fr_220px_32px] items-baseline gap-3 md:gap-6">
          <span className="font-archive text-[10px] md:text-xs text-blood tracking-widest">
            FILE&nbsp;{p.fileNo}
          </span>
          <span className="min-w-0">
            <span
              className={`block font-display uppercase truncate text-base md:text-2xl transition-colors duration-300 ${
                open ? "text-white" : "text-bone group-hover:text-white"
              }`}
            >
              {p.name}
              {p.featured && <span className="text-blood"> *</span>}
            </span>
            <span className="block font-archive text-[9px] md:text-[10px] tracking-[0.2em] text-ash uppercase mt-1 truncate">
              {p.codename}
            </span>

            {/* hover blurb — 1-2 lines, only when closed */}
            <span
              className={`block overflow-hidden transition-all duration-500 ${
                open ? "max-h-0 opacity-0" : "max-h-0 opacity-0 group-hover:max-h-14 group-hover:opacity-100"
              }`}
            >
              <span className="block pt-2 text-ash text-xs md:text-sm leading-relaxed max-w-2xl">
                {p.blurb}
              </span>
            </span>
          </span>
          <span className="hidden md:block font-archive text-[10px] tracking-[0.25em] text-ash uppercase text-right">
            {p.category}
          </span>
          <span
            className={`justify-self-end text-blood transition-transform duration-500 ${
              open ? "rotate-45" : "group-hover:rotate-45"
            }`}
          >
            +
          </span>
        </div>
      </button>

      {/* dossier — expands downward on click */}
      <div
        className={`grid transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-3 md:mx-5 mb-6 mt-1 border-l-2 border-blood/70 bg-white/[0.02]">
            <div className="px-5 md:px-8 py-6 grid lg:grid-cols-[1fr_260px] gap-8">
              {/* brief */}
              <div>
                <p className="font-archive text-[9px] tracking-[0.4em] text-blood uppercase mb-4">
                  {p.sealed ? "Restricted brief" : "Field brief"}
                </p>
                <div className="space-y-3">
                  {p.brief.map((line, i) => (
                    <p key={i} className="flex gap-4 text-sm md:text-[15px] leading-relaxed text-bone/85">
                      <span className="font-archive text-[10px] text-ash pt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* meta column */}
              <div className="flex flex-col gap-6">
                {p.stack.length > 0 && (
                  <div>
                    <p className="font-archive text-[9px] tracking-[0.4em] text-ash uppercase mb-3">Inventory</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-archive text-[9px] md:text-[10px] tracking-wider uppercase px-2 py-1 border rule-line text-bone/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-auto">
                  <p className="font-archive text-[9px] tracking-[0.4em] text-ash uppercase mb-3">Repository</p>
                  <a
                    href={repoUrl(p)}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-3 font-archive text-xs tracking-[0.25em] uppercase text-bone hover:text-white border border-blood/60 hover:bg-blood px-4 py-3 transition-colors duration-300"
                  >
                    Open on GitHub
                    <span className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [openId, setOpenId] = useState<string | null>(() => fileParam());

  // deep-link: scroll to the requested file once mounted
  useEffect(() => {
    const f = fileParam();
    if (!f) return;
    const t = setTimeout(() => {
      document.getElementById(`file-${f}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 350);
    return () => clearTimeout(t);
  }, []);

  const grouped = useMemo(() => projects, []);

  return (
    <div className="relative min-h-screen">
      {/* ambient corridor crop — static, cheap */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <img
          src={img01}
          alt=""
          className="w-full h-full object-cover opacity-[0.16]"
          style={{ objectPosition: "78% 50%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      </div>

      <div className="relative z-10 pt-28 md:pt-36 pb-24 px-5 md:px-10 max-w-[1200px] mx-auto">
        {/* header */}
        <header className="mb-12 md:mb-16">
          <p className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-4">
            Classified — Level 5 clearance
          </p>
          <h1 className="font-black-ops uppercase text-bone leading-[0.9] text-[14vw] md:text-[8vw]">
            Project<br />Archive<span className="text-blood">.</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 font-archive text-[10px] md:text-[11px] tracking-[0.3em] text-ash uppercase">
            <span>{totalCount} files on record</span>
            <span className="w-8 h-px bg-blood inline-block" />
            <span>* — featured</span>
            <span className="w-8 h-px bg-blood inline-block" />
            <span>Hover for summary — click for full brief</span>
          </div>
        </header>

        {/* directory */}
        <div className="border-t rule-line">
          {grouped.map((p, i) => (
            <div key={p.id} id={`file-${p.id}`}>
              <Row
                p={p}
                index={i}
                open={openId === p.id}
                onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
              />
            </div>
          ))}
        </div>

        {/* footer note */}
        <p className="mt-10 font-archive text-[10px] tracking-[0.3em] text-ash uppercase">
          Full source history lives at github.com/hacktivist211
        </p>
      </div>

      <style>{`
        .row-enter { opacity: 0; transform: translateY(14px); animation: row-in .7s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes row-in { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
