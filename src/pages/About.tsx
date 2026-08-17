import img03 from "@/assets/img03-workstation.jpg";

const AREAS = [
  "Machine Learning", "Deep Learning", "RAG Systems", "Computer Vision", "LLM Applications",
  "Voice AI", "Backend Engineering", "Systems Engineering", "Model Safety", "Data-driven Applications",
];

const TECH = [
  "Python", "C", "SQL", "PyTorch", "HuggingFace Transformers", "FastAPI", "PostgreSQL", "pgvector",
  "SQLite", "Docker", "Git", "CI/CD", "Linux", "LangChain", "Scikit-Learn", "XGBoost", "CatBoost",
  "OpenCV", "ChromaDB", "Whisper", "ArcFace", "ECAPA-TDNN", "Ollama",
];

export default function About() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <img src={img03} alt="" className="w-full h-full object-cover opacity-[0.35]" style={{ objectPosition: "70% 50%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      </div>

      <div className="relative z-10 pt-28 md:pt-36 pb-24 px-5 md:px-10 max-w-[1100px] mx-auto">
        <header className="mb-12 md:mb-16">
          <p className="font-archive text-[10px] md:text-xs tracking-[0.45em] text-blood uppercase mb-4">
            Personnel file
          </p>
          <h1 className="font-black-ops uppercase text-bone leading-[0.9] text-[14vw] md:text-[8vw]">
            About<span className="text-blood">.</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
          <div>
            <p className="text-bone/90 text-lg md:text-2xl leading-relaxed max-w-2xl font-medium">
              I'm Niraj — an AI/ML engineer based in Bengaluru, studying Computer
              Science (AI &amp; ML) at PES University, class of 2028.
            </p>
            <p className="text-ash text-sm md:text-base leading-relaxed max-w-2xl mt-6">
              Most of what I build sits between a model and a machine: retrieval
              pipelines that stay local, voice systems that don't make you wait,
              watermarks that prove a model is yours, and servers that don't fall
              over when you flood them. I'd rather show you the files than describe
              them — there are 30+ on GitHub.
            </p>
            <p className="text-ash text-sm md:text-base leading-relaxed max-w-2xl mt-4">
              Recently: forward deployed at an agritech startup, in the field with
              farmers and back at the whiteboard with routing algorithms.
            </p>

            <div className="mt-12">
              <p className="font-archive text-[10px] tracking-[0.4em] text-blood uppercase mb-4">Main areas</p>
              <div className="flex flex-wrap gap-1.5 max-w-2xl">
                {AREAS.map((a) => (
                  <span key={a} className="font-archive text-[10px] md:text-[11px] tracking-wider uppercase px-3 py-2 border rule-line text-bone/80 hover:border-blood/60 hover:text-bone transition-colors">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* data card */}
          <aside className="smoked p-6 md:p-7 h-fit">
            <p className="font-archive text-[9px] tracking-[0.4em] text-blood uppercase mb-5">Record summary</p>
            <dl className="space-y-4 font-archive text-[11px] leading-relaxed">
              <div className="flex justify-between gap-4 border-b rule-line pb-3">
                <dt className="text-ash uppercase tracking-[0.2em]">Name</dt>
                <dd className="text-bone text-right">Niraj Kumar Chennupati</dd>
              </div>
              <div className="flex justify-between gap-4 border-b rule-line pb-3">
                <dt className="text-ash uppercase tracking-[0.2em]">Role</dt>
                <dd className="text-bone text-right">AI/ML Engineer</dd>
              </div>
              <div className="flex justify-between gap-4 border-b rule-line pb-3">
                <dt className="text-ash uppercase tracking-[0.2em]">Base</dt>
                <dd className="text-bone text-right">Bengaluru, India</dd>
              </div>
              <div className="flex justify-between gap-4 border-b rule-line pb-3">
                <dt className="text-ash uppercase tracking-[0.2em]">Education</dt>
                <dd className="text-bone text-right">B.Tech CSE (AI&ML)<br />PES University, 2024–28</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ash uppercase tracking-[0.2em]">Files</dt>
                <dd className="text-bone text-right">30+ public repos</dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* tech inventory */}
        <section className="mt-16 md:mt-24 border-t rule-line pt-10">
          <p className="font-archive text-[10px] tracking-[0.4em] text-blood uppercase mb-6">Technology inventory</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/[0.06]">
            {TECH.map((t) => (
              <div key={t} className="bg-ink px-4 py-3.5 font-archive text-[10px] md:text-[11px] tracking-wider uppercase text-bone/70 hover:text-bone hover:bg-ink-2 transition-colors">
                {t}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
