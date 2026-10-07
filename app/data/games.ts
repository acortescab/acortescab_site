import fs from "node:fs";
import path from "node:path";

export type Game = {
  slug: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  /** Paragraphs describing the game itself. */
  about: string[];
  /** What Alejandro did on the project. */
  contribution: string[];
  platforms: string[];
  /** YouTube trailer URL, embedded in the game page header. */
  trailerUrl?: string;
  accent: string;
};

const petoonsContribution = (focus: string) => [
  focus,
  "Worked closely with design, art and production teams as a Unity Software Engineer using C#.",
  "Designed internal and editor tools in Python, C# and Bash to improve development workflows.",
];

export const games: Game[] = [
  {
    slug: "curse-of-the-sea-rats",
    title: "Curse of the Sea Rats",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary:
      "A hand-drawn, animated metroidvania where a crew of cursed rats fights through a pirate-era adventure.",
    about: [
      "Curse of the Sea Rats is a hand-drawn “ratoidvania”: a side-scrolling action-platformer with exploration and boss fights, playable solo or in four-player co-op.",
      "It was funded on Kickstarter and developed by Petoons Studio for PC and consoles.",
    ],
    contribution: [
      "Led the technical development of the game in Unity and C#, from first implementation through production and release.",
      "Coordinated the engineering team, QA, design and production around a demanding hand-drawn animation pipeline and several platform targets.",
      "Designed and implemented the backend API platform for player profiles, rankings and statistics, built with Python and FastAPI and hosted on AWS.",
    ],
    platforms: ["Steam", "PlayStation", "Xbox", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=6H2xQds__nA",
    accent: "from-orange-400/40 to-rose-500/20",
  },
  {
    slug: "hot-wheels-xtreme-overdrive",
    title: "Hot Wheels: Xtreme Overdrive",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary: "A Hot Wheels game for Android and AirConsole, built in Unity.",
    about: [
      "Hot Wheels: Xtreme Overdrive is a Hot Wheels game developed by Petoons Studio with Unity Engine for Android and AirConsole.",
      "AirConsole turns phones into controllers while the game runs on a shared screen, so the game is built around quick, couch-style play.",
    ],
    contribution: [
      "Owned the technical direction of the project in Unity and C#, from early prototyping through to release on Android and AirConsole.",
      "Worked with production to scope the work and keep milestones realistic for a smaller, fast-moving project.",
      "Kept the team aligned on the constraints of both targets, so one codebase could serve a mobile build and a phone-as-controller experience.",
    ],
    platforms: ["Android", "AirConsole"],
    trailerUrl: "https://www.youtube.com/watch?v=ee5uKTAfbCU",
    accent: "from-blue-400/40 to-cyan-500/20",
  },
  {
    slug: "monster-high-skulltimate-secrets",
    title: "Monster High: Skulltimate Secrets",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary:
      "A 3D platformer set at Monster High, with a fully customizable monster student.",
    about: [
      "Monster High: Skulltimate Secrets is a single-player 3D platformer released in October 2024. Players team up with Draculaura, Frankie Stein and Clawdeen Wolf to rid the school of haunted happenings by collecting monster keys around campus.",
      "Players create their own monster from six monster types, with a wide range of hairstyles and outfits. Published by Outright Games.",
      "The game was a co-production between Petoons Studio and a partner studio.",
    ],
    contribution: [
      "Tech Lead on the Petoons Studio side of this co-production, leading Petoons' engineers in Unity and C# across PC and every console target.",
      "Coordinated technical work with the partner studio, keeping the shared architecture, integration points and delivery milestones aligned between both teams.",
      "Planned estimates and milestones with Petoons' production team and flagged technical risks early, so the release date held.",
    ],
    platforms: ["Steam", "Microsoft Store", "PlayStation", "Xbox", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=etbysGnthu8",
    accent: "from-fuchsia-400/40 to-purple-500/20",
  },
  {
    slug: "bratz-flaunt-your-fashion",
    title: "Bratz: Flaunt Your Fashion",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary:
      "The first new Bratz game for consoles and PC in over a decade: a globe-trotting fashion adventure.",
    about: [
      "Bratz: Flaunt Your Fashion launched in November 2022. Players follow Cloe, Sasha, Yasmin and Jade on a world tour to become global fashion influencers and create the ultimate Bratz magazine.",
      "It features full outfit customization and the original Bratz Pack characters. Published by Outright Games.",
    ],
    contribution: [
      "Technical lead for a multiplatform release on PC and consoles, responsible for architecture, delivery planning and day-to-day coordination of the engineers.",
      "Set up the technical approach with production, including effort estimates, dependencies and the milestone plan.",
      "Defined the workflows and standards the team used to ship consistently across platforms.",
    ],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=CJRNoZXzq3Q",
    accent: "from-pink-400/40 to-orange-500/20",
  },
  {
    slug: "dracamar",
    title: "Dracamar",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary:
      "A colorful 3D platformer inspired by late-90s and early-2000s classics, set on Mediterranean islands.",
    about: [
      "Dracamar is a 3D action-adventure platformer set in an archipelago of Mediterranean islands. Players run, jump and fight to rescue the magical Okis from King Crad, an evil dragon who wants to conquer the world.",
      "It has three playable characters (Caliu, Foc and Espurna), 15 regular levels and five bonus levels full of enemies, traps and puzzles.",
    ],
    contribution: [
      "Led the technical development of the game in Unity and C#, from the first playable to the PC and console releases.",
      "Made the key architecture and tooling decisions, and resolved technical risks as they appeared during production.",
      "Coordinated engineering, QA, design and production so that levels, characters and platform builds came together on schedule.",
      "Relied on the studio's Jenkins build pipeline on AWS to keep multiplatform builds and Steam deployment automated.",
    ],
    platforms: ["Steam", "PlayStation", "Xbox", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=37z-ACCA9IU",
    accent: "from-teal-400/40 to-blue-500/20",
  },
  {
    slug: "pj-masks-heroes-of-the-night",
    title: "PJ Masks: Heroes of the Night",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary: "The first console game based on the animated pre-school series.",
    about: [
      "Released in October 2021, PJ Masks: Heroes of the Night is a 3D platforming adventure in which players become the PJ Masks to save the world from night-time baddies such as Romeo, Luna Girl and Night Ninja. Players use Catboy's speed, Owlette's flying and Gekko's muscles across eight locations, from Mystery Mountain to the Moon, with vehicles like the Cat-Car, Gekko-Mobile and Owl-Glider.",
      "Controls are designed so little heroes can join in. Published by Outright Games in partnership with Hasbro.",
    ],
    contribution: [
      "Led the technical side of bringing a TV licence to consoles and PC for the first time, with a young audience and strict licensor expectations.",
      "Decided the project architecture in Unity and C# and kept engineering aligned with production on scope and milestones.",
      "Handled the technical differences between the many platforms it shipped on.",
    ],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Stadia"],
    trailerUrl: "https://www.youtube.com/watch?v=Hpx1e8Ovkus",
    accent: "from-sky-400/40 to-indigo-500/20",
  },
  {
    slug: "pj-masks-power-heroes-mighty-alliance",
    title: "PJ Masks Power Heroes: Mighty Alliance",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary: "A side-scrolling PJ Masks Power Heroes adventure with eight playable heroes.",
    about: [
      "Released in March 2024, PJ Masks Power Heroes: Mighty Alliance is a single-player, side-scrolling adventure set in the colorful world of PJ Masks: Power Heroes. Players complete missions and solve puzzles with each hero's special abilities, avoid obstacles left by the villains, and face the main baddies in boss battles.",
      "It has four locations to explore, eight playable characters with unique abilities, and the Explorider vehicle. Adaptive options such as easier enemy AI, magnetic gems and jump assistance keep it playable for very young players. Published by Outright Games.",
    ],
    contribution: [
      "Technical lead for the second PJ Masks title from the studio, reusing lessons and systems from the first game to move faster.",
      "Planned the technical roadmap with production and kept QA, design and engineering working from the same priorities.",
      "Owned technical decisions and risk management through to release.",
    ],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=JqxbOwEULMY",
    accent: "from-indigo-400/40 to-sky-500/20",
  },
  {
    slug: "my-friend-peppa-pig",
    title: "My Friend Peppa Pig",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary: "Create your own character and join Peppa and her family on an adventure.",
    about: [
      "Released in October 2021, My Friend Peppa Pig lets players create and dress their own character, ring Peppa's doorbell and start a story that is up to them, with Peppa suggesting activities everywhere: helping Daddy Pig find his glasses, following animal tracks in the forest, splashing in muddy puddles, and more.",
      "It includes parental controls with time limits, and Peppa says goodbye when the countdown ends. Published by Outright Games.",
    ],
    contribution: [
      "Led the engineering effort on this licensed pre-school title in Unity, setting the technical direction and architecture.",
      "Coordinated with production on estimates and milestones, and with QA and design on keeping the experience simple and robust for very young players.",
      "Kept the multiplatform build and delivery process running smoothly toward launch.",
    ],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=H_bDj1o4kkA",
    accent: "from-rose-400/40 to-amber-500/20",
  },
  {
    slug: "peppa-pig-world-adventures",
    title: "Peppa Pig: World Adventures",
    role: "Tech Lead",
    period: "2020 — 2026",
    summary: "A Peppa Pig adventure that takes the family around the world.",
    about: [
      "Released in March 2023, Peppa Pig: World Adventures sends players to explore Italy, Germany, Spain, Hollywood and more, completing quests and collecting postcards along the way. They can fly to Australia, explore the ocean in a submarine, ride a yellow taxi through New York City and visit sights such as the Eiffel Tower and Buckingham Palace.",
      "Players can also decorate their own family home in Peppa's neighborhood and turn their own family into Peppa Pig characters who become part of the story. Published by Outright Games in collaboration with Hasbro.",
    ],
    contribution: [
      "Technical lead for the second Peppa Pig title, building on the foundations of the first game.",
      "Owned decision-making on architecture and scope, and kept engineers, designers and QA aligned on delivery goals.",
      "Managed technical dependencies and risks with production throughout development.",
    ],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=RgB87L1GZEk",
    accent: "from-amber-400/40 to-rose-500/20",
  },  {
    slug: "petoons-party",
    title: "Petoons Party",
    role: "Unity Software Engineer",
    period: "2017 — 2020",
    summary:
      "A party game of mini-games for up to four players, and the studio's jump from mobile to PC and console.",
    about: [
      "Petoons Party is a party game with 3 game modes, 4 boards, 4 cups and 28 mini-games, playable alone or with up to four players. Players meet the Petoons, a group of friendly explorers, as Kitra tries to conquer the island of Kimera and steal their magic.",
      "Released on PC, Xbox and PlayStation 4 in December 2018, then on Nintendo Switch.",
    ],
    contribution: petoonsContribution(
      "Contributed to the development and delivery of the game across Steam, PlayStation 4, Xbox One and Nintendo Switch, supporting the studio's transition from mobile to PC and console development.",
    ),
    platforms: ["Steam", "PlayStation 4", "Xbox One", "Nintendo Switch"],
    trailerUrl: "https://www.youtube.com/watch?v=HFd-FdvoFvA",
    accent: "from-emerald-400/40 to-blue-500/20",
  },
  {
    slug: "petoons-world",
    title: "Petoons World",
    role: "Unity Software Engineer",
    period: "2017 — 2020",
    summary: "An iOS mobile game from the Petoons universe.",
    about: ["Petoons World is an iOS mobile game from Petoons Studio."],
    contribution: petoonsContribution(
      "Developed gameplay and technical features for the iOS mobile game.",
    ),
    platforms: ["iOS"],
    trailerUrl: "https://www.youtube.com/watch?v=O4vavt5Mcms",
    accent: "from-cyan-400/40 to-emerald-500/20",
  },
];

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}

/** Extracts the video id from watch, youtu.be, embed and shorts YouTube URLs. */
export function youtubeId(url?: string) {
  if (!url) return null;
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    const host = hostname.replace(/^www\./, "");
    if (host === "youtu.be") return pathname.slice(1).split("/")[0] || null;
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (pathname === "/watch") return searchParams.get("v");
      const match = pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/);
      return match ? match[1] : null;
    }
  } catch {}
  return null;
}

/** Public path of `public/games/<slug>.(jpg|png|webp)` if one has been added. */
export function gameImage(slug: string) {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "games", `${slug}.${ext}`))) {
      return `/games/${slug}.${ext}`;
    }
  }
  return null;
}
