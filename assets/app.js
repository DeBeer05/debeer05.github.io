const $ = (q) => document.querySelector(q);

const I18N = {
    nl: {
        tagline: "Software Development • HvA",
        ctaContact: "Contact",
        ctaCV: "Download CV",
        pill: "Open voor stage / projecten",
        heroHi: "Hi, ik ben",
        heroLead: "HBO Software Development (Associate degree) aan de Hogeschool van Amsterdam. Ik bouw graag slimme, praktische oplossingen met Python en webtechnologie.",
        ctaProjects: "Bekijk projecten",
        ctaCopyEmail: "Kopieer e-mail",
        statYears: "jaar ervaring (±)",
        statFocus: "focus",
        statLang: "taal",
        quickTitle: "Snelkoppelingen",
        navAbout: "Over mij",
        navSkills: "Skills",
        navExperience: "Opleiding & Ervaring",
        navProjects: "Projecten",
        nowTitle: "Nu",
        nowText: "Student Software Development (HvA) — bouwend aan projecten en portfolio.",
        aboutTitle: "Over mij",
        aboutBody: "Ik werk al lang met computers en vind het leuk om praktische oplossingen te bouwen. Ik ben leergierig, plan mijn werk graag strak, en werk fijn in een team waar feedback normaal is.",
        aboutEdu: "Opleiding",
        aboutRole: "Richting",
        aboutRoleValue: "Software Development",
        aboutLocation: "Locatie",
        linksTitle: "Links",
        linksHint: "Voeg GitHub toe zodra je repo’s publiek staan.",
        skillsTitle: "Skills",
        skillsSub: "Selecteer een categorie om te filteren.",
        eduTitle: "Opleiding",
        eduSub: "Mijn opleidingen en certificering.",
        workTitle: "Ervaring",
        workSub: "Werkervaring en stages.",
        projectsTitle: "Projecten",
        projectsSub: "Projecten worden geladen uit data/projects.json.",
        contactTitle: "Contact",
        contactBody: "Stuur me een bericht via e-mail of LinkedIn. (GitHub Pages is statisch, dus geen “echte” backend form.)",
        contactEmail: "Mail",
        contactHint: "Wil je een formulier? Gebruik Formspree / Getform.",
        footerTitle: "Portfolio",
        footerBody: "Gemaakt voor GitHub Pages — snel, simpel, uitbreidbaar.",
        githubTitle: "Featured GitHub",
        githubSub: "Laatste projecten en activiteit (automatisch geladen).",
        detailStack: "Tech stack",
        detailLearn: "Wat ik heb geleerd",
        detailLinks: "Links"
    },
    en: {
        tagline: "Software Development • AUAS",
        ctaContact: "Contact",
        ctaCV: "Download CV",
        pill: "Open to internships / projects",
        heroHi: "Hi, I'm",
        heroLead: "Software Development (Associate degree) at AUAS. I like building practical solutions with Python and web tech.",
        ctaProjects: "See projects",
        ctaCopyEmail: "Copy email",
        statYears: "years experience (approx.)",
        statFocus: "focus",
        statLang: "language",
        quickTitle: "Quick links",
        navAbout: "About",
        navSkills: "Skills",
        navExperience: "Education & Experience",
        navProjects: "Projects",
        nowTitle: "Now",
        nowText: "Software Development student — building projects and this portfolio.",
        aboutTitle: "About",
        aboutBody: "I've been into computers for a long time and enjoy building practical solutions. I'm curious, I plan my work well, and I like team environments where feedback is normal.",
        aboutEdu: "Education",
        aboutRole: "Direction",
        aboutRoleValue: "Software Development",
        aboutLocation: "Location",
        linksTitle: "Links",
        linksHint: "Add GitHub once your repos are public.",
        skillsTitle: "Skills",
        skillsSub: "Select a category to filter.",
        eduTitle: "Education",
        eduSub: "My education and certifications.",
        workTitle: "Experience",
        workSub: "Work experience and internships.",
        projectsTitle: "Projects",
        projectsSub: "Projects are loaded from data/projects.json.",
        contactTitle: "Contact",
        contactBody: "Reach out via email or LinkedIn. (GitHub Pages is static, so no real backend form.)",
        contactEmail: "Email",
        contactHint: "Want a form anyway? Use Formspree / Getform.",
        footerTitle: "Portfolio",
        footerBody: "Built for GitHub Pages — fast, simple, extensible.",
        githubTitle: "Featured GitHub",
        githubSub: "Latest work and activity (auto-loaded).",
        detailStack: "Tech stack",
        detailLearn: "What I learned",
        detailLinks: "Links"
    }
};

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

function setLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = I18N[lang][key] ?? el.textContent;
    });
}

function yearsCodingApprox() {
    const startYear = 2016; // ± since 14
    const now = new Date().getFullYear();
    return Math.max(0, now - startYear);
}

function linkItem(label, href, rightText) {
    const a = document.createElement("a");
    a.className = "link";
    a.href = href;
    a.target = href.startsWith("http") ? "_blank" : "_self";
    a.rel = "noreferrer";
    a.innerHTML = `<strong>${label}</strong><span>${rightText}</span>`;
    return a;
}

function projectCard(p) {
    const el = document.createElement("article");
    el.className = "project";

    const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
    const links = [];

    // internal detail route
    links.push(`<a href="#/project/${encodeURIComponent(p.slug)}">Details</a>`);

    if (p.links?.repo) links.push(`<a href="${p.links.repo}" target="_blank" rel="noreferrer">Repo</a>`);
    if (p.links?.demo) links.push(`<a href="${p.links.demo}" target="_blank" rel="noreferrer">Live</a>`);

    el.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <div class="tags">${tags}</div>
    <div class="row">${links.join(" ")}</div>
  `;
    return el;
}

function repoCard(r) {
    const el = document.createElement("article");
    el.className = "project";
    const desc = r.description ? r.description : "—";
    el.innerHTML = `
    <h3>${r.name}</h3>
    <p>${desc}</p>
    <div class="repo-meta">
      <span class="kpi">★ ${r.stargazers_count}</span>
      <span class="kpi">⑂ ${r.forks_count}</span>
      <span class="kpi">Updated: ${new Date(r.pushed_at).toISOString().slice(0, 10)}</span>
    </div>
    <div class="row">
      <a href="${r.html_url}" target="_blank" rel="noreferrer">Open repo</a>
      ${r.homepage ? `<a href="${r.homepage}" target="_blank" rel="noreferrer">Homepage</a>` : ""}
    </div>
  `;
    return el;
}

function renderTimeline(list, targetId, lang) {
    const el = document.querySelector(targetId);
    if (!el) return;
    el.innerHTML = "";
    (list || []).forEach(item => {
        const li = document.createElement("li");
        li.className = "t-item";
        li.innerHTML = `
      <div class="t-top">
        <div class="t-title">${lang === "nl" ? item.title_nl : item.title_en}</div>
        <div class="t-meta">${lang === "nl" ? item.meta_nl : item.meta_en}</div>
      </div>
      <div class="t-body">${lang === "nl" ? item.body_nl : item.body_en}</div>
    `;
        el.appendChild(li);
    });
}

function showSection(id, show) {
    const el = document.querySelector(id);
    if (!el) return;
    el.style.display = show ? "" : "none";
}

function renderProjectDetail(project, lang) {
    $("#projectDetailContent").innerHTML = `
    <h2 class="detail-title">${project.title}</h2>
    <p class="detail-desc">${project.longDescription || project.description || ""}</p>

    <div class="detail-grid">
      <div class="detail-box">
        <h3>${I18N[lang].detailLearn}</h3>
        <ul class="ul">
          ${(project.learnings || []).map(x => `<li>${x}</li>`).join("") || "<li>—</li>"}
        </ul>
      </div>

      <div class="detail-box">
        <h3>${I18N[lang].detailStack}</h3>
        <div class="chips">
          ${(project.stack || []).map(s => `<span class="chip-skill">${s}</span>`).join("") || "<span class='chip-skill'>—</span>"}
        </div>

        <div class="divider"></div>

        <h3>${I18N[lang].detailLinks}</h3>
        <div class="row">
          ${project.links?.repo ? `<a href="${project.links.repo}" target="_blank" rel="noreferrer">Repo</a>` : ""}
          ${project.links?.demo ? `<a href="${project.links.demo}" target="_blank" rel="noreferrer">Live</a>` : ""}
        </div>
      </div>
    </div>
  `;
}

async function fetchGithubFeatured(profile) {
    const owner = "DeBeer05";
    const grid = $("#githubGrid");
    if (!grid) return;

    // Cache 10 min
    const cacheKey = "gh_featured_cache_v1";
    const cachedRaw = localStorage.getItem(cacheKey);
    if (cachedRaw) {
        try {
            const cached = JSON.parse(cachedRaw);
            if (Date.now() - cached.ts < 10 * 60 * 1000 && Array.isArray(cached.data)) {
                grid.innerHTML = "";
                cached.data.forEach(r => grid.appendChild(repoCard(r)));
                return;
            }
        } catch { }
    }

    // Load selected repos if provided; otherwise fallback to latest updated
    try {
        let repos = [];
        if (Array.isArray(profile.featuredRepos) && profile.featuredRepos.length > 0) {
            const reqs = profile.featuredRepos.map(name =>
                fetch(`https://api.github.com/repos/${owner}/${name}`).then(r => r.ok ? r.json() : null)
            );
            const res = await Promise.all(reqs);
            repos = res.filter(Boolean);
        } else {
            const all = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=pushed`).then(r => r.json());
            repos = (Array.isArray(all) ? all : []).slice(0, 6);
        }

        // Render
        grid.innerHTML = "";
        repos.forEach(r => grid.appendChild(repoCard(r)));

        localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: repos }));
    } catch (e) {
        grid.innerHTML = "<p class='muted'>GitHub kon niet laden (rate limit of offline).</p>";
    }
}

let STATE = { profile: null, projects: null };

async function loadData() {
    const profile = await fetch("data/profile.json").then(r => r.json());
    const projects = await fetch("data/projects.json").then(r => r.json());

    STATE.profile = profile;
    STATE.projects = projects;

    const lang = localStorage.getItem("lang") || "nl";

    // Links
    const links = $("#links");
    links.innerHTML = "";
    links.appendChild(linkItem("Email", `mailto:${profile.email}`, profile.email));
    links.appendChild(linkItem("LinkedIn", profile.linkedin, "Open"));
    if (profile.github) links.appendChild(linkItem("GitHub", profile.github, "Open"));

    // Contact
    $("#emailLink").href = `mailto:${profile.email}`;
    $("#linkedinLink").href = profile.linkedin;

    // About education line
    $("#eduLine").textContent = lang === "nl" ? profile.educationLine_nl : profile.educationLine_en;

    // Now badges
    const nb = $("#nowBadges");
    nb.innerHTML = "";
    (profile.nowBadges || []).forEach(t => {
        const b = document.createElement("span");
        b.className = "badge";
        b.textContent = t;
        nb.appendChild(b);
    });

    // Skills
    const allSkillCats = Object.keys(profile.skills || {});
    const skillsChips = $("#skillsChips");
    const skillFilters = $("#skillFilters");
    let activeSkillCat = "All";

    const renderSkills = () => {
        skillsChips.innerHTML = "";
        const flat = [];
        if (activeSkillCat === "All") {
            allSkillCats.forEach(cat => (profile.skills[cat] || []).forEach(s => flat.push({ cat, s })));
        } else {
            (profile.skills[activeSkillCat] || []).forEach(s => flat.push({ cat: activeSkillCat, s }));
        }
        flat.forEach(({ s }) => {
            const el = document.createElement("span");
            el.className = "chip-skill";
            el.textContent = s;
            skillsChips.appendChild(el);
        });
    };

    skillFilters.innerHTML = "";
    ["All", ...allSkillCats].forEach(cat => {
        const b = document.createElement("button");
        b.className = "filter" + (cat === "All" ? " active" : "");
        b.type = "button";
        b.textContent = cat;
        b.onclick = () => {
            activeSkillCat = cat;
            skillFilters.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
            b.classList.add("active");
            renderSkills();
        };
        skillFilters.appendChild(b);
    });
    renderSkills();

    // Education + Experience
    renderTimeline(profile.education, "#educationTimeline", lang);
    renderTimeline(profile.experience, "#workTimeline", lang);

    // Projects with filters
    const projectFilters = $("#projectFilters");
    const grid = $("#projectsGrid");
    const tags = new Set();
    (projects || []).forEach(p => (p.tags || []).forEach(t => tags.add(t)));
    const tagList = ["All", ...Array.from(tags).sort()];
    let activeTag = "All";

    const renderProjects = () => {
        grid.innerHTML = "";
        const filtered = (projects || []).filter(p => activeTag === "All" || (p.tags || []).includes(activeTag));
        filtered.forEach(p => grid.appendChild(projectCard(p)));
    };

    projectFilters.innerHTML = "";
    tagList.forEach(tag => {
        const b = document.createElement("button");
        b.className = "filter" + (tag === "All" ? " active" : "");
        b.type = "button";
        b.textContent = tag;
        b.onclick = () => {
            activeTag = tag;
            projectFilters.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
            b.classList.add("active");
            renderProjects();
        };
        projectFilters.appendChild(b);
    });
    renderProjects();

    // GitHub featured
    fetchGithubFeatured(profile);

    // Email copy
    $("#copyEmailBtn").onclick = async () => {
        await navigator.clipboard.writeText(profile.email);
        const btn = $("#copyEmailBtn");
        btn.textContent = (lang === "nl") ? "Gekopieerd ✅" : "Copied ✅";
        setTimeout(() => setLang(localStorage.getItem("lang") || "nl"), 900);
    };

    // Router render after data loaded
    route();
}

function route() {
    const hash = location.hash || "#";
    const lang = localStorage.getItem("lang") || "nl";

    // Default: show normal sections
    showSection("#projects", true);
    showSection("#projectDetail", false);

    // detail route: #/project/<slug>
    if (hash.startsWith("#/project/")) {
        const slug = decodeURIComponent(hash.replace("#/project/", "").trim());
        const p = (STATE.projects || []).find(x => x.slug === slug);

        if (p) {
            showSection("#projects", false);
            showSection("#projectDetail", true);
            renderProjectDetail(p, lang);
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }
}

(function init() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    const savedLang = localStorage.getItem("lang") || "nl";
    setLang(savedLang);

    $("#themeBtn").onclick = () => {
        const cur = document.documentElement.getAttribute("data-theme") || "dark";
        setTheme(cur === "dark" ? "light" : "dark");
    };

    $("#langBtn").onclick = async () => {
        const cur = localStorage.getItem("lang") || "nl";
        const next = cur === "nl" ? "en" : "nl";
        setLang(next);
        await loadData();
    };

    $("#year").textContent = new Date().getFullYear();
    $("#yearsCoding").textContent = yearsCodingApprox();

    window.addEventListener("hashchange", route);

    // Optional service worker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("assets/sw.js").catch(() => { });
    }

    loadData();
})();
