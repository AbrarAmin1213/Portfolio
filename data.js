/* =========================================================================
   PORTFOLIO MEDIA
   -------------------------------------------------------------------------
   Each item is one video or image from the Google Drive portfolio folder.
   Fields:
     type  : "video" | "image"
     id    : the Google Drive FILE id (from the share link .../d/<ID>/...)
     title : shown on the card
     desc  : short caption (optional)
     tags  : array of strings, also used for the filter bar (optional)

   NOTE: every Drive file must be shared as "Anyone with the link" or it
   will show as private to visitors. This array is auto-populated once the
   Drive folder is connected; placeholder examples are commented out below.
   ========================================================================= */
const PORTFOLIO_MEDIA = [
  // {
  //   type: "video",
  //   id: "DRIVE_FILE_ID_HERE",
  //   title: "AR City Explorer",
  //   desc: "Geo-located AR built on Mapbox + ARFoundation",
  //   tags: ["AR", "Mobile"]
  // },
  // {
  //   type: "image",
  //   id: "DRIVE_FILE_ID_HERE",
  //   title: "Metaverse Lobby",
  //   desc: "Multiplayer social space",
  //   tags: ["VR", "Multiplayer"]
  // },
];

/* ===== Experience ===== */
const EXPERIENCE = [
  {
    date: "Jan 2023 — Present",
    role: "Lead Unity Developer",
    company: "Lemon Studios · Lahore, Pakistan",
    desc: "Direct the full lifecycle of AR/VR and multiplayer products — architecture, sprint planning and delivery. Lead a cross-functional team, set code-review standards, and build reusable systems that cut development time."
  },
  {
    date: "Jan 2022 — Dec 2022",
    role: "Senior Unity Developer (Remote)",
    company: "Agora VR World · United States",
    desc: "Built an immersive social/metaverse environment with interactive, gamified spaces. Optimized networking and large-scene performance while shipping stable builds."
  },
  {
    date: "Nov 2020 — Dec 2021",
    role: "Senior Unity Developer (Remote)",
    company: "Ready Freddy · United Kingdom",
    desc: "Architected an extensive geo-location AR game integrating Mapbox, ARFoundation and custom SDKs — map systems, AR interactions, backend and UI. Mentored junior developers."
  },
  {
    date: "Nov 2018 — Oct 2020",
    role: "Unity Developer",
    company: "NARSUN Studio · Lahore, Pakistan",
    desc: "Engineered 2D, 3D, multiplayer and AR/VR experiences for global clients in a fast-paced service model — gameplay systems, UI and third-party SDK integration."
  },
  {
    date: "Jan 2017 — Nov 2018",
    role: "Junior Unity Developer",
    company: "Xaavia Studio · Lahore, Pakistan",
    desc: "Created mobile games using third-party SDKs, reskin kits and custom gameplay logic; assisted in programming, debugging and performance work."
  },
];

/* ===== Skills ===== */
const SKILLS = [
  {
    icon: "🎮",
    title: "Engine & Languages",
    items: ["Unity 3D / 2D", "C#", "Scene Management", "Optimization", "Architecture Planning"]
  },
  {
    icon: "🥽",
    title: "AR / VR",
    items: ["AR Foundation", "ARKit", "ARCore", "Vuforia", "Niantic Lightship"]
  },
  {
    icon: "🌐",
    title: "Multiplayer & Backend",
    items: ["Photon", "Sockets", "Firebase", "REST APIs", "Realtime DB"]
  },
  {
    icon: "🗺️",
    title: "Maps & SDKs",
    items: ["Mapbox", "Online Maps", "Google Maps API", "3rd-party SDKs"]
  },
  {
    icon: "🧭",
    title: "Workflow",
    items: ["Git", "Agile / Scrum", "Code Review", "CI Pipelines"]
  },
  {
    icon: "🤝",
    title: "Leadership",
    items: ["Technical Leadership", "Mentorship", "Cross-team Collaboration", "Problem Solving"]
  },
];

/* ===== Projects (from past portfolio) =====
   Visual media for these comes from the Drive gallery above; this section
   lists the catalogue of shipped work by category. */
const PROJECTS = [
  {
    icon: "🕹️",
    title: "2D / 3D Games",
    items: ["Tee n Moo Bath Time", "Tetris Battle", "Bike Racing", "Cube Combo", "Epic War Simulator", "Potato Peel", "Flappy 3D", "Blocky Sniper"]
  },
  {
    icon: "🪄",
    title: "AR Experiences",
    items: ["AR Drawing", "WebAR Face Filter", "Target WebAR", "Web AR World Space", "Web AR Image Scan", "Web AR Cap Try-On", "Vuforia Image Scan"]
  },
  {
    icon: "🥽",
    title: "VR Worlds",
    items: ["VR Forging", "VR Meta Mall", "VR Medical Room"]
  },
  {
    icon: "📍",
    title: "Location-Based",
    items: ["Walk Off", "Ready Freddy"]
  },
];

/* ===== Testimonials (from past clients) ===== */
const TESTIMONIALS = [
  {
    quote: "Abrar is great. Extremely professional and quick to respond. He is always willing to make edits to ensure we are pleased with the work he does.",
    name: "Victoria Musselwhite",
    role: "Client"
  },
  {
    quote: "He has great ideas of his own as well and is very innovative and creative — a great fit for fast-moving teams.",
    name: "Ethan Berg",
    role: "CEO, Agora World VR"
  },
  {
    quote: "I highly recommend him for any project involving Unity, location-based, and Mapbox.",
    name: "Neil Wahab",
    role: "Entrepreneur"
  },
  {
    quote: "He was quick to respond and executed the task perfectly! I'm so impressed by his skills.",
    name: "Jarad Asselin",
    role: "Client"
  },
];

/* ===== Social links ===== */
const SOCIALS = [
  { icon: "🟢", label: "Upwork", url: "https://www.upwork.com/freelancers/~013c3e309072027fac" },
  { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/abrar-amin-8a78b8b3/" },
  { icon: "📘", label: "Facebook", url: "https://facebook.com/abrar.amin.5" },
  { icon: "📷", label: "Instagram", url: "https://instagram.com/abraramin_mughal" },
];

/* ===== Hero role rotator ===== */
const ROLES = [
  "Lead Unity Developer",
  "AR / VR Engineer",
  "Multiplayer Specialist",
  "Immersive 3D Builder",
];
