document.documentElement.classList.add('js-ready');

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!nav || !toggle) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) closeMenu();
  });
}

const domainFilters = document.querySelectorAll('.filter-btn');
const categoryFilters = document.querySelectorAll('.category-btn');
const cards = document.querySelectorAll('.work-card');

function setActive(buttons, activeButton) {
  buttons.forEach(button => button.classList.toggle('active', button === activeButton));
}

function showCards(mode, value) {
  cards.forEach(card => {
    const domains = (card.dataset.domain || '').split(' ');
    const tags = (card.dataset.tags || '').split(' ');
    const visible = value === 'all' || (mode === 'domain' ? domains.includes(value) : tags.includes(value));
    card.classList.toggle('is-hidden', !visible);
  });
}

domainFilters.forEach(button => {
  button.addEventListener('click', () => {
    setActive(domainFilters, button);
    categoryFilters.forEach(item => item.classList.remove('active'));
    showCards('domain', button.dataset.filter);
  });
});

categoryFilters.forEach(button => {
  button.addEventListener('click', () => {
    setActive(categoryFilters, button);
    domainFilters.forEach(item => item.classList.remove('active'));
    if (button.dataset.filter === 'all') {
      domainFilters[0]?.classList.add('active');
    }
    showCards('category', button.dataset.filter);
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}