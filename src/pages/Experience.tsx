import img02 from "@/assets/img02-workspace.jpg";

const ROLES = [
  {
    org: "FarmJaan — UNNAS Digital Tec Pvt Ltd",
    role: "Forward Deployed Engineer — Intern",
    where: "Bengaluru",
    when: "Jun 2026 — Jul 2026",
    points: [
      "Worked directly with the founder on ambiguous product and operational problems — from field insight to deployable solution.",
      "Led customer discovery on the ground: 4 villages, 30+ farmers, 7 vendors — converted into product requirements and platform features.",
      "Designed the core marketplace systems — geo-based routing, matching, scheduling and offline-first architecture — and drove execution with the dev team.",
    ],
    tags: ["Offline-first", "PostgreSQL", "CRDT sync", "Routing & Matching", "Field discovery"],
  },
  {
    org: "Wolfkode",
    role: "Co-Founder & Lead Engineer",
    where: "Remote",
    when: "Mar 2021 — Jul 2021",
    points: [
      "Led the engineering team; built and shipped a developer marketplace — backend, payments, CI/CD — from inception to launch.",
      "Launched a global community platform onboarding open-source contributors.",
    ],
    tags: ["Backend", "Payments", "CI/CD", "Community"],
  },
];

const HONORS = [
  {
    title: "Top 10 Finalist — IIT Kharagpur AI-Volution",
    detail: "500+ teams. Built BureauGPT — enterprise GenAI suite with Indic LLMs, summarization and speech-to-text.",
    when: "Apr 2025",
  },
  {
    title: "Finalist — IIT Hyderabad FinShield, Credit Risk Track",
    detail: "Stacking ensemble on a 2M-record, 115-feature dataset — CatBoost, HistGradientBoosting, XGBoost.",
    when: "Jul 2025",
  },
  {
    title: "Top 35 Finalist — Inferentia Hackathon",
    detail: "24-hour sprint. Built PULSE — CNN-based real-time emotion recognition with a personalized RAG workflow.",
    when: "Mar 2025",
  },
];

export default function Experience() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <img src={img02} alt="" className="w-full h-full object-cover opacity-[0.13]" style={{ objectPosition: "20% 40%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      </div>

      <div className="relative z-10 pt-28 md:pt-36 pb-24 px-5 md:px-10 max-w-[1100px] mx-auto">
        <header className="mb-14 md:mb-20">
          <p className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-4">
            Service record
          </p>
          <h1 className="font-black-ops uppercase text-bone leading-[0.9] text-[14vw] md:text-[8vw]">
            Experience<span className="text-blood">.</span>
          </h1>
        </header>

        <div className="space-y-0 border-t rule-line">
          {ROLES.map((r) => (
            <article key={r.org} className="group border-b rule-line py-8 md:py-10 grid md:grid-cols-[280px_1fr] gap-6 md:gap-12">
              <div>
                <p className="font-archive text-[10px] tracking-[0.3em] text-blood uppercase">{r.when}</p>
                <p className="font-archive text-[10px] tracking-[0.3em] text-ash uppercase mt-1">{r.where}</p>
              </div>
              <div>
                <h2 className="font-display uppercase text-bone text-2xl md:text-4xl leading-tight group-hover:text-white transition-colors">
                  {r.role}
                </h2>
                <p className="font-archive text-[11px] tracking-[0.2em] text-ash uppercase mt-2">{r.org}</p>
                <ul className="mt-5 space-y-3 max-w-2xl">
                  {r.points.map((pt, i) => (
                    <li key={i} className="flex gap-4 text-sm md:text-[15px] leading-relaxed text-bone/80">
                      <span className="text-blood font-archive text-[10px] pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="font-archive text-[9px] tracking-wider uppercase px-2 py-1 border rule-line text-ash">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* honors */}
        <section className="mt-16 md:mt-24">
          <p className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-6">
            Commendations
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
            {HONORS.map((h) => (
              <div key={h.title} className="bg-ink p-6 md:p-7 hover:bg-ink-2 transition-colors duration-300">
                <p className="font-archive text-[9px] tracking-[0.3em] text-ash uppercase">{h.when}</p>
                <h3 className="font-display uppercase text-bone text-lg md:text-xl leading-snug mt-3">{h.title}</h3>
                <p className="text-ash text-sm leading-relaxed mt-3">{h.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
