const profile = {
  researcherName: "Sushil-Poudel",
  thesisTitle: "Building a Real-World Data Mesh Contracts Platform in 4 Months",
  universityName: "Jaraco Data Engineering Thesis",
  supervisorName: "To be announced",
  email: "sushil_poudel@jaracoGmbH.onmicrosoft.com",
  repositoryUrl: "https://github.com/jaracogmbh/jaraco-data-mesh",
};

const thesisWindow = {
  start: new Date("2026-03-01T00:00:00"),
  end: new Date("2026-07-01T00:00:00"),
};

const milestones = [
  {
    title: "Month 1 | Foundation",
    summary: "Contracts API baseline, catalog flow, compose stack, and contract lifecycle ready.",
    start: new Date("2026-03-01T00:00:00"),
    end: new Date("2026-03-31T23:59:59"),
  },
  {
    title: "Month 2 | Integrations",
    summary: "Stateful producers (MediaWiki, Jira, Paperless) and richer schema payload semantics.",
    start: new Date("2026-04-01T00:00:00"),
    end: new Date("2026-04-30T23:59:59"),
  },
  {
    title: "Month 3 | Intelligence Layer",
    summary: "MCP resources/tools, agent context workflows, and stronger observability coverage.",
    start: new Date("2026-05-01T00:00:00"),
    end: new Date("2026-05-31T23:59:59"),
  },
  {
    title: "Month 4 | Hardening + Thesis",
    summary: "Performance checks, reliability polish, documentation, and public demonstration prep.",
    start: new Date("2026-06-01T00:00:00"),
    end: new Date("2026-07-01T00:00:00"),
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTimestamp(date) {
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function rangeLabel(start, end) {
  return `${formatDate(start)} - ${formatDate(end)}`;
}

function applyProfile() {
  const map = [
    ["researcherName", profile.researcherName],
    ["profileResearcher", profile.researcherName],
    ["thesisTitle", profile.thesisTitle],
    ["universityName", profile.universityName],
    ["supervisorName", profile.supervisorName],
  ];

  map.forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  });

  const repoLink = document.getElementById("repoLink");
  if (repoLink) repoLink.href = profile.repositoryUrl;

  const emailLink = document.getElementById("emailLink");
  if (emailLink) emailLink.href = `mailto:${profile.email}`;
}

function setLiveStamp() {
  const stamp = document.getElementById("liveStamp");
  if (stamp) stamp.textContent = formatTimestamp(new Date());
}

function renderMilestones() {
  const milestoneList = document.getElementById("milestoneList");
  if (!milestoneList) return;

  milestoneList.innerHTML = "";
  milestones.forEach((milestone) => {
    const card = document.createElement("article");
    card.className = "card tilt-card";

    const title = document.createElement("h4");
    title.textContent = milestone.title;

    const dates = document.createElement("p");
    dates.className = "timeline-date";
    dates.textContent = rangeLabel(milestone.start, milestone.end);

    const summary = document.createElement("p");
    summary.textContent = milestone.summary;

    card.appendChild(title);
    card.appendChild(dates);
    card.appendChild(summary);
    milestoneList.appendChild(card);
  });
}

function updateTimelineProgress() {
  const now = new Date();
  const total = thesisWindow.end.getTime() - thesisWindow.start.getTime();
  const elapsed = now.getTime() - thesisWindow.start.getTime();
  const percent = total > 0 ? clamp((elapsed / total) * 100, 0, 100) : 0;

  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const dateWindow = document.getElementById("dateWindow");
  const profileDuration = document.getElementById("profileDuration");
  const track = document.querySelector(".progress-track");

  if (progressBar) progressBar.style.width = `${percent.toFixed(1)}%`;
  if (progressText) progressText.textContent = `Progress: ${percent.toFixed(1)}%`;
  if (dateWindow) dateWindow.textContent = `Window: ${rangeLabel(thesisWindow.start, thesisWindow.end)}`;
  if (profileDuration) profileDuration.textContent = rangeLabel(thesisWindow.start, thesisWindow.end);
  if (track) track.setAttribute("aria-valuenow", percent.toFixed(1));
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-counter"));
    if (!Number.isFinite(target)) return;

    let current = 0;
    const durationMs = 900;
    const stepTime = 24;
    const steps = Math.ceil(durationMs / stepTime);
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = String(target);
        clearInterval(timer);
      } else {
        counter.textContent = String(Math.max(0, Math.floor(current)));
      }
    }, stepTime);
  });
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function bindScrollEffects() {
  const progress = document.getElementById("scrollProgress");
  const topbar = document.getElementById("topbar");

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = clamp((scrollTop / scrollable) * 100, 0, 100);

    if (progress) progress.style.width = `${pct.toFixed(2)}%`;
    if (topbar) topbar.classList.toggle("is-scrolled", scrollTop > 10);
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

function bindThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      btn.setAttribute("aria-label", "Switch to dark theme");
    } else {
      document.documentElement.removeAttribute("data-theme");
      btn.setAttribute("aria-label", "Switch to light theme");
    }
  }

  // Sync button state with whatever the inline script already set
  const initial = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  applyTheme(initial);

  btn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    // Only persist when the user explicitly picks dark; remove key to restore default (light)
    if (next === "dark") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
    applyTheme(next);
  });
}

function bindTiltCards() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  setLiveStamp();
  applyProfile();
  renderMilestones();
  updateTimelineProgress();
  animateCounters();
  revealOnScroll();
  bindScrollEffects();
  bindThemeToggle();
  bindTiltCards();
});
