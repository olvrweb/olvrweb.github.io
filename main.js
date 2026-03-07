// PROGRESS BAR
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// CURSOR
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('grow'); cursorRing.classList.add('grow'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('grow'); cursorRing.classList.remove('grow'); });
});

// NAV
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('hidden',   y > lastY && y > 80);
  nav.classList.toggle('scrolled', y > 20);
  lastY = y;
}, { passive: true });

// HERO PARALLAX
const heroContent = document.getElementById('hero-content');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroContent.style.transform = `translateY(${y * 0.25}px)`;
    heroContent.style.opacity = String(1 - (y / window.innerHeight) * 1.4);
  }
}, { passive: true });

// HERO NAME ANIMATION
function animateHandle() {
  const el = document.getElementById('handle');
  const chars = el.textContent.split('');
  el.textContent = '';
  chars.forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch;
    s.style.animationDelay = (0.1 + i * 0.065) + 's';
    el.appendChild(s);
  });
}

// TYPEWRITER
function typewriter(el, text, speed, startDelay) {
  const cur = el.querySelector('.tw-cursor');
  let i = 0;
  setTimeout(() => {
    const t = setInterval(() => {
      if (i < text.length) {
        cur.insertAdjacentText('beforebegin', text[i++]);
      } else {
        clearInterval(t);
        setTimeout(() => cur.style.display = 'none', 2400);
      }
    }, speed);
  }, startDelay);
}

// PROJECT COUNT
document.getElementById('meta-count').textContent =
  projects.length + ' project' + (projects.length !== 1 ? 's' : '');

// RENDER CARDS
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!projects.length) {
    grid.innerHTML = '<p style="color:var(--muted);font-weight:300;padding:2rem 0">No projects yet — add some in projects.js</p>';
    return;
  }
  projects.forEach((p, idx) => {
    const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

    // github icon always shows if there's a repo
    const ghLink = p.github
      ? `<a href="${p.github}" target="_blank" class="card-link" title="GitHub"><i data-lucide="github"></i></a>`
      : '';

    // arrow always shows — links to live if available, otherwise falls back to github
    const arrowHref  = p.live || p.github || '#';
    const arrowTitle = p.live ? 'Live Demo' : 'GitHub';
    const arrowLink  = `<a href="${arrowHref}" target="_blank" class="card-link" title="${arrowTitle}"><i data-lucide="arrow-up-right"></i></a>`;

    const card = document.createElement('article');
    card.className = 'project-card';
    card.style.setProperty('--i', idx);
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon"><i data-lucide="folder"></i></div>
        <div class="card-actions">${ghLink}${arrowLink}</div>
      </div>
      <h3 class="card-title">${p.name}</h3>
      <p class="card-desc">${p.description}</p>
      <div class="card-tags">${tags}</div>`;
    grid.appendChild(card);
  });
  lucide.createIcons();
}

// SCROLL REVEAL
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.project-card').forEach(c => obs.observe(c));
}

// INIT
animateHandle();
renderProjects();
initScrollReveal();
typewriter(document.getElementById('hero-sub'), 'building things, one project at a time.', 48, 900);
