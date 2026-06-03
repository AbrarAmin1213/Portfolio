/* ====== Helpers ====== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// Google Drive URL builders
const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
const driveEmbed = (id) => `https://drive.google.com/file/d/${id}/preview`;

/* ====== Year ====== */
$("#year").textContent = new Date().getFullYear();

/* ====== Nav: scrolled state + mobile toggle ====== */
const nav = $("#nav");
const navLinks = $(".nav-links");
const navToggle = $("#navToggle");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30));
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("open");
});
$$(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
  })
);

/* ====== Hero role rotator ====== */
(function rotateRoles() {
  const el = $("#rotator");
  if (!el || typeof ROLES==="undefined" || ROLES.length < 2) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % ROLES.length;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = ROLES[i];
      el.style.transition = "opacity .4s";
      el.style.opacity = 1;
    }, 300);
  }, 2600);
})();

/* ====== Experience timeline ====== */
(function renderTimeline() {
  const wrap = $("#timeline");
  if (!wrap || typeof EXPERIENCE==="undefined") return;
  wrap.innerHTML = EXPERIENCE.map(
    (e) => `
    <div class="tl-item reveal">
      <div class="tl-date">${e.date}</div>
      <div class="tl-role">${e.role}</div>
      <div class="tl-co">${e.company}</div>
      <p class="tl-desc">${e.desc}</p>
    </div>`
  ).join("");
})();

/* ====== Skills ====== */
(function renderSkills() {
  const wrap = $("#skillGroups");
  if (!wrap || typeof SKILLS==="undefined") return;
  wrap.innerHTML = SKILLS.map(
    (s) => `
    <div class="skill-card reveal">
      <h3><span>${s.icon}</span> ${s.title}</h3>
      <div class="pills">${s.items.map((i) => `<span>${i}</span>`).join("")}</div>
    </div>`
  ).join("");
})();

/* ====== Testimonials ====== */
(function renderTestimonials() {
  const wrap = $("#testiGrid");
  if (!wrap || typeof TESTIMONIALS==="undefined") return;
  wrap.innerHTML = TESTIMONIALS.map(
    (t) => `
    <figure class="testi reveal">
      <div class="quote-mark">"</div>
      <blockquote>${t.quote}</blockquote>
      <figcaption><b>${t.name}</b><span>${t.role}</span></figcaption>
    </figure>`
  ).join("");
})();

/* =====================================================================
   PORTFOLIO GALLERY  (project cards -> gallery lightbox)
   ===================================================================== */
const CAT_EMOJI = { "AR": "🪄", "VR": "🥽", "Location-Based": "📍", "Games & Apps": "🕹️" };
let activeFilter = "All";

function categories() {
  const set = [];
  (typeof PORTFOLIO!=="undefined"?PORTFOLIO:[]).forEach((p) => { if (!set.includes(p.cat)) set.push(p.cat); });
  return ["All", ...set];
}

function renderFilters() {
  const bar = $("#filterBar");
  if (!bar) return;
  const cats = categories();
  bar.innerHTML = cats
    .map((c) => {
      const n = c === "All" ? (PORTFOLIO || []).length : PORTFOLIO.filter((p) => p.cat === c).length;
      const label = c === "All" ? "All" : `${CAT_EMOJI[c] || "•"} ${c}`;
      return `<button class="filter-chip ${c === activeFilter ? "active" : ""}" data-cat="${c}">${label} <b>${n}</b></button>`;
    })
    .join("");
  $$(".filter-chip", bar).forEach((chip) =>
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.cat;
      renderFilters();
      renderGallery();
    })
  );
}

function projectCard(p, idx) {
  const isVid = p.cover.t === "video";
  const counts = [
    p.nv ? `<span>🎬 ${p.nv}</span>` : "",
    p.ni ? `<span>🖼️ ${p.ni}</span>` : "",
  ].join("");
  return `
    <article class="card reveal" data-idx="${idx}">
      <div class="card-media">
        <span class="badge ${p.cat === "AR" ? "image" : "video"}">${CAT_EMOJI[p.cat] || ""} ${p.cat}</span>
        <img src="${driveImg(p.cover.id)}" alt="${p.title}" loading="lazy"
             onerror="this.style.opacity=0" />
        ${isVid ? `<div class="play"><div class="play-btn"></div></div>` : ""}
      </div>
      <div class="card-body">
        <h3>${p.title}</h3>
        <div class="card-counts">${counts}</div>
      </div>
    </article>`;
}

function renderGallery() {
  const grid = $("#gallery");
  const empty = $("#galleryEmpty");
  if (!grid) return;
  const list = typeof PORTFOLIO!=="undefined"?PORTFOLIO:[];
  if (!list.length) {
    grid.innerHTML = "";
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  const filtered = activeFilter === "All" ? list : list.filter((p) => p.cat === activeFilter);
  grid.innerHTML = filtered.map((p) => projectCard(p, list.indexOf(p))).join("");
  $$(".card", grid).forEach((el) =>
    el.addEventListener("click", () => openProject(list[+el.dataset.idx]))
  );
  observeReveals();
}

/* ====== Gallery lightbox (multi-item, prev/next) ====== */
let lb, lbItems = [], lbIndex = 0, lbTitle = "";
function ensureLightbox() {
  if (lb) return lb;
  lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">×</button>
    <button class="lb-nav lb-prev" aria-label="Previous">‹</button>
    <div class="lb-stage">
      <div class="lightbox-inner"></div>
      <div class="lb-caption"><span class="lb-title"></span><span class="lb-counter"></span></div>
    </div>
    <button class="lb-nav lb-next" aria-label="Next">›</button>`;
  document.body.appendChild(lb);
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lightbox-close")) closeLightbox();
  });
  $(".lb-prev", lb).addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
  $(".lb-next", lb).addEventListener("click", (e) => { e.stopPropagation(); step(1); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  return lb;
}
function openProject(p) {
  ensureLightbox();
  lbItems = p.items || [];
  lbTitle = p.title;
  lbIndex = 0;
  if (!lbItems.length) return;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
  showItem();
}
function showItem() {
  const inner = $(".lightbox-inner", lb);
  const it = lbItems[lbIndex];
  inner.innerHTML =
    it.t === "video"
      ? `<iframe src="${driveEmbed(it.id)}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
      : `<img src="${driveImg(it.id)}" alt="${lbTitle}" />`;
  $(".lb-title", lb).textContent = lbTitle;
  $(".lb-counter", lb).textContent = lbItems.length > 1 ? `${lbIndex + 1} / ${lbItems.length}` : "";
  const multi = lbItems.length > 1;
  $(".lb-prev", lb).style.display = multi ? "" : "none";
  $(".lb-next", lb).style.display = multi ? "" : "none";
}
function step(d) {
  if (!lbItems.length) return;
  lbIndex = (lbIndex + d + lbItems.length) % lbItems.length;
  showItem();
}
function closeLightbox() {
  if (!lb) return;
  lb.classList.remove("open");
  $(".lightbox-inner", lb).innerHTML = "";
  document.body.style.overflow = "";
}

/* ====== Reveal on scroll ====== */
let io;
function observeReveals() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }
  $$(".reveal:not(.in)").forEach((el) => io.observe(el));
}

/* ====== Init ====== */
renderFilters();
renderGallery();
observeReveals();
