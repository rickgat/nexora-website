/* ============================================
   NEXORA CMS — Content Editor Logic
   ============================================ */

;(function () {
  "use strict";

  let content = ContentManager.getContent();
  let currentSection = "hero";

  const SECTION_META = {
    hero: { title: "Hero Section", subtitle: "Edit hero content, headline, and call-to-action buttons" },
    about: { title: "About Section", subtitle: "Edit company highlights and value propositions" },
    features: { title: "Features Section", subtitle: "Manage product features and descriptions" },
    howItWorks: { title: "How It Works", subtitle: "Edit step-by-step workflow descriptions" },
    testimonials: { title: "Testimonials", subtitle: "Manage customer quotes and social proof" },
    pricing: { title: "Pricing Plans", subtitle: "Edit pricing tiers, features, and CTAs" },
    cta: { title: "CTA Section", subtitle: "Edit the call-to-action banner content" },
    contact: { title: "Contact Section", subtitle: "Edit contact info and form settings" },
    nav: { title: "Navigation", subtitle: "Edit navigation links and branding" },
    footer: { title: "Footer", subtitle: "Edit footer columns, links, and social media" },
  };

  // ---- Toast ----
  function toast(msg, type = "success") {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.className = `toast toast--${type} show`;
    setTimeout(() => el.classList.remove("show"), 3000);
  }

  // ---- Sidebar Navigation ----
  function initSidebar() {
    document.querySelectorAll(".sidebar__link").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelector(".sidebar__link.active")?.classList.remove("active");
        btn.classList.add("active");
        currentSection = btn.dataset.section;
        renderEditor();
      });
    });
  }

  // ---- Field Renderers ----
  function textField(label, value, path) {
    return `
      <div class="form-group">
        <label>${label}</label>
        <input type="text" value="${escHtml(value || "")}" data-path="${path}" />
      </div>`;
  }

  function textareaField(label, value, path) {
    return `
      <div class="form-group">
        <label>${label}</label>
        <textarea rows="3" data-path="${path}">${escHtml(value || "")}</textarea>
      </div>`;
  }

  function colorField(label, value, path) {
    return `
      <div class="form-group">
        <label>${label}</label>
        <input type="color" value="${value || "#6366f1"}" data-path="${path}" style="height:38px;padding:4px;" />
      </div>`;
  }

  function escHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  // ---- Deep get/set by path ----
  function deepGet(obj, path) {
    return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  }

  function deepSet(obj, path, value) {
    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }

  // ---- Collect form data ----
  function collectData() {
    document.querySelectorAll("[data-path]").forEach((el) => {
      const path = el.dataset.path;
      const value = el.tagName === "TEXTAREA" ? el.value : el.value;
      deepSet(content, path, value);
    });

    // Collect array data
    document.querySelectorAll("[data-array-path]").forEach((container) => {
      const arrayPath = container.dataset.arrayPath;
      const items = container.querySelectorAll(".array-item");
      const arr = [];

      items.forEach((item) => {
        const obj = {};
        item.querySelectorAll("[data-field]").forEach((field) => {
          const key = field.dataset.field;
          obj[key] = field.value;
        });
        // handle boolean
        item.querySelectorAll("[data-field-bool]").forEach((field) => {
          const key = field.dataset.fieldBool;
          obj[key] = field.checked;
        });
        // handle sub-arrays
        item.querySelectorAll("[data-sub-array]").forEach((subContainer) => {
          const subKey = subContainer.dataset.subArray;
          const subItems = subContainer.querySelectorAll(".sub-array-item");
          const subArr = [];
          subItems.forEach((si) => {
            const subObj = {};
            si.querySelectorAll("[data-sub-field]").forEach((sf) => {
              subObj[sf.dataset.subField] = sf.value;
            });
            subArr.push(subObj);
          });
          obj[subKey] = subArr;
        });
        arr.push(item.dataset.template ? JSON.parse(item.dataset.template) : obj);
      });

      deepSet(content, arrayPath, arr);
    });
  }

  // ---- SECTION EDITORS ----

  function renderHero() {
    const h = content.hero;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textField("Badge Text", h.badge, "hero.badge")}
        ${textareaField("Headline (use \\n for line break)", h.headline, "hero.headline")}
        ${textareaField("Subheadline", h.subheadline, "hero.subheadline")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Call-to-Action Buttons</div>
        <div class="form-row">
          ${textField("Primary CTA Text", h.primaryCta, "hero.primaryCta")}
          ${textField("Primary CTA Link", h.primaryCtaHref, "hero.primaryCtaHref")}
        </div>
        <div class="form-row">
          ${textField("Secondary CTA Text", h.secondaryCta, "hero.secondaryCta")}
          ${textField("Secondary CTA Link", h.secondaryCtaHref, "hero.secondaryCtaHref")}
        </div>
      </div>
      <div class="form-section">
        <div class="form-section__title">Statistics</div>
        <div data-array-path="hero.stats" class="array-editor">
          ${h.stats
            .map(
              (s, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">Stat ${i + 1}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Value</label><input type="text" data-field="value" value="${escHtml(s.value)}" /></div>
                <div class="form-group"><label>Label</label><input type="text" data-field="label" value="${escHtml(s.label)}" /></div>
              </div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addStat()">+ Add Statistic</button>
        </div>
      </div>`;
  }

  function renderAbout() {
    const a = content.about;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textField("Badge", a.badge, "about.badge")}
        ${textField("Headline", a.headline, "about.headline")}
        ${textareaField("Description", a.description, "about.description")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Highlights</div>
        <div data-array-path="about.highlights" class="array-editor">
          ${a.highlights
            .map(
              (h, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">${h.title || `Highlight ${i + 1}`}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Icon</label>
                  <select data-field="icon">
                    ${["shield", "zap", "globe", "puzzle", "brain", "workflow", "layers", "lock", "chart", "code"]
                      .map((ic) => `<option value="${ic}"${h.icon === ic ? " selected" : ""}>${ic}</option>`)
                      .join("")}
                  </select>
                </div>
                <div class="form-group"><label>Title</label><input type="text" data-field="title" value="${escHtml(h.title)}" /></div>
              </div>
              <div class="form-group"><label>Description</label><textarea data-field="description" rows="2">${escHtml(h.description)}</textarea></div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addHighlight()">+ Add Highlight</button>
        </div>
      </div>`;
  }

  function renderFeatures() {
    const f = content.features;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textField("Badge", f.badge, "features.badge")}
        ${textareaField("Headline", f.headline, "features.headline")}
        ${textareaField("Description", f.description, "features.description")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Feature Items</div>
        <div data-array-path="features.items" class="array-editor">
          ${f.items
            .map(
              (item, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">${item.title || `Feature ${i + 1}`}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Icon</label>
                  <select data-field="icon">
                    ${["brain", "workflow", "layers", "lock", "chart", "code", "shield", "zap", "globe", "puzzle"]
                      .map((ic) => `<option value="${ic}"${item.icon === ic ? " selected" : ""}>${ic}</option>`)
                      .join("")}
                  </select>
                </div>
                <div class="form-group"><label>Accent Color</label><input type="color" data-field="color" value="${item.color || "#6366f1"}" style="height:38px;padding:4px;" /></div>
              </div>
              <div class="form-group"><label>Title</label><input type="text" data-field="title" value="${escHtml(item.title)}" /></div>
              <div class="form-group"><label>Description</label><textarea data-field="description" rows="2">${escHtml(item.description)}</textarea></div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addFeature()">+ Add Feature</button>
        </div>
      </div>`;
  }

  function renderHowItWorks() {
    const h = content.howItWorks;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textField("Badge", h.badge, "howItWorks.badge")}
        ${textareaField("Headline", h.headline, "howItWorks.headline")}
        ${textareaField("Description", h.description, "howItWorks.description")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Steps</div>
        <div data-array-path="howItWorks.steps" class="array-editor">
          ${h.steps
            .map(
              (s, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">Step ${i + 1}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Number</label><input type="text" data-field="number" value="${escHtml(s.number)}" /></div>
                <div class="form-group"><label>Title</label><input type="text" data-field="title" value="${escHtml(s.title)}" /></div>
              </div>
              <div class="form-group"><label>Description</label><textarea data-field="description" rows="2">${escHtml(s.description)}</textarea></div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addStep()">+ Add Step</button>
        </div>
      </div>`;
  }

  function renderTestimonials() {
    const t = content.testimonials;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textField("Badge", t.badge, "testimonials.badge")}
        ${textField("Headline", t.headline, "testimonials.headline")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Testimonial Items</div>
        <div data-array-path="testimonials.items" class="array-editor">
          ${t.items
            .map(
              (item, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">${item.author || `Testimonial ${i + 1}`}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-group"><label>Quote</label><textarea data-field="quote" rows="3">${escHtml(item.quote)}</textarea></div>
              <div class="form-row">
                <div class="form-group"><label>Author Name</label><input type="text" data-field="author" value="${escHtml(item.author)}" /></div>
                <div class="form-group"><label>Role / Company</label><input type="text" data-field="role" value="${escHtml(item.role)}" /></div>
              </div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addTestimonial()">+ Add Testimonial</button>
        </div>
      </div>`;
  }

  function renderPricing() {
    const p = content.pricing;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textField("Badge", p.badge, "pricing.badge")}
        ${textField("Headline", p.headline, "pricing.headline")}
        ${textareaField("Description", p.description, "pricing.description")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Plans</div>
        <div data-array-path="pricing.plans" class="array-editor">
          ${p.plans
            .map(
              (plan, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">${plan.name || `Plan ${i + 1}`}</span>
                <div class="array-item__actions">
                  <label style="display:flex;align-items:center;gap:6px;font-size:0.75rem;color:var(--text-secondary);">
                    <input type="checkbox" data-field-bool="highlighted" ${plan.highlighted ? "checked" : ""} /> Highlighted
                  </label>
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Name</label><input type="text" data-field="name" value="${escHtml(plan.name)}" /></div>
                <div class="form-group"><label>Price</label><input type="text" data-field="price" value="${escHtml(plan.price)}" /></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Period</label><input type="text" data-field="period" value="${escHtml(plan.period)}" placeholder="/month" /></div>
                <div class="form-group"><label>CTA Text</label><input type="text" data-field="cta" value="${escHtml(plan.cta)}" /></div>
              </div>
              <div class="form-group"><label>Description</label><input type="text" data-field="description" value="${escHtml(plan.description)}" /></div>
              <div class="form-group">
                <label>Features (one per line)</label>
                <textarea data-field="features" rows="4">${(plan.features || []).join("\n")}</textarea>
              </div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addPlan()">+ Add Plan</button>
        </div>
      </div>`;
  }

  function renderCta() {
    const c = content.cta;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textareaField("Headline", c.headline, "cta.headline")}
        ${textareaField("Description", c.description, "cta.description")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Buttons</div>
        <div class="form-row">
          ${textField("Primary CTA", c.primaryCta, "cta.primaryCta")}
          ${textField("Primary Link", c.primaryCtaHref, "cta.primaryCtaHref")}
        </div>
        <div class="form-row">
          ${textField("Secondary CTA", c.secondaryCta, "cta.secondaryCta")}
          ${textField("Secondary Link", c.secondaryCtaHref, "cta.secondaryCtaHref")}
        </div>
      </div>`;
  }

  function renderContact() {
    const c = content.contact;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textField("Badge", c.badge, "contact.badge")}
        ${textField("Headline", c.headline, "contact.headline")}
        ${textareaField("Description", c.description, "contact.description")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Contact Info</div>
        ${textField("Email", c.email, "contact.email")}
        ${textField("Phone", c.phone, "contact.phone")}
        ${textField("Address", c.address, "contact.address")}
      </div>`;
  }

  function renderNav() {
    const n = content.nav;
    return `
      <div class="form-section">
        <div class="form-section__title">Brand</div>
        ${textField("Logo Text", n.logo, "nav.logo")}
        <div class="form-row">
          ${textField("CTA Text", n.ctaText, "nav.ctaText")}
          ${textField("CTA Link", n.ctaHref, "nav.ctaHref")}
        </div>
      </div>
      <div class="form-section">
        <div class="form-section__title">Navigation Links</div>
        <div data-array-path="nav.links" class="array-editor">
          ${n.links
            .map(
              (l, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">Link ${i + 1}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Label</label><input type="text" data-field="label" value="${escHtml(l.label)}" /></div>
                <div class="form-group"><label>Link</label><input type="text" data-field="href" value="${escHtml(l.href)}" /></div>
              </div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addNavLink()">+ Add Link</button>
        </div>
      </div>`;
  }

  function renderFooter() {
    const f = content.footer;
    return `
      <div class="form-section">
        <div class="form-section__title">Content</div>
        ${textareaField("Description", f.description, "footer.description")}
        ${textField("Copyright", f.copyright, "footer.copyright")}
      </div>
      <div class="form-section">
        <div class="form-section__title">Footer Columns</div>
        <div data-array-path="footer.columns" class="array-editor">
          ${f.columns
            .map(
              (col, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">${col.title || `Column ${i + 1}`}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-group"><label>Title</label><input type="text" data-field="title" value="${escHtml(col.title)}" /></div>
              <div class="form-group">
                <label>Links (label | href — one per line)</label>
                <textarea data-field="links" rows="4">${(col.links || []).map((l) => `${l.label} | ${l.href}`).join("\n")}</textarea>
              </div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addFooterColumn()">+ Add Column</button>
        </div>
      </div>
      <div class="form-section">
        <div class="form-section__title">Social Links</div>
        <div data-array-path="footer.socials" class="array-editor">
          ${f.socials
            .map(
              (s, i) => `
            <div class="array-item">
              <div class="array-item__header">
                <span class="array-item__title">${s.platform}</span>
                <div class="array-item__actions">
                  <button class="btn-icon btn-icon--danger" onclick="removeArrayItem(this)">×</button>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Platform</label>
                  <select data-field="platform">
                    ${["twitter", "github", "linkedin"]
                      .map((p) => `<option value="${p}"${s.platform === p ? " selected" : ""}>${p}</option>`)
                      .join("")}
                  </select>
                </div>
                <div class="form-group"><label>URL</label><input type="text" data-field="href" value="${escHtml(s.href)}" /></div>
              </div>
            </div>`
            )
            .join("")}
          <button class="array-add" onclick="addSocial()">+ Add Social</button>
        </div>
      </div>`;
  }

  // ---- Render current section ----
  function renderEditor() {
    const meta = SECTION_META[currentSection];
    document.getElementById("pageTitle").textContent = meta.title;
    document.getElementById("pageSubtitle").textContent = meta.subtitle;

    const renderers = {
      hero: renderHero,
      about: renderAbout,
      features: renderFeatures,
      howItWorks: renderHowItWorks,
      testimonials: renderTestimonials,
      pricing: renderPricing,
      cta: renderCta,
      contact: renderContact,
      nav: renderNav,
      footer: renderFooter,
    };

    document.getElementById("editorContent").innerHTML = renderers[currentSection]();
  }

  // ---- Array manipulation (global functions for onclick) ----
  window.removeArrayItem = function (btn) {
    const item = btn.closest(".array-item");
    if (item) {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
      item.style.transition = "all 0.3s ease";
      setTimeout(() => {
        item.remove();
      }, 300);
    }
  };

  window.addStat = function () {
    content.hero.stats.push({ value: "0", label: "New" });
    collectData();
    renderEditor();
  };

  window.addHighlight = function () {
    content.about.highlights.push({ icon: "zap", title: "New Highlight", description: "Description here." });
    collectData();
    renderEditor();
  };

  window.addFeature = function () {
    content.features.items.push({ icon: "zap", title: "New Feature", description: "Description here.", color: "#6366f1" });
    collectData();
    renderEditor();
  };

  window.addStep = function () {
    const num = String(content.howItWorks.steps.length + 1).padStart(2, "0");
    content.howItWorks.steps.push({ number: num, title: "New Step", description: "Description here." });
    collectData();
    renderEditor();
  };

  window.addTestimonial = function () {
    content.testimonials.items.push({ quote: "Amazing product!", author: "Name", role: "Role, Company", avatar: "" });
    collectData();
    renderEditor();
  };

  window.addPlan = function () {
    content.pricing.plans.push({ name: "New Plan", price: "$0", period: "/month", description: "Plan description.", features: ["Feature 1"], cta: "Get Started", highlighted: false });
    collectData();
    renderEditor();
  };

  window.addNavLink = function () {
    content.nav.links.push({ label: "New Link", href: "#" });
    collectData();
    renderEditor();
  };

  window.addFooterColumn = function () {
    content.footer.columns.push({ title: "New Column", links: [{ label: "Link", href: "#" }] });
    collectData();
    renderEditor();
  };

  window.addSocial = function () {
    content.footer.socials.push({ platform: "twitter", href: "#" });
    collectData();
    renderEditor();
  };

  // ---- Special handling for pricing features (newline-separated) ----
  function processPricingFeatures() {
    const plansContainer = document.querySelector('[data-array-path="pricing.plans"]');
    if (!plansContainer) return;

    plansContainer.querySelectorAll(".array-item").forEach((item, i) => {
      const featuresField = item.querySelector('[data-field="features"]');
      if (featuresField && content.pricing.plans[i]) {
        content.pricing.plans[i].features = featuresField.value
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean);
      }
    });
  }

  // ---- Special handling for footer links (pipe-separated) ----
  function processFooterLinks() {
    const colsContainer = document.querySelector('[data-array-path="footer.columns"]');
    if (!colsContainer) return;

    colsContainer.querySelectorAll(".array-item").forEach((item, i) => {
      const linksField = item.querySelector('[data-field="links"]');
      if (linksField && content.footer.columns[i]) {
        content.footer.columns[i].links = linksField.value
          .split("\n")
          .map((line) => {
            const [label, href] = line.split("|").map((s) => s.trim());
            return label ? { label, href: href || "#" } : null;
          })
          .filter(Boolean);
      }
    });
  }

  // ---- Save ----
  function save() {
    collectData();
    processPricingFeatures();
    processFooterLinks();
    ContentManager.saveContent(content);
    toast("Changes saved successfully!");
  }

  // ---- Reset ----
  function reset() {
    if (confirm("Are you sure you want to reset all content to defaults? This cannot be undone.")) {
      ContentManager.resetContent();
      content = ContentManager.getContent();
      renderEditor();
      toast("Content reset to defaults", "success");
    }
  }

  // ---- CMS Auth ----
  const CMS_SESSION_KEY = "nexora_cms_session";
  const CMS_CREDENTIALS = {
    admin: "admin123",
    editor: "editor123",
  };

  function isCmsLoggedIn() {
    return !!localStorage.getItem(CMS_SESSION_KEY);
  }

  function cmsLogin(username) {
    localStorage.setItem(CMS_SESSION_KEY, JSON.stringify({ user: username, ts: Date.now() }));
  }

  function showCmsApp() {
    document.getElementById("cmsLogin").style.display = "none";
    document.getElementById("cmsLayout").style.display = "";
  }

  function showCmsLogin() {
    document.getElementById("cmsLogin").style.display = "";
    document.getElementById("cmsLayout").style.display = "none";
  }

  function initCmsLogin() {
    const form = document.getElementById("cmsLoginForm");
    const error = document.getElementById("cmsLoginError");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("cmsLoginUser").value.trim().toLowerCase();
        const pass = document.getElementById("cmsLoginPass").value;

        if (CMS_CREDENTIALS[user] && CMS_CREDENTIALS[user] === pass) {
          error.classList.remove("show");
          cmsLogin(user);
          showCmsApp();
        } else {
          error.classList.add("show");
          document.getElementById("cmsLoginPass").value = "";
        }
      });
    }
  }

  // ---- Init ----
  document.addEventListener("DOMContentLoaded", () => {
    initCmsLogin();

    if (isCmsLoggedIn()) {
      showCmsApp();
    } else {
      showCmsLogin();
    }

    initSidebar();
    renderEditor();

    document.getElementById("saveBtn").addEventListener("click", save);
    document.getElementById("resetBtn").addEventListener("click", reset);
    document.getElementById("previewBtn").addEventListener("click", () => {
      save();
      window.open("/", "_blank");
    });
  });
})();
