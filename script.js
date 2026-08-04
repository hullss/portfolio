const skills = [
  ["Java", "language", 4],
  ["Git", "workflow", 6],
  ["Spring Boot", "framework", 4],
  ["PostgreSQL / MySQL", "database", 3],
  ["REST APIs", "architecture", 5],
  ["Docker", "infrastructure", 4],
  ["Python", "language", 3],
  ["TypeScript", "language", 3],
  ["React", "framework", 2],
  ["FastAPI", "framework", 2],
  ["Automated testing", "testing", 2],
  ["JavaFX", "framework", 1]
];

const localeStrings = window.portfolioLocale || {
  categories: {},
  themeTarget: target => `Switch to ${target} theme`,
  projectNoun: count => count === 1 ? "project" : "projects",
  usedIn: count => `Used in ${count} featured ${count === 1 ? "project" : "projects"}`
};

const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

function applyTheme(theme, persist = false) {
  const isLight = theme === "light";
  const targetTheme = isLight ? "dark" : "light";
  const themeLabel = localeStrings.themeTarget(targetTheme);
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", themeLabel);
  themeToggle.title = themeLabel;
  themeColor.content = isLight ? "#F4F7F6" : "#0B1220";
  if (persist) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The theme still works when storage is unavailable.
    }
  }
}

applyTheme(document.documentElement.dataset.theme || (systemTheme.matches ? "light" : "dark"));
themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light", true);
});
systemTheme.addEventListener("change", event => {
  try {
    if (localStorage.getItem("portfolio-theme")) return;
  } catch {
    // Follow the system theme when storage is unavailable.
  }
  applyTheme(event.matches ? "light" : "dark");
});

const skillRows = document.querySelector("#skill-rows");
skills.forEach(([name, category, projectCount]) => {
  const row = document.createElement("div");
  row.className = "skill-row";
  row.setAttribute("role", "row");
  const dots = Array.from(
    { length: 6 },
    (_, index) => `<i class="${index < projectCount ? "used" : ""}" aria-hidden="true"></i>`
  ).join("");
  row.innerHTML = `
    <span class="skill-name" role="cell"><i class="pk">PK</i>${name}</span>
    <span class="skill-category" role="cell">${localeStrings.categories[category] || category}</span>
    <span class="usage-wrap" role="cell" aria-label="${localeStrings.usedIn(projectCount)}">
      <span class="usage-dots">${dots}</span><em>${projectCount} ${localeStrings.projectNoun(projectCount)}</em>
    </span>`;
  skillRows.append(row);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(item => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));

}

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("open", !open);
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("open");
}));

const backToTop = document.querySelector(".back-to-top");
backToTop.addEventListener("click", event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach(section => activeObserver.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();
