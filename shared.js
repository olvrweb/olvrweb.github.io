// add this file to every page — it handles the favicon globally
const favicon = document.createElement('link');
favicon.rel  = 'icon';
favicon.type = 'image/webp';
favicon.href = 'favicon.png';
document.head.appendChild(favicon);
