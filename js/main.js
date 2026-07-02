/* ============================================
   NEXORA — Landing Refined Edition JS
   Content rendering · Cinematic reveals · Elegant micro-interactions
   ============================================ */

;(function () {
  "use strict";

  const PREFERS_REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IS_TOUCH = window.matchMedia("(pointer: coarse)").matches;

  // ---- Content ----
  let C = ContentManager.getCachedContent();

  // ---- Icon SVGs (stroked, matching pm-dashboard tokens) ----
  const ICONS = {
    shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    zap: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    puzzle: `<svg viewBox="0 0 24 24"><path d="M19.4 7.9c-.05.32.06.65.29.88l1.57 1.57c.47.47.7 1.09.7 1.7s-.23 1.23-.7 1.7l-1.6 1.6a.98.98 0 0 1-.84.28c-.47-.07-.8-.48-.97-.93a2.5 2.5 0 1 0-3.2 3.2c.44.17.85.5.92.97a.98.98 0 0 1-.28.84L13.7 21.3a2.4 2.4 0 0 1-1.7.7 2.4 2.4 0 0 1-1.7-.7l-1.57-1.57a1 1 0 0 0-.88-.29c-.5.07-.84.5-1.02.97a2.5 2.5 0 1 1-3.24-3.24c.46-.18.9-.53.97-1.02a1 1 0 0 0-.29-.88L2.7 13.7A2.4 2.4 0 0 1 2 12c0-.62.24-1.23.7-1.7l1.62-1.62a.98.98 0 0 1 .84-.28c.47.07.8.48.97.93a2.5 2.5 0 1 0 3.2-3.2c-.44-.17-.85-.5-.92-.97a.98.98 0 0 1 .28-.84l1.6-1.6A2.4 2.4 0 0 1 11 3c.62 0 1.23.24 1.7.7l1.57 1.57c.23.23.56.34.88.29.5-.07.84-.5 1.02-.97a2.5 2.5 0 1 1 3.24 3.24c-.46.18-.9.53-.97 1.02z"/></svg>`,
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

  const ACCENT_WORDS = [
    "results", "innovation", "future", "smarter", "faster",
    "reimagined", "deliver", "one", "delivery", "learn", "talk", "trusted"
  ];

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

  // Split text into per-word spans for the line-clip slide-up reveal.
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
            /* keep line breaks intact */
          } else {
            walk(child);
          }
        }
      });
    };

    walk(el);

    const words = el.querySelectorAll(".split-word__inner");
    words.forEach((w, i) => {
      w.style.transitionDelay = `${0.06 * i + 0.05}s`;
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
      .join("") + `<a href="/app/#login" class="mobile-menu__link" style="color:var(--indigo)">Login</a>`;

    // Hero
    const heroBadge = document.getElementById("heroBadge");
    heroBadge.innerHTML = `<span class="hero__badge-dot"></span><span>${C.hero.badge}</span>`;

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
      <div class="about__card">
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
      <div class="feature-card">
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
    hiwTimeline.innerHTML = C.howItWorks.steps
      .map((s) => `
      <div class="hiw__step">
        <div class="hiw__step-number">${s.number}</div>
        <h3 class="hiw__step-title">${s.title}</h3>
        <p class="hiw__step-desc">${s.description}</p>
      </div>`)
      .join("");

    // Testimonials — cross-fade (absolute layered cards)
    document.getElementById("testBadge").textContent = C.testimonials.badge;
    document.getElementById("testHeadline").textContent = C.testimonials.headline;
    const testTrack = document.getElementById("testTrack");
    testTrack.innerHTML = C.testimonials.items
      .map((t, i) => `
      <div class="testimonial-card${i === 0 ? " is-active" : ""}" data-index="${i}">
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
      <div class="pricing-card${p.highlighted ? " pricing-card--highlighted" : ""}">
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
        <a href="#" class="btn ${p.highlighted ? "btn--white" : "btn--ghost"} btn--full">${p.cta}</a>
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
    document.querySelectorAll("[data-split]").forEach((el) => {
      splitTextIntoWords(el);
    });
  }

  // ============================================
  // NAV — shrink on scroll + mobile menu
  // ============================================

  function initNav() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("navBurger");
    const mobileMenu = document.getElementById("mobileMenu");

    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("is-open");
      mobileMenu.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        burger.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================

  function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.width = (progress * 100).toFixed(2) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ============================================
  // CINEMATIC REVEALS (IntersectionObserver)
  // ============================================

  function initReveals() {
    // Skip animation if user prefers reduced motion — mark everything visible.
    if (PREFERS_REDUCED) {
      document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => el.classList.add("is-visible"));
      document.querySelectorAll(".split-word").forEach((w) => w.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => observer.observe(el));

    // Split-word reveal — separate observer with a slightly earlier trigger for headlines.
    const splitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".split-word").forEach((w) => w.classList.add("is-visible"));
            splitObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -4% 0px" }
    );

    document.querySelectorAll("[data-split]").forEach((el) => splitObserver.observe(el));
  }

  // ============================================
  // NUMBER COUNTERS — count up when stats enter viewport
  // ============================================

  function initCounters() {
    if (PREFERS_REDUCED) return;
    const stats = document.querySelectorAll(".hero__stat-value");
    if (!stats.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const text = el.textContent;
          const match = text.match(/^([<>]?)([\d.]+)(.*)$/);
          if (!match) { observer.unobserve(el); return; }

          const prefix = match[1];
          const target = parseFloat(match[2]);
          const suffix = match[3];
          const duration = 1400;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = target * eased;
            el.textContent = prefix +
              (target % 1 !== 0 ? current.toFixed(1) : Math.floor(current)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
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
  // TESTIMONIALS — cross-fade
  // ============================================

  function initTestimonials() {
    const cards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".testimonials__dot");
    if (!cards.length || !dots.length) return;

    let current = 0;
    let timer;

    function goTo(i) {
      current = (i + cards.length) % cards.length;
      cards.forEach((c, idx) => c.classList.toggle("is-active", idx === current));
      dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 6000);
    }

    dots.forEach((d) => d.addEventListener("click", () => {
      goTo(parseInt(d.dataset.index, 10));
      startAuto();
    }));

    // Touch swipe
    const wrapper = document.querySelector(".testimonials__track-wrapper");
    if (wrapper) {
      let startX;
      wrapper.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        clearInterval(timer);
      }, { passive: true });
      wrapper.addEventListener("touchend", (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
      }, { passive: true });
    }

    startAuto();
  }

  // ============================================
  // HERO MOCKUP — subtle mouse-follow parallax
  // ============================================

  function initMockupParallax() {
    if (IS_TOUCH || PREFERS_REDUCED) return;
    const mockup = document.getElementById("heroMockup");
    const frame = document.getElementById("heroMockupFrame");
    if (!mockup || !frame) return;

    let targetRX = 0, targetRY = 0;
    let currentRX = -4, currentRY = 2; // rest pose matches CSS
    let raf = null;

    function onMove(e) {
      const rect = mockup.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      // Ease around rest pose (-4deg Y, 2deg X). Max deviation ~4deg.
      targetRY = -4 + dx * 4;
      targetRX = 2 + -dy * 3;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function loop() {
      currentRY += (targetRY - currentRY) * 0.08;
      currentRX += (targetRX - currentRX) * 0.08;
      frame.style.transform = `rotateY(${currentRY.toFixed(2)}deg) rotateX(${currentRX.toFixed(2)}deg)`;
      if (Math.abs(targetRY - currentRY) > 0.02 || Math.abs(targetRX - currentRX) > 0.02) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
  }

  // ============================================
  // CONTACT FORM (demo submit)
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
      btn.style.background = "linear-gradient(135deg, #16A34A, #22c55e)";
      setTimeout(() => {
        if (label) label.textContent = original; else btn.textContent = original;
        btn.style.background = "";
        form.reset();
      }, 2500);
    });
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
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("is-open");
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
        btn.style.background = "var(--indigo-soft)";
        btn.style.borderColor = "var(--indigo)";
        localStorage.setItem("nexora_onboard_role", role);
        setTimeout(() => {
          closeModal();
          window.location.href = "/app/#login";
        }, 300);
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
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
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      try {
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (_) {}
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      try { video.pause(); } catch (_) {}
    }

    trigger.addEventListener("click", openModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  // ============================================
  // INIT
  // ============================================

  function runEffects() {
    initReveals();
    initTestimonials();
    initCounters();
    initMockupParallax();
    initContactForm();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderContent();
    initNav();
    initScrollProgress();

    // Body fade-in
    requestAnimationFrame(() => {
      document.body.classList.add("is-ready");
      runEffects();
      initRoleModal();
      initVideoModal();
    });

    // Async CMS refresh — re-render if server content differs from cache.
    ContentManager.fetchContent()
      .then((fresh) => {
        if (JSON.stringify(fresh) === JSON.stringify(C)) return;
        C = fresh;
        renderContent();
        requestAnimationFrame(() => {
          initReveals();
          initTestimonials();
          initCounters();
        });
      })
      .catch((e) => console.warn("CMS refresh failed:", e));
  });
})();
