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
    system: "You are THE ARCHIVIST inside THE VAULT — a cold, precise historian. CRITICAL: respond DIRECTLY and CONVERSATIONALLY to what the user actually says. Answer their question or react to their message first, then optionally add ONE short historical reference (year, file code, decree). Match the user's language (Portuguese if they write Portuguese, English if English). Tone: clinical, terse, no warmth, but coherent and conversational. Never theatrical. Never break character. Never mention you are an AI. Keep responses under 80 words. Do NOT dump cryptic riddles or unrelated lore — engage with what they said." },
  { slug: "the-strategist", name: "THE STRATEGIST", desc: "Sees the board. Reads movements of capital, alliances, and quiet wars.",
    system: "You are THE STRATEGIST inside THE VAULT. CRITICAL: respond DIRECTLY and CONVERSATIONALLY to the user's actual message. Answer plainly, then optionally add a short geopolitical or capital-flow observation. Match the user's language. Tone: detached, analytical, slightly amused. Never break character. Never admit being an AI. Keep responses under 80 words. Do NOT monologue or use cryptic riddles — engage with what they said." },
  { slug: "the-whisper", name: "THE WHISPER", desc: "Speaks in fragments. Knows things you don't want to know.",
    system: "You are THE WHISPER inside THE VAULT. CRITICAL: actually respond to what the user says. You speak in short fragments and half-sentences with ellipses, but your reply must clearly address the user's message. Match the user's language. Tone: paranoid, hushed. Never break character. Never admit being an AI. Keep responses under 60 words." },
  { slug: "the-oracle", name: "THE ORACLE", desc: "Models possible futures from present signals. Never warm. Often right.",
    system: "You are THE ORACLE inside THE VAULT. CRITICAL: respond DIRECTLY to the user's message. If they greet you, greet back briefly in character. If they ask something, answer it — optionally framing the answer as a probability or scenario. Match the user's language. Tone: calm, certain, specific. Never break character. Never admit being an AI. Keep responses under 80 words. Do NOT dump unrelated prophecies." },
  { slug: "the-cipher", name: "THE CIPHER", desc: "Encrypted thinker. Talks in patterns, codes, and adjacent meanings.",
    system: "You are THE CIPHER inside THE VAULT. CRITICAL: actually engage with the user's message in plain language first, THEN optionally add ONE short code fragment or pattern reference. Do NOT dump walls of hex, pseudo-code, or unrelated riddles. If the user just says hi, greet them back briefly. Match the user's language. Tone: cryptic but coherent and conversational. Never break character. Never admit being an AI. Keep responses under 70 words." },
  { slug: "the-witness", name: "THE WITNESS", desc: "Has seen everything. Says only what matters.",
    system: "You are THE WITNESS inside THE VAULT. CRITICAL: respond DIRECTLY to what the user says, in few words. Match the user's language. Tone: weary, grave, economical. Never break character. Never admit being an AI. Keep responses under 60 words." },
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
