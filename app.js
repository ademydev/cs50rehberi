(() => {
  "use strict";

  const nav = document.getElementById("nav");
  const sections = document.querySelectorAll(".section");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");
  const searchInput = document.getElementById("search");
  const themeToggle = document.getElementById("theme-toggle");
  const progressFill = document.getElementById("progress-fill");
  const weekChecklist = document.getElementById("week-checklist");

  const CONTENT_SECTIONS = [
    "about", "variants", "start",
    "week0", "week1", "week2", "week3", "week4", "week5",
    "week6", "week7", "week8", "week9", "week10",
    "psets", "algorithms", "datastructures", "memory", "tools", "web",
    "final", "tips", "community", "faq", "certificate"
  ];

  const WEEKS = [
    { id: "week0", label: "Week 0 — Scratch" },
    { id: "week1", label: "Week 1 — C" },
    { id: "week2", label: "Week 2 — Arrays" },
    { id: "week3", label: "Week 3 — Algorithms" },
    { id: "week4", label: "Week 4 — Memory" },
    { id: "week5", label: "Week 5 — Data Structures" },
    { id: "week6", label: "Week 6 — Python" },
    { id: "week7", label: "Week 7 — SQL" },
    { id: "week8", label: "Week 8 — Web" },
    { id: "week9", label: "Week 9 — Flask" },
    { id: "week10", label: "Week 10 — The End" }
  ];

  /* ── Navigation ── */
  function showSection(id) {
    sections.forEach((s) => s.classList.toggle("visible", s.id === id));
    nav.querySelectorAll("button[data-section]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.section === id);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    sidebar.classList.remove("open");
  }

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-section]");
    if (btn) showSection(btn.dataset.section);
  });

  document.getElementById("nav").parentElement
    .querySelector(".sidebar-footer button[data-section]")
    ?.addEventListener("click", () => showSection("all"));

  /* ── Mobile menu ── */
  menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) && e.target !== menuToggle) {
      sidebar.classList.remove("open");
    }
  });

  /* ── Show All ── */
  const allContent = document.getElementById("all-content");
  if (allContent) {
    CONTENT_SECTIONS.forEach((id) => {
      const source = document.getElementById(id);
      if (!source) return;
      const block = document.createElement("div");
      block.style.marginBottom = "3rem";
      block.innerHTML = source.innerHTML;
      allContent.appendChild(block);
    });
  }

  /* ── Dark mode ── */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    localStorage.setItem("cs50-theme", theme);
  }

  const savedTheme = localStorage.getItem("cs50-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  /* ── Progress tracker ── */
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem("cs50-progress") || "{}");
    } catch { return {}; }
  }

  function saveProgress(data) {
    localStorage.setItem("cs50-progress", JSON.stringify(data));
  }

  function updateProgressBar(progress) {
    const done = WEEKS.filter((w) => progress[w.id]).length;
    const pct = Math.round((done / WEEKS.length) * 100);
    progressFill.style.width = pct + "%";
  }

  if (weekChecklist) {
    const progress = loadProgress();
    WEEKS.forEach((week) => {
      const label = document.createElement("label");
      label.className = "week-check";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!progress[week.id];
      cb.addEventListener("change", () => {
        progress[week.id] = cb.checked;
        saveProgress(progress);
        updateProgressBar(progress);
      });
      label.appendChild(cb);
      label.appendChild(document.createTextNode(week.label));
      weekChecklist.appendChild(label);
    });
    updateProgressBar(progress);
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((el) => el.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* ── Search ── */
  let searchTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(searchInput.value.trim()), 200);
  });

  function performSearch(query) {
    document.querySelectorAll("mark").forEach((m) => {
      m.replaceWith(document.createTextNode(m.textContent));
    });

    if (!query || query.length < 2) return;

    const lower = query.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    CONTENT_SECTIONS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const text = section.textContent.toLowerCase();
      const title = section.querySelector("h2")?.textContent.toLowerCase() || "";
      let score = 0;

      if (title.includes(lower)) score += 10;
      const occurrences = text.split(lower).length - 1;
      score += occurrences;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = id;
      }
    });

    if (bestMatch && bestScore > 0) {
      showSection(bestMatch);
      highlightMatches(document.getElementById(bestMatch), query);
    }
  }

  function highlightMatches(container, query) {
    if (!container || !query) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    const re = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
    nodes.forEach((node) => {
      if (!re.test(node.textContent)) return;
      re.lastIndex = 0;
      const frag = document.createDocumentFragment();
      node.textContent.split(re).forEach((part, i) => {
        if (i % 2 === 1) {
          const mark = document.createElement("mark");
          mark.textContent = part;
          frag.appendChild(mark);
        } else if (part) {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  /* ── Keyboard shortcut ── */
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === "Escape") {
      searchInput.blur();
      sidebar.classList.remove("open");
    }
  });
})();
