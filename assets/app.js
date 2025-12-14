const $ = (q) => document.querySelector(q);

const I18N = {
    nl: {
        tagline: "Software Development • HvA",
        ctaContact: "Contact",
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
        navExperience: "Ervaring",
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
        expTitle: "Opleiding & Ervaring",
        expSub: "Kort overzicht (pas dit gerust aan).",
        projectsTitle: "Projecten",
        projectsSub: "Projecten worden geladen uit data/projects.json.",
        contactTitle: "Contact",
        contactBody: "Stuur me een bericht via e-mail of LinkedIn. (GitHub Pages is statisch, dus geen “echte” backend form.)",
        contactEmail: "Mail",
        contactHint: "Wil je wél een contactformulier? Gebruik dan Formspree / Getform (werkt prima met Pages).",
        footerTitle: "Portfolio",
        footerBody: "Gemaakt voor GitHub Pages — snel, simpel, uitbreidbaar.",
        eduTitle: "Opleiding",
        eduSub: "Mijn opleidingen en certificering.",
        workTitle: "Ervaring",
        workSub: "Werkervaring en stages."

    },
    en: {
        tagline: "Software Development • AUAS",
        ctaContact: "Contact",
        pill: "Open to internships / projects",
        heroHi: "Hi, I'm",
        heroLead: "Software Development (Associate degree) at the Amsterdam University of Applied Sciences. I like building practical solutions with Python and web tech.",
        ctaProjects: "See projects",
        ctaCopyEmail: "Copy email",
        statYears: "years experience (approx.)",
        statFocus: "focus",
        statLang: "language",
        quickTitle: "Quick links",
        navAbout: "About",
        navSkills: "Skills",
        navExperience: "Experience",
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
        expTitle: "Education & Experience",
        expSub: "Short overview (edit freely).",
        projectsTitle: "Projects",
        projectsSub: "Projects are loaded from data/projects.json.",
        contactTitle: "Contact",
        contactBody: "Reach out via email or LinkedIn. (GitHub Pages is static, so no real backend form.)",
        contactEmail: "Email",
        contactHint: "Want a form anyway? Use Formspree / Getform (works great with Pages).",
        footerTitle: "Portfolio",
        footerBody: "Built for GitHub Pages — fast, simple, extensible.",
        eduTitle: "Education",
        eduSub: "My education and certifications.",
        workTitle: "Experience",
        workSub: "Work experience and internships."

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
    // CV: "sinds mijn 14e programmeer ik" — geboortedatum 2002 -> 14e rond 2016
    // We maken dit bewust "±" en dynamisch.
    const startYear = 2016;
    const now = new Date().getFullYear();
    return Math.max(0, now - startYear);
}

async function loadData() {
    const profile = await fetch("data/profile.json").then(r => r.json());
    const projects = await fetch("data/projects.json").then(r => r.json());

    // Links
    const links = $("#links");
    links.innerHTML = "";
    links.appendChild(linkItem("Email", `mailto:${profile.email}`, profile.email));
    links.appendChild(linkItem("LinkedIn", profile.linkedin, "Open"));
    // GitHub: voeg later toe in profile.json als je wil
    // links.appendChild(linkItem("GitHub", profile.github, "Open"));

    // Contact
    $("#emailLink").href = `mailto:${profile.email}`;
    $("#linkedinLink").href = profile.linkedin;

    // About — education line
    const lang = localStorage.getItem("lang") || "nl";
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
        flat.forEach(({ cat, s }) => {
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

    // Timeline
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

    // ... in loadData(), nadat je `lang` hebt:
    renderTimeline(profile.education, "#educationTimeline", lang);
    renderTimeline(profile.experience, "#workTimeline", lang);


    // Projects with filters
    const projectFilters = $("#projectFilters");
    const grid = $("#projectsGrid");
    const tags = new Set();
    projects.forEach(p => (p.tags || []).forEach(t => tags.add(t)));
    const tagList = ["All", ...Array.from(tags).sort()];
    let activeTag = "All";

    const renderProjects = () => {
        grid.innerHTML = "";
        const filtered = projects.filter(p => activeTag === "All" || (p.tags || []).includes(activeTag));
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

    // Email copy
    $("#copyEmailBtn").onclick = async () => {
        await navigator.clipboard.writeText(profile.email);
        $("#copyEmailBtn").textContent = (lang === "nl") ? "Gekopieerd ✅" : "Copied ✅";
        setTimeout(() => setLang(localStorage.getItem("lang") || "nl"), 900);
    };
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
    if (p.links?.repo) links.push(`<a href="${p.links.repo}" target="_blank" rel="noreferrer">Repo</a>`);
    if (p.links?.demo) links.push(`<a href="${p.links.demo}" target="_blank" rel="noreferrer">Live</a>`);
    el.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <div class="tags">${tags}</div>
    <div class="row">${links.join("")}</div>
  `;
    return el;
}

// Theme + Lang init
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
        await loadData(); // rerender with chosen language
    };

    $("#year").textContent = new Date().getFullYear();
    $("#yearsCoding").textContent = yearsCodingApprox();

    // Basic SW for offline (optional)
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("assets/sw.js").catch(() => { });
    }

    loadData();
})();
