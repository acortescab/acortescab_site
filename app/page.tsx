const metrics = [
  { value: "9+", label: "Years building products" },
  { value: "5+", label: "Years technical leadership" },
  { value: "AWS", label: "Cloud and CI/CD expertise" },
  { value: "Unity", label: "Cross-platform game delivery" },
];

const strengths = [
  "Technical leadership",
  "Backend architecture",
  "Game tech strategy",
  "AWS & CI/CD",
  "Cross-functional delivery",
  "FastAPI & Python",
  "C# & Unity",
  "Product + engineering alignment",
];

const timeline = [
  {
    period: "2020 — 2026",
    title: "Tech Lead",
    company: "Petoons Studio",
    description:
      "Led technical planning and delivery across multiple game projects, aligning engineering, QA, design, production, and stakeholders around product goals and platform constraints.",
  },
  {
    period: "2017 — 2020",
    title: "Software Engineer — Unity",
    company: "Petoons Studio",
    description:
      "Built commercial mobile and PC/console gameplay features with Unity and C#, while creating internal tools to streamline workflows and improve production throughput.",
  },
  {
    period: "2016 — 2017",
    title: "Junior Project Manager",
    company: "Grupo Oesía",
    description:
      "Supported large technology migration programs, coordinating teams, risks, dependencies, and stakeholder communication across cloud and data platform workstreams.",
  },
  {
    period: "2014 — 2016",
    title: "Junior Software Engineer",
    company: "Grupo Oesía",
    description:
      "Delivered backend and full-stack features for enterprise applications, including OpenCMS, Spring Boot portals, Laravel, Angular, PostgreSQL, and RabbitMQ integrations.",
  },
];

const initiatives = [
  {
    title: "Backend production services",
    description:
      "Designed and implemented a player-profile and statistics platform with Python and FastAPI on AWS to support live game experiences.",
  },
  {
    title: "GitOps build infrastructure",
    description:
      "Built a Jenkins-powered multi-platform game build pipeline on AWS to automate deployment and improve release reliability across Steam and other storefronts.",
  },
  {
    title: "Asset pipeline platform",
    description:
      "Created a centralized storage and registration workflow for art and production assets to reduce manual friction and speed up iteration cycles.",
  },
];

const portfolioHighlights = [
  {
    title: "Platform systems",
    text: "Scalable APIs, cloud architecture, and internal tools that unlock product velocity.",
  },
  {
    title: "Game delivery",
    text: "Cross-platform launches built with technical discipline, stakeholder alignment, and execution clarity.",
  },
  {
    title: "Technical leadership",
    text: "Decision-making that balances roadmap reality, engineering standards, and delivery objectives.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070b12] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),transparent_30%),radial-gradient(circle_at_right,_rgba(59,130,246,0.18),transparent_26%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3 text-sm font-medium tracking-[0.22em] text-zinc-200 uppercase">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base font-semibold text-orange-300">
            AC
          </span>
          Alejandro Cortes
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#journey" className="transition hover:text-white">Journey</a>
          <a href="#portfolio" className="transition hover:text-white">Portfolio</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </nav>

        <a
          href="/Profile.pdf"
          className="rounded-full border border-orange-400/50 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-200 transition hover:border-orange-300 hover:bg-orange-500/20"
        >
          View profile
        </a>
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-10 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[0.22em] text-zinc-300 uppercase backdrop-blur-sm">
              Barcelona • Tech Lead • Software Engineer
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Building product momentum with technical clarity.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              I’m Alejandro Cortes Cabrejas — a technical leader and software engineer who turns complex product challenges into shipping systems, scalable platforms, and high-performing teams.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/in/acortescabrejas"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-zinc-200"
              >
                LinkedIn
              </a>
              <a
                href="#journey"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/30 hover:bg-white/10"
              >
                Explore my journey
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-orange-500/35 via-transparent to-blue-500/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
                <span>Profile</span>
                <span>Available</span>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1320] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Role</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Tech Lead</h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                    Leading
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-4 text-sm text-zinc-300">
                  <div className="flex items-center justify-between gap-4">
                    <span>Location</span>
                    <span className="font-medium text-zinc-100">Barcelona</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Focus</span>
                    <span className="font-medium text-zinc-100">Product + platform</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Stack</span>
                    <span className="font-medium text-zinc-100">AWS • Python • Unity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-white">{metric.value}</div>
              <p className="mt-2 text-sm text-zinc-300">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-orange-300">
          <span className="h-px w-10 bg-orange-400/60" />
          About me
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-7">
            <p className="text-lg leading-8 text-zinc-200">
              I bring a rare blend of hands-on software engineering and leadership: I’ve delivered product work across game development, backend systems, cloud infrastructure, and cross-functional project execution. The common thread is simple: turning complex requirements into coherent technical systems that teams can build and ship with confidence.
            </p>
          </div>

          <div className="space-y-5 text-zinc-300">
            <p className="text-base leading-8">
              My experience spans from building gameplay features in Unity and C# to designing production-grade services in Python and FastAPI, managing AWS infrastructure, and orchestrating projects across design, production, QA, and engineering stakeholders.
            </p>
            <p className="text-base leading-8">
              I’m especially effective at bridging technical strategy with business needs — translating product objectives into architecture, planning, and execution without losing velocity or quality.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {strengths.map((strength) => (
                <span key={strength} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-200">
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="journey" className="relative z-10 mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
        <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-blue-300">
          <span className="h-px w-10 bg-blue-400/60" />
          Career journey
        </div>

        <div className="relative grid gap-6">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/70 via-blue-500/50 to-transparent md:left-7" />
          {timeline.map((item) => (
            <article key={item.period} className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 md:ml-12 md:p-7">
              <div className="absolute left-[-2.3rem] top-7 hidden h-4 w-4 rounded-full border-4 border-[#070b12] bg-gradient-to-br from-orange-400 to-blue-500 md:block" />
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">{item.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-zinc-200">
                  {item.company}
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-emerald-300">
          <span className="h-px w-10 bg-emerald-400/60" />
          Portfolio
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {portfolioHighlights.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400/30 to-blue-500/30" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-dashed border-white/15 bg-gradient-to-br from-white/[0.04] to-transparent p-7 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-zinc-400">Future work</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">Portfolio cases coming soon.</h3>
            </div>
            <a
              href="https://www.linkedin.com/in/acortescabrejas"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-orange-500/12 via-white/[0.03] to-blue-500/12 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-400">Let’s build</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">Open to leadership, architecture, and product-minded engineering roles.</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:acortescab@gmail.com" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-zinc-200">
                Email me
              </a>
              <a href="tel:+34687644620" className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/30 hover:bg-white/[0.08]">
                +34 687 644 620
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-6 text-center text-sm text-zinc-500 lg:px-10">
        Alejandro Cortes Cabrejas • Tech Lead | Software Engineer
      </footer>
    </main>
  );
}
