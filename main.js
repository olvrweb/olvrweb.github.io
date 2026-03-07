// main.js — rendering logic, no need to edit this file

function renderProjects() {
  const grid = document.getElementById("projects-grid");

  if (!projects || projects.length === 0) {
    grid.innerHTML = '<p class="empty">No projects yet. Add some in projects.js!</p>';
    return;
  }

  projects.forEach((p) => {
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");

    const links = [
      p.github ? `<a href="${p.github}" target="_blank" class="card-link" title="GitHub Repo"><i data-lucide="github"></i></a>` : "",
      p.live   ? `<a href="${p.live}"   target="_blank" class="card-link" title="Live Demo"><i data-lucide="arrow-up-right"></i></a>` : "",
    ].join("");

    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon"><i data-lucide="folder-open"></i></div>
        <div class="card-actions">${links}</div>
      </div>
      <h3 class="card-title">${p.name}</h3>
      <p class="card-desc">${p.description}</p>
      <div class="card-tags">${tags}</div>
    `;

    grid.appendChild(card);
  });

  lucide.createIcons();
}

renderProjects();
