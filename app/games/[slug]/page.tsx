import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGame, youtubeId } from "../../data/games";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: PageProps<"/games/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: `${game.title} | Alejandro Cortes Cabrejas`,
    description: game.summary,
  };
}

export default async function GamePage({ params }: PageProps<"/games/[slug]">) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const videoId = youtubeId(game.trailerUrl);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b12] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),transparent_30%),radial-gradient(circle_at_right,_rgba(59,130,246,0.18),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 lg:px-10">
        <Link href="/#portfolio" className="text-sm text-zinc-300 transition hover:text-white">
          ← Back to portfolio
        </Link>

        {videoId ? (
          <div className="mt-6 aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={`${game.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className={`relative mt-6 h-64 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${game.accent} md:h-96`}>
            <Image src={game.image} alt={game.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        )}

        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
          {game.period} • {game.role}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">{game.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">{game.summary}</p>

        {game.platforms.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {game.platforms.map((platform) => (
              <span key={platform} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-200">
                {platform}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.26em] text-orange-300">About the game</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-zinc-300">
              {game.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.26em] text-blue-300">My role</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-zinc-300">
              {game.contribution.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
