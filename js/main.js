/* ============================================
   NEXORA — Galaxy Edition JS
   Loader · Cursor · Starfield · Shooting Stars · Constellation Particles
   Split Text · Scroll Rail · Magnetic · Tilt · Content Rendering
   ============================================ */

;(function () {
  "use strict";

  const PREFERS_REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IS_TOUCH = window.matchMedia("(pointer: coarse)").matches;

  // ---- Content ----
  let C = ContentManager.getCachedContent();

  // ---- Icon SVGs ----
  const ICONS = {
    shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    zap: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    puzzle: `<svg viewBox="0 0 24 24"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.611 1.611a2.407 2.407 0 0 1-1.704.706 2.407 2.407 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.878-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.878l-1.568-1.568A2.407 2.407 0 0 1 1 12c0-.617.236-1.234.706-1.704L3.317 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.611-1.611A2.407 2.407 0 0 1 11 2.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.878.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/></svg>`,
    brain: `<svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 3 3h1a4 4 0 0 0 8 0h1a3 3 0 0 0 3-3v-1a3 3 0 0 0 0-6v-1a3 3 0 0 0-3-3V6a4 4 0 0 0-4-4z"/><path d="M12 2v20"/></svg>`,
    workflow: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h3"/><path d="M15 12h-3"/></svg>`,
    layers: `<svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    lock: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    chart: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    code: `<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    mail: `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mapPin: `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    github: `<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  };

  function getIcon(name) { return ICONS[name] || ICONS.zap; }

  // Words to italicize inside the hero headline (last match per line wins).
  const ACCENT_WORDS = ["results", "innovation", "future", "smarter", "faster", "reimagined", "deliver"];

  function applyAccentItalic(headlineEl, text) {
    const lines = text.split(/\n/);
    const html = lines.map((line) => {
      const words = line.split(/\s+/);
      let accentIdx = -1;
      for (let i = words.length - 1; i >= 0; i--) {
        const clean = words[i].replace(/[.,!?;:]/g, "").toLowerCase();
        if (ACCENT_WORDS.includes(clean)) { accentIdx = i; break; }
      }
      return words
        .map((w, i) => i === accentIdx ? `<em class="accent-italic">${w}</em>` : w)
        .join(" ");
    }).join("<br>");
    headlineEl.innerHTML = html;
  }

  // Split text into per-word wrappers for line-clip slide-up reveal
  function splitTextIntoWords(el) {
    const wrap = (textNode) => {
      const text = textNode.nodeValue;
      if (!text || !text.trim()) return null;
      const frag = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else if (part.length) {
          const wWrap = document.createElement("span");
          wWrap.className = "split-word";
          const wInner = document.createElement("span");
          wInner.className = "split-word__inner";
          wInner.textContent = part;
          wWrap.appendChild(wInner);
          frag.appendChild(wWrap);
        }
      });
      return frag;
    };

    const walk = (node) => {
      const kids = Array.from(node.childNodes);
      kids.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = wrap(child);
          if (frag) child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.classList && child.classList.contains("accent-italic")) {
            const wWrap = document.createElement("span");
            wWrap.className = "split-word";
            const wInner = document.createElement("span");
            wInner.className = "split-word__inner";
            child.parentNode.insertBefore(wWrap, child);
            wInner.appendChild(child);
            wWrap.appendChild(wInner);
          } else if (child.tagName === "BR") {
            /* keep */
          } else {
            walk(child);
          }
        }
      });
    };

    walk(el);

    const words = el.querySelectorAll(".split-word__inner");
    words.forEach((w, i) => {
      w.style.transitionDelay = `${0.05 * i + 0.05}s`;
    });
  }

  // ============================================
  // RENDER CONTENT
  // ============================================

  function renderContent() {
    const navLinks = document.getElementById("navLinks");
    navLinks.innerHTML = C.nav.links
      .map((l) => `<a href="${l.href}" class="nav__link">${l.label}</a>`)
      .join("");

    const mobileMenuLinks = document.getElementById("mobileMenuLinks");
    mobileMenuLinks.innerHTML = C.nav.links
      .map((l) => `<a href="${l.href}" class="mobile-menu__link">${l.label}</a>`)
      .join("") + `<a href="/app/#login" class="mobile-menu__link" style="color:var(--nebula-violet)">Login</a>`;

    // Hero
    document.getElementById("heroBadge").innerHTML = `<span class="hero__badge-dot"></span><span>${C.hero.badge}</span>`;

    const heroHeadline = document.getElementById("heroHeadline");
    applyAccentItalic(heroHeadline, C.hero.headline);

    document.getElementById("heroSub").textContent = C.hero.subheadline;
    document.getElementById("heroPrimaryCta").querySelector(".btn__label").textContent = C.hero.primaryCta;
    document.getElementById("heroPrimaryCta").href = C.hero.primaryCtaHref;
    document.getElementById("heroSecondaryCta").querySelector(".btn__label").textContent = C.hero.secondaryCta;
    document.getElementById("heroSecondaryCta").href = C.hero.secondaryCtaHref;

    const heroStats = document.getElementById("heroStats");
    heroStats.innerHTML = C.hero.stats
      .map((s) => `
      <div class="hero__stat">
        <div class="hero__stat-value">${s.value}</div>
        <div class="hero__stat-label">${s.label}</div>
      </div>`)
      .join("");

    // About
    document.getElementById("aboutBadge").textContent = C.about.badge;
    document.getElementById("aboutHeadline").textContent = C.about.headline;
    document.getElementById("aboutDesc").textContent = C.about.description;
    const aboutGrid = document.getElementById("aboutGrid");
    aboutGrid.innerHTML = C.about.highlights
      .map((h) => `
      <div class="about__card reveal-up">
        <div class="about__card-icon">${getIcon(h.icon)}</div>
        <h3 class="about__card-title">${h.title}</h3>
        <p class="about__card-desc">${h.description}</p>
      </div>`)
      .join("");

    // Features
    document.getElementById("featuresBadge").textContent = C.features.badge;
    document.getElementById("featuresHeadline").textContent = C.features.headline;
    document.getElementById("featuresDesc").textContent = C.features.description;
    const featuresGrid = document.getElementById("featuresGrid");
    featuresGrid.innerHTML = C.features.items
      .map((f) => `
      <div class="feature-card reveal-up" style="--card-accent: ${f.color}">
        <div class="feature-card__shine"></div>
        <div class="feature-card__icon">${getIcon(f.icon)}</div>
        <h3 class="feature-card__title">${f.title}</h3>
        <p class="feature-card__desc">${f.description}</p>
      </div>`)
      .join("");

    // How It Works
    document.getElementById("hiwBadge").textContent = C.howItWorks.badge;
    document.getElementById("hiwHeadline").textContent = C.howItWorks.headline;
    document.getElementById("hiwDesc").textContent = C.howItWorks.description;
    const hiwTimeline = document.getElementById("hiwTimeline");
    hiwTimeline.innerHTML =
      `<div class="hiw__timeline-progress" id="hiwProgress"></div>` +
      C.howItWorks.steps
        .map((s) => `
      <div class="hiw__step">
        <div class="hiw__step-number">${s.number}</div>
        <h3 class="hiw__step-title">${s.title}</h3>
        <p class="hiw__step-desc">${s.description}</p>
      </div>`)
        .join("");

    // Testimonials
    document.getElementById("testBadge").textContent = C.testimonials.badge;
    document.getElementById("testHeadline").textContent = C.testimonials.headline;
    const testTrack = document.getElementById("testTrack");
    testTrack.innerHTML = C.testimonials.items
      .map((t) => `
      <div class="testimonial-card">
        <p class="testimonial-card__quote">${t.quote}</p>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">${t.author.charAt(0)}</div>
          <div>
            <div class="testimonial-card__name">${t.author}</div>
            <div class="testimonial-card__role">${t.role}</div>
          </div>
        </div>
      </div>`)
      .join("");

    const testDots = document.getElementById("testDots");
    testDots.innerHTML = C.testimonials.items
      .map((_, i) =>
        `<button class="testimonials__dot${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Testimonial ${i + 1}"></button>`)
      .join("");

    // Pricing
    document.getElementById("pricingBadge").textContent = C.pricing.badge;
    document.getElementById("pricingHeadline").textContent = C.pricing.headline;
    document.getElementById("pricingDesc").textContent = C.pricing.description;
    const pricingGrid = document.getElementById("pricingGrid");
    pricingGrid.innerHTML = C.pricing.plans
      .map((p) => `
      <div class="pricing-card${p.highlighted ? " pricing-card--highlighted" : ""} reveal-up">
        ${p.highlighted ? '<div class="pricing-card__popular">Most Popular</div>' : ""}
        <div class="pricing-card__name">${p.name}</div>
        <div class="pricing-card__price">
          <span class="pricing-card__amount">${p.price}</span>
          <span class="pricing-card__period">${p.period}</span>
        </div>
        <p class="pricing-card__desc">${p.description}</p>
        <ul class="pricing-card__features">
          ${p.features.map((f) => `<li>${f}</li>`).join("")}
        </ul>
        <a href="#" class="btn ${p.highlighted ? "btn--primary" : "btn--ghost"} btn--full">${p.cta}</a>
      </div>`)
      .join("");

    // CTA
    document.getElementById("ctaHeadline").textContent = C.cta.headline;
    document.getElementById("ctaDesc").textContent = C.cta.description;
    document.getElementById("ctaPrimary").textContent = C.cta.primaryCta;
    document.getElementById("ctaPrimary").href = C.cta.primaryCtaHref;
    document.getElementById("ctaSecondary").textContent = C.cta.secondaryCta;
    document.getElementById("ctaSecondary").href = C.cta.secondaryCtaHref;

    // Contact
    document.getElementById("contactBadge").textContent = C.contact.badge;
    document.getElementById("contactHeadline").textContent = C.contact.headline;
    document.getElementById("contactDesc").textContent = C.contact.description;
    document.getElementById("contactInfo").innerHTML = `
      <div class="contact__info-item">
        <div class="contact__info-icon">${getIcon("mail")}</div>
        <div><div class="contact__info-label">Email</div><div class="contact__info-value">${C.contact.email}</div></div>
      </div>
      <div class="contact__info-item">
        <div class="contact__info-icon">${getIcon("phone")}</div>
        <div><div class="contact__info-label">Phone</div><div class="contact__info-value">${C.contact.phone}</div></div>
      </div>
      <div class="contact__info-item">
        <div class="contact__info-icon">${getIcon("mapPin")}</div>
        <div><div class="contact__info-label">Address</div><div class="contact__info-value">${C.contact.address}</div></div>
      </div>
    `;

    // Footer
    document.getElementById("footerDesc").textContent = C.footer.description;
    document.getElementById("footerCopyright").textContent = `© ${C.footer.copyright}`;

    const footerSocials = document.getElementById("footerSocials");
    footerSocials.innerHTML = C.footer.socials
      .map((s) =>
        `<a href="${s.href}" class="footer__social-link" aria-label="${s.platform}">${getIcon(s.platform)}</a>`)
      .join("");

    const footerColumns = document.getElementById("footerColumns");
    footerColumns.innerHTML = C.footer.columns
      .map((col) => `
      <div>
        <h4 class="footer__col-title">${col.title}</h4>
        <div class="footer__col-links">
          ${col.links.map((l) => `<a href="${l.href}" class="footer__col-link">${l.label}</a>`).join("")}
        </div>
      </div>`)
      .join("");

    // Split-text: re-split on every render (textContent overwrites children).
    // If parent already in viewport, reveal immediately so words don't get stuck.
    document.querySelectorAll("[data-split]").forEach((el) => {
      splitTextIntoWords(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.querySelectorAll(".split-word").forEach((w) => w.classList.add("is-visible"));
      }
    });
  }

  // ============================================
  // PAGE LOADER
  // ============================================

  function initLoader() {
    const loader = document.getElementById("pageLoader");
    const bar = document.getElementById("loaderBarFill");
    if (!loader || !bar) return;

    let progress = 0;
    const minDuration = 900;
    const start = performance.now();

    const tick = () => {
      const target = 92;
      progress += (target - progress) * 0.08;
      bar.style.width = progress + "%";
      if (progress < target - 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        bar.style.width = "100%";
        setTimeout(() => {
          loader.classList.add("is-hidden");
          document.body.classList.add("loader-done");
        }, 280);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
  }

  // ============================================
  // CUSTOM CURSOR (minimal, no labels)
  // ============================================

  function initCustomCursor() {
    if (IS_TOUCH) return;
    const cursor = document.getElementById("cursor");
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let rx = mx, ry = my;

    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    document.addEventListener("mousedown", () => cursor.classList.add("is-press"));
    document.addEventListener("mouseup",   () => cursor.classList.remove("is-press"));

    function loop() {
      dx += (mx - dx) * 0.5;
      dy += (my - dy) * 0.5;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;

      dot.style.transform  = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const HOVER_SEL = 'a, button, .btn, [role="button"], .testimonials__dot, .role-option, .scroll-rail__item, input, textarea';
    const TEXT_SEL = 'input, textarea, [contenteditable]';

    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest(HOVER_SEL);
      if (!t) return;
      cursor.classList.add("is-hover");
      if (t.matches(TEXT_SEL)) cursor.classList.add("is-text");
    });

    document.addEventListener("mouseout", (e) => {
      const t = e.target.closest(HOVER_SEL);
      if (!t) return;
      cursor.classList.remove("is-hover", "is-text");
    });

    document.addEventListener("mouseleave", () => cursor.style.opacity = "0");
    document.addEventListener("mouseenter", () => cursor.style.opacity = "1");
  }

  // ============================================
  // STARFIELD (background canvas — twinkling stars w/ parallax)
  // ============================================

  function initStarfield() {
    if (PREFERS_REDUCED) return;
    const canvas = document.getElementById("starfieldCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = 0, h = 0, dpr = 1;
    let stars = [];
    let scrollY = window.scrollY;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      buildStars();
    }

    function buildStars() {
      const density = Math.min((w * h) / 6500, 260);
      stars = [];
      for (let i = 0; i < density; i++) {
        const layer = Math.random() < 0.65 ? 1 : (Math.random() < 0.7 ? 2 : 3);
        stars.push({
          x: Math.random() * w,
          // Distribute across taller virtual height so scroll parallax keeps stars
          baseY: Math.random() * h * 3,
          size: layer === 3 ? Math.random() * 1.6 + 0.8 : Math.random() * 1.1 + 0.3,
          layer,
          opacity: layer === 3 ? Math.random() * 0.3 + 0.5 : Math.random() * 0.4 + 0.15,
          twinkleSpeed: Math.random() * 0.005 + 0.001,
          twinklePhase: Math.random() * Math.PI * 2,
          hue: Math.random() < 0.85 ? 0 : (Math.random() < 0.5 ? 260 : 200), // mostly white, some violet/cyan
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // Parallax by layer: closer layers move faster on scroll
        const parallax = scrollY * (s.layer === 1 ? 0.05 : s.layer === 2 ? 0.15 : 0.3);
        let y = (s.baseY - parallax) % (h * 3);
        if (y < 0) y += h * 3;
        // Only draw if in viewport
        if (y > h + 20 || y < -20) continue;

        const tw = 0.6 + Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.4;
        const alpha = s.opacity * tw;

        ctx.beginPath();
        ctx.arc(s.x, y, s.size, 0, Math.PI * 2);
        if (s.hue === 0) {
          ctx.fillStyle = `rgba(248, 250, 252, ${alpha})`;
        } else if (s.hue === 260) {
          ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(125, 211, 252, ${alpha})`;
        }
        ctx.fill();

        // Glow halo for brighter stars
        if (s.layer === 3) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(248, 250, 252, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

    resize();
    requestAnimationFrame(draw);
  }

  // ============================================
  // SHOOTING STARS (occasional CSS-driven streaks)
  // ============================================

  function initShootingStars() {
    if (PREFERS_REDUCED) return;
    const container = document.getElementById("shootingStars");
    if (!container) return;

    function spawn() {
      const star = document.createElement("div");
      star.className = "shooting-star";

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight * 0.5;
      const angle = -25 - Math.random() * 25; // -25 to -50 degrees
      const distance = window.innerWidth * 0.5 + Math.random() * 200;
      const duration = 800 + Math.random() * 600;

      star.style.left = startX + "px";
      star.style.top = startY + "px";
      star.style.transform = `rotate(${angle}deg) translateX(0)`;
      star.style.opacity = "0";
      star.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity ${duration}ms ease-out`;

      container.appendChild(star);

      requestAnimationFrame(() => {
        star.style.opacity = "1";
        star.style.transform = `rotate(${angle}deg) translateX(${distance}px)`;
      });

      setTimeout(() => {
        star.style.opacity = "0";
      }, duration * 0.7);

      setTimeout(() => star.remove(), duration + 200);
    }

    function schedule() {
      const delay = 4500 + Math.random() * 7000;
      setTimeout(() => {
        if (!document.hidden) spawn();
        schedule();
      }, delay);
    }

    // Kick off after a short pause so it doesn't fight the loader
    setTimeout(schedule, 3000);
  }

  // ============================================
  // HERO CONSTELLATION PARTICLES (subtle network)
  // ============================================

  function initHeroParticles() {
    if (PREFERS_REDUCED) return;
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let rafId;

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * 1.6 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / dist) * force * 1.8;
        }

        if (this.x < 0 || this.x > canvas.offsetWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.offsetHeight) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.fill();
      }
    }

    function init() {
      resize();
      const count = Math.min(Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 10000), 110);
      particles = Array.from({ length: count }, () => new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawLines();
      rafId = requestAnimationFrame(animate);
    }

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", () => { mouse.x = -1000; mouse.y = -1000; });

    window.addEventListener("resize", () => {
      cancelAnimationFrame(rafId);
      init();
      animate();
    });

    init();
    animate();
  }

  // ============================================
  // CURSOR GLOW
  // ============================================

  function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow || IS_TOUCH) return;

    let cx = -1000, cy = -1000, gx = -1000, gy = -1000;

    document.addEventListener("mousemove", (e) => { cx = e.clientX; cy = e.clientY; });

    function tick() {
      gx += (cx - gx) * 0.06;
      gy += (cy - gy) * 0.06;
      glow.style.transform = `translate(${gx - 260}px, ${gy - 260}px)`;
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================

  function initScrollProgress() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.prepend(bar);

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }

  // ============================================
  // SCROLL RAIL
  // ============================================

  function initScrollRail() {
    if (window.innerWidth < 1080) return;
    const rail = document.getElementById("scrollRail");
    const railItems = document.getElementById("scrollRailItems");
    if (!rail || !railItems) return;

    const sections = Array.from(document.querySelectorAll("[data-rail]"));
    if (!sections.length) return;

    railItems.innerHTML = sections.map((s, i) => `
      <button class="scroll-rail__item${i === 0 ? " is-active" : ""}" data-target="${s.id}">
        <span class="scroll-rail__dot"></span>
        <span class="scroll-rail__label">${s.dataset.rail}</span>
      </button>
    `).join("");

    railItems.querySelectorAll(".scroll-rail__item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const t = document.getElementById(btn.dataset.target);
        if (t) t.scrollIntoView({ behavior: "smooth" });
      });
    });

    const items = railItems.querySelectorAll(".scroll-rail__item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            items.forEach((it) => it.classList.toggle("is-active", it.dataset.target === id));
          }
        });
      },
      { threshold: 0.45, rootMargin: "-20% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));

    let raf = null;
    const updateVisibility = () => {
      raf = null;
      rail.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", () => {
      if (raf) return;
      raf = requestAnimationFrame(updateVisibility);
    }, { passive: true });
    updateVisibility();
  }

  // ============================================
  // NAVIGATION SCROLL
  // ============================================

  function initNav() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("navBurger");
    const mobileMenu = document.getElementById("mobileMenu");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("nav--scrolled", window.scrollY > 50);
    }, { passive: true });

    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      })
    );

    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      })
    );
  }

  // ============================================
  // SCROLL REVEAL
  // ============================================

  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));

    const splitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = entry.target.querySelectorAll(".split-word");
            words.forEach((w) => w.classList.add("is-visible"));
            splitObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll("[data-split]").forEach((el) => splitObserver.observe(el));
  }

  // ============================================
  // HOW IT WORKS TIMELINE
  // ============================================

  function initTimeline() {
    const steps = document.querySelectorAll(".hiw__step");
    const progress = document.getElementById("hiwProgress");
    const timeline = document.querySelector(".hiw__timeline");
    if (!timeline || !progress || !steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.3 }
    );

    steps.forEach((s) => observer.observe(s));

    window.addEventListener("scroll", () => {
      const rect = timeline.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top > viewH || rect.bottom < 0) return;
      const scrolled = Math.min(1, Math.max(0, (viewH - rect.top) / (rect.height + viewH * 0.3)));
      progress.style.height = `${scrolled * 100}%`;
    }, { passive: true });
  }

  // ============================================
  // TESTIMONIALS CAROUSEL
  // ============================================

  function initCarousel() {
    const track = document.getElementById("testTrack");
    const dots = document.querySelectorAll(".testimonials__dot");
    if (!track || !dots.length) return;

    let current = 0;
    let interval;

    function goTo(i) {
      current = i;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    }

    function next() { goTo((current + 1) % dots.length); }

    function startAuto() {
      clearInterval(interval);
      interval = setInterval(next, 5500);
    }

    dots.forEach((dot) =>
      dot.addEventListener("click", () => {
        clearInterval(interval);
        goTo(parseInt(dot.dataset.index));
        startAuto();
      })
    );

    let startX;
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      clearInterval(interval);
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goTo(Math.min(current + 1, dots.length - 1)) : goTo(Math.max(current - 1, 0));
      }
      startAuto();
    }, { passive: true });

    startAuto();
  }

  // ============================================
  // MAGNETIC BUTTONS
  // ============================================

  function initMagnetic() {
    if (IS_TOUCH) return;

    document.querySelectorAll(".btn--primary, .btn--white, .nav__cta").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        const label = btn.querySelector(".btn__label");
        if (label) label.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
        const label = btn.querySelector(".btn__label");
        if (label) label.style.transform = "";
      });
    });
  }

  // ============================================
  // CARD MOUSE TRACKING
  // ============================================

  function initCardMouseTracking() {
    document.querySelectorAll(".about__card, .feature-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
        card.style.setProperty("--shine-x", `${x}%`);
        card.style.setProperty("--shine-y", `${y}%`);
      });
    });
  }

  // ============================================
  // FEATURE CARDS 3D TILT
  // ============================================

  function initTilt() {
    if (IS_TOUCH) return;

    document.querySelectorAll(".feature-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      });

      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  // ============================================
  // STAT COUNTERS
  // ============================================

  function initCounters() {
    const stats = document.querySelectorAll(".hero__stat-value");
    if (!stats.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const text = el.textContent;
          const match = text.match(/^([<>]?)([\d.]+)(.*)$/);
          if (!match) return;

          const prefix = match[1];
          const target = parseFloat(match[2]);
          const suffix = match[3];
          const duration = 1500;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;
            el.textContent = prefix +
              (target % 1 !== 0 ? current.toFixed(1) : Math.floor(current)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((s) => observer.observe(s));
  }

  // ============================================
  // PARALLAX — hero content fade + slight orbit drift
  // ============================================

  function initParallax() {
    const hero = document.querySelector(".hero__content");
    const orbit = document.querySelector(".hero__orbit");
    if (!hero) return;

    let raf = null;
    const update = () => {
      raf = null;
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        hero.style.transform = `translateY(${scroll * 0.15}px)`;
        hero.style.opacity = Math.max(0, 1 - scroll / (window.innerHeight * 0.85));
        if (orbit) {
          orbit.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.08}px)) scale(${1 - scroll / 6000})`;
        }
      }
    };

    window.addEventListener("scroll", () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }, { passive: true });
  }

  // ============================================
  // CONTACT FORM
  // ============================================

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const label = btn.querySelector(".btn__label");
      const original = label ? label.textContent : btn.textContent;
      if (label) label.textContent = "Sent!"; else btn.textContent = "Sent!";
      btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
      setTimeout(() => {
        if (label) label.textContent = original; else btn.textContent = original;
        btn.style.background = "";
        form.reset();
      }, 2500);
    });
  }

  // ============================================
  // CMS LINK
  // ============================================

  function addCmsLink() {
    // Local dev only — hide on production so the button never ships to visitors.
    const host = window.location.hostname || "";
    const isLocal =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "" ||                       // file:// or null host
      host.startsWith("192.168.") ||
      host.startsWith("10.") ||
      host.endsWith(".local");
    if (!isLocal) return;

    const link = document.createElement("a");
    link.href = "/cms/";
    link.className = "cms-link";
    link.textContent = "CMS";
    link.title = "Open Content Management System";
    document.body.appendChild(link);
  }

  // ============================================
  // ROLE SELECTION MODAL
  // ============================================

  function initRoleModal() {
    const modal = document.getElementById("roleModal");
    const backdrop = document.getElementById("roleBackdrop");
    const closeBtn = document.getElementById("roleClose");
    const options = document.getElementById("roleOptions");
    if (!modal) return;

    function openModal(e) {
      e.preventDefault();
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }

    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href*="/app/#login"]');
      if (link && !link.closest(".role-modal")) openModal(e);
    });

    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    if (options) {
      options.addEventListener("click", (e) => {
        const btn = e.target.closest(".role-option");
        if (!btn) return;
        const role = btn.dataset.role;
        btn.style.background = "rgba(167, 139, 250, 0.18)";
        btn.style.borderColor = "var(--nebula-violet)";
        localStorage.setItem("nexora_onboard_role", role);
        setTimeout(() => {
          closeModal();
          window.location.href = "/app/#login";
        }, 300);
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }

  // ============================================
  // VIDEO DEMO MODAL
  // ============================================

  function initVideoModal() {
    const modal = document.getElementById("videoModal");
    const backdrop = document.getElementById("videoBackdrop");
    const closeBtn = document.getElementById("videoClose");
    const video = document.getElementById("videoPlayer");
    const trigger = document.getElementById("heroSecondaryCta");
    if (!modal || !video || !trigger) return;

    function openModal(e) {
      if (e) e.preventDefault();
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      try {
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (_) {}
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      try { video.pause(); } catch (_) {}
    }

    trigger.addEventListener("click", openModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }

  // ============================================
  // INIT
  // ============================================

  function runEffects() {
    initScrollReveal();
    initTimeline();
    initCarousel();
    initMagnetic();
    initCardMouseTracking();
    initTilt();
    initCounters();
    initParallax();
    initContactForm();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initCustomCursor();

    renderContent();
    initStarfield();
    initShootingStars();
    initHeroParticles();
    initCursorGlow();
    initScrollProgress();
    initNav();

    requestAnimationFrame(() => {
      runEffects();
      initScrollRail();
      addCmsLink();
      initRoleModal();
      initVideoModal();
    });

    ContentManager.fetchContent()
      .then((fresh) => {
        if (JSON.stringify(fresh) === JSON.stringify(C)) return;
        C = fresh;
        renderContent();
        requestAnimationFrame(runEffects);
      })
      .catch((e) => console.warn("CMS refresh failed:", e));
  });
})();
