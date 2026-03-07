# Oliver LeBlanc — Portfolio

A clean, minimal portfolio page to showcase all my projects.

---

## How to Add or Edit Projects

Open **`projects.js`** — that's the only file you need to touch.

Each project looks like this:

```js
{
  name: "My Project",
  description: "What it does and why it's cool.",
  tags: ["JavaScript", "CSS"],
  github: "https://github.com/yourusername/my-project",
  live: "https://my-project.com",   // leave as "" if no live link
},
```

Copy that block, fill it in, and save. That's it.

---

## Repo Structure

```
portfolio/
├── index.html       ← page structure (rarely needs editing)
├── style.css        ← all visual styles
├── projects.js      ← ✏️  YOUR projects live here — edit this
├── main.js          ← renders the cards automatically
└── README.md        ← you are here
```

---

## Deployment

Push to GitHub, then enable **GitHub Pages** under  
`Settings → Pages → Source: main / root`  
Your site will be live at `https://yourusername.github.io/portfolio`.
