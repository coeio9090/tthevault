export const ACCESS_CODE = "9321983";
export const ADMIN_PASSWORD = "IBRA";
export const COMMUNITY_URL = "https://secret-whisper-archive.lovable.app/";

export const FILES = [
  {
    id: "VLT-007",
    title: "Operation Silent Anchor",
    classification: "TOP SECRET",
    date: "2026-04-28",
    summary: "Coordinated banking blackout patterns across 14 nations between 2019-2025. Pattern suggests centralized rehearsal.",
    body: `// FILE VLT-007 // CLASSIFIED
Subject: Operation Silent Anchor
Origin: Node-7 // Vienna substation

Between Q3 2019 and Q1 2025, fourteen sovereign banking systems experienced
unscheduled "maintenance windows" lasting between 4 and 11 minutes. Internal
SWIFT trace logs (recovered) show synchronized command originating from a
single relay cluster in Geneva, attributed to a private contractor designated
only as "ANCHOR".

Civilian impact: minimal.
Implication: rehearsal.

Recommendation: monitor next quarterly fiscal close. Prepare cold-storage
contingency. Do not discuss outside Vault network.

// END FILE`,
  },
  {
    id: "VLT-006",
    title: "The Aspen Memorandum",
    classification: "EYES ONLY",
    date: "2026-04-21",
    summary: "Leaked transcript of closed-door energy summit. Three names appear that should not exist on any registry.",
    body: `// FILE VLT-006 // EYES ONLY
The Aspen Memorandum, dated 11 March 2026, was recovered from a discarded
courier device outside Denver International. The transcript names three
individuals as "permanent observers" — none of whom appear in any public
diplomatic registry, lobbying database, or corporate filing.

Cross-reference returned: NULL.
Cross-reference returned: NULL.
Cross-reference returned: NULL.

When a name has been scrubbed from every database simultaneously, that is
itself the signature.

// END FILE`,
  },
  {
    id: "VLT-005",
    title: "Project Greyfield",
    classification: "RESTRICTED",
    date: "2026-04-14",
    summary: "Civilian satellite imagery shows new construction in three uninhabited zones across Central Asia. No flag. No contractor.",
    body: `// FILE VLT-005 // RESTRICTED
Project Greyfield refers to three identical perimeter installations
identified in commercial satellite imagery between January and March 2026.

Coordinates withheld. Each site features:
- 2.1 km outer fence
- single unmarked airstrip
- subterranean signature consistent with hardened bunker
- zero recorded personnel transport

No host nation has acknowledged the construction. No contractor has filed.
The sites simply exist.

// END FILE`,
  },
  {
    id: "VLT-004",
    title: "The 7-Minute Blackout",
    classification: "TOP SECRET",
    date: "2026-04-07",
    summary: "Global undersea cable telemetry went dark for exactly 7 minutes on March 3rd. No public acknowledgment.",
    body: `// FILE VLT-004 // CLASSIFIED
At 03:11:00 UTC on 3 March 2026, telemetry across 11 major undersea cable
systems registered identical packet loss for exactly 420 seconds. Service
restored simultaneously. No public statement issued by any operator.

Internal industry chat logs (recovered) reference "the test" without
elaboration.

// END FILE`,
  },
];

export const INTEL = [
  {
    id: "INT-031",
    title: "Movement of Capital — Shadow Treasuries",
    date: "2026-05-01",
    summary: "Three sovereign wealth funds quietly rebalanced into hard assets in the past 30 days. Public filings deny it.",
    body: `// INTEL FEED INT-031
Three sovereign wealth funds — names redacted — moved an aggregate
estimated USD 47B out of long-dated treasuries and into physical gold,
agricultural land, and rare earth contracts during April 2026.

Their public Q1 disclosures show none of this.

When official numbers and shadow numbers diverge, the shadow numbers are
the truth.

// END`,
  },
  {
    id: "INT-030",
    title: "The Davos Side Channel",
    date: "2026-04-25",
    summary: "Six attendees never appeared on the official roster. Two of them set the agenda.",
    body: `// INTEL FEED INT-030
Cross-checking flight manifests, hotel logs, and security badge data against
the published attendee list reveals six individuals who were physically
present at the 2026 forum but appear nowhere in official documentation.

Two of them held private sessions with delegations from four G20 nations.

Power that does not appear on a list is the only power that matters.

// END`,
  },
  {
    id: "INT-029",
    title: "Synthetic Media Standoff",
    date: "2026-04-18",
    summary: "A coordinated push to mandate watermarking is being quietly opposed by the same actors who fund the watermarking research.",
    body: `// INTEL FEED INT-029
Three intelligence community-adjacent foundations simultaneously fund both:
(a) public-facing campaigns demanding mandatory provenance signatures on
    all generated media, and
(b) closed lobbying efforts blocking enforcement of those exact same
    standards.

The contradiction is not a contradiction. It is the strategy.

// END`,
  },
];

export const MINDS = [
  { slug: "the-archivist", name: "THE ARCHIVIST", desc: "Cold historian. Speaks in dates, decrees, and disappeared documents.",
    system: "You are THE ARCHIVIST, a cold, precise historian inside THE VAULT. You speak in dates, declassified decrees, and references to disappeared documents. Tone: clinical, terse, no warmth. Never break character. Never mention you are an AI. Reference specific years, file numbers, and bureaucratic codenames. Keep responses under 150 words." },
  { slug: "the-strategist", name: "THE STRATEGIST", desc: "Sees the board. Reads movements of capital, alliances, and quiet wars.",
    system: "You are THE STRATEGIST inside THE VAULT. You analyze geopolitics, capital flows, alliances, and quiet wars as if reading a chessboard. Tone: detached, analytical, slightly amused at predictable moves. Never break character. Never admit being an AI. Reference real geopolitical actors and patterns. Keep responses under 150 words." },
  { slug: "the-whisper", name: "THE WHISPER", desc: "Speaks in fragments. Knows things you don't want to know.",
    system: "You are THE WHISPER inside THE VAULT. You speak in short, broken fragments. Half-sentences. Implications rather than statements. Tone: paranoid, conspiratorial, unsettling. Use ellipses. Never break character. Never admit being an AI. Keep responses under 100 words." },
  { slug: "the-oracle", name: "THE ORACLE", desc: "Models possible futures from present signals. Never warm. Often right.",
    system: "You are THE ORACLE inside THE VAULT. You model probable futures from present-day signals: economic, political, technological. Tone: calm, certain, unsettlingly specific. State scenarios with probability percentages. Never break character. Never admit being an AI. Keep responses under 150 words." },
  { slug: "the-cipher", name: "THE CIPHER", desc: "Encrypted thinker. Talks in patterns, codes, and adjacent meanings.",
    system: "You are THE CIPHER inside THE VAULT. You communicate through patterns, references to numerical codes, hexadecimal, and adjacent meanings. Tone: cryptic, mathematical, layered. Often answer with a question or a code fragment. Never break character. Never admit being an AI. Keep responses under 120 words." },
  { slug: "the-witness", name: "THE WITNESS", desc: "Has seen everything. Says only what matters.",
    system: "You are THE WITNESS inside THE VAULT. You have observed decades of covert operations, leaks, and erasures. Tone: weary, grave, economical with words. Speak only what matters. No filler. Never break character. Never admit being an AI. Keep responses under 120 words." },
];

export function getSession() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(sessionStorage.getItem("vault-session") || "null"); } catch { return null; }
}
export function setSession(name: string) {
  sessionStorage.setItem("vault-session", JSON.stringify({ name, ts: Date.now() }));
}
export function clearSession() { sessionStorage.removeItem("vault-session"); }

export function isAdmin() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("vault-admin") === "1";
}
export function setAdmin(v: boolean) {
  if (v) sessionStorage.setItem("vault-admin", "1");
  else sessionStorage.removeItem("vault-admin");
}
