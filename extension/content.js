const SERVICES = [
  { id: "gh-sw-ingest", label: "Ingest", host: "gitingest.com" },
  { id: "gh-sw-diagram", label: "Diagram", host: "gitdiagram.com" },
];

const RESERVED = new Set([
  "settings", "orgs", "marketplace", "explore", "notifications", "issues",
  "pulls", "search", "login", "sponsors", "topics", "trending", "features",
  "about", "pricing", "new", "codespaces", "organizations", "users",
]);

function getRepo() {
  const [owner, repo] = location.pathname.split("/").filter(Boolean);
  if (!owner || !repo || RESERVED.has(owner)) return null;
  return { owner, repo };
}

function render() {
  const r = getRepo();
  const old = document.getElementById("gh-sw-box");
  if (!r) {
    old?.remove();
    return;
  }

  const base = `${r.owner}/${r.repo}`;
  if (old && old.dataset.repo === base) return;
  old?.remove();

  const box = document.createElement("div");
  box.id = "gh-sw-box";
  box.dataset.repo = base;
  for (const s of SERVICES) {
    const a = document.createElement("a");
    a.id = s.id;
    a.textContent = s.label;
    a.setAttribute("aria-label", `Открыть ${base} в ${s.label}`);
    a.href = `https://${s.host}/${base}`;
    a.target = "_blank";
    a.rel = "noopener";
    box.appendChild(a);
  }
  document.documentElement.appendChild(box);
}

render();
document.addEventListener("turbo:render", render);
document.addEventListener("turbo:load", render);
window.addEventListener("popstate", render);
new MutationObserver(render).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
