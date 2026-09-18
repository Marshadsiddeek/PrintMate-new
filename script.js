/*
  PrintMate website JavaScript
  ---------------------------------------------
  EASY IMAGE MANAGEMENT:
  1) Upload a new image into: assets/images/
  2) Add one object to PORTFOLIO_ITEMS below.
  3) Save/upload script.js. No portfolio HTML editing is required.

  IMPORTANT:
  A normal static website cannot permanently upload new files to the web server
  from the browser using JavaScript alone. For an admin upload button that saves
  images permanently, you need a backend/CMS (or a service such as Firebase/Supabase).
*/

const SITE_CONFIG = {
  whatsappNumber: '94714757323',
  initialPortfolioCount: 8
};

const PORTFOLIO_ITEMS = [
  { src: 'assets/images/p (1).jpg', title: 'Custom Mug & Gift Packaging', category: 'gifts' },
  { src: 'assets/images/p (2).jpg', title: 'Branded Envelopes & Labels', category: 'business' },
  { src: 'assets/images/p (3).jpg', title: 'Premium Acrylic Signage', category: 'signage' },
  { src: 'assets/images/p (4).jpg', title: 'Appreciation Photo Frames', category: 'gifts' },
  { src: 'assets/images/p (5).jpg', title: 'Custom Business Cards', category: 'business' },
  { src: 'assets/images/p (6).jpg', title: 'Personalized Pen Printing', category: 'business' },
  { src: 'assets/images/p (7).jpg', title: 'Custom Presentation Packaging', category: 'gifts' },
  { src: 'assets/images/p (8).jpg', title: 'Large Format Parking Sign', category: 'signage' },
  { src: 'assets/images/p (9).jpg', title: 'Custom Souvenir Keytag', category: 'gifts' },
  { src: 'assets/images/p (10).jpg', title: 'Event / Religious Cards', category: 'prints' },
  { src: 'assets/images/p (11).jpg', title: 'Branded Acrylic Keychains', category: 'gifts' },
  { src: 'assets/images/p (12).jpg', title: 'Customized Mug Printing', category: 'gifts' },
  { src: 'assets/images/p (13).jpg', title: 'Vehicle / Freight Signage', category: 'signage' }
];

const CATEGORY_LABELS = {
  all: 'All Work',
  business: 'Business',
  gifts: 'Custom Gifts',
  signage: 'Signage',
  prints: 'Prints'
};

let activeCategory = 'all';
let showAllPortfolio = false;
let visibleLightboxItems = [];
let lightboxIndex = 0;

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function renderFilters() {
  const host = qs('#portfolioFilters');
  if (!host) return;

  const categories = ['all', ...new Set(PORTFOLIO_ITEMS.map(item => item.category))];
  host.innerHTML = categories.map(category => `
    <button type="button"
      class="filter-btn ${category === activeCategory ? 'active' : ''} px-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-gray-600 text-xs font-semibold transition"
      data-category="${category}">
      ${CATEGORY_LABELS[category] || category}
    </button>
  `).join('');

  qsa('.filter-btn', host).forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      showAllPortfolio = false;
      renderFilters();
      renderPortfolio();
    });
  });
}

function filteredItems() {
  return activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);
}

function renderPortfolio() {
  const grid = qs('#portfolioGrid');
  const showMoreBtn = qs('#showMoreBtn');
  if (!grid || !showMoreBtn) return;

  const allFiltered = filteredItems();
  const itemsToRender = showAllPortfolio
    ? allFiltered
    : allFiltered.slice(0, SITE_CONFIG.initialPortfolioCount);

  visibleLightboxItems = itemsToRender;

  grid.innerHTML = itemsToRender.map((item, index) => `
    <article class="portfolio-card reveal visible" data-index="${index}">
      <button type="button" class="block w-full text-left portfolio-open" data-index="${index}" aria-label="Open ${item.title}">
        <div class="portfolio-image-wrap">
          <img src="${item.src}" alt="${item.title}" loading="lazy" class="portfolio-image" />
          <div class="portfolio-overlay">
            <span class="w-12 h-12 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow-xl"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
          </div>
        </div>
        <div class="p-4">
          <p class="font-bold text-sm text-neutral-900">${item.title}</p>
          <p class="text-xs text-gray-400 mt-1">${CATEGORY_LABELS[item.category] || item.category}</p>
        </div>
      </button>
    </article>
  `).join('');

  qsa('.portfolio-open', grid).forEach(button => {
    button.addEventListener('click', () => openLightbox(Number(button.dataset.index)));
  });

  if (allFiltered.length > SITE_CONFIG.initialPortfolioCount) {
    showMoreBtn.classList.remove('hidden');
    showMoreBtn.textContent = showAllPortfolio ? 'Show less' : `Show more work (${allFiltered.length - SITE_CONFIG.initialPortfolioCount})`;
  } else {
    showMoreBtn.classList.add('hidden');
  }
}

function openLightbox(index) {
  const lightbox = qs('#lightbox');
  if (!lightbox || !visibleLightboxItems.length) return;

  lightboxIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = qs('#lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function moveLightbox(direction) {
  if (!visibleLightboxItems.length) return;
  lightboxIndex = (lightboxIndex + direction + visibleLightboxItems.length) % visibleLightboxItems.length;
  updateLightbox();
}

function updateLightbox() {
  const item = visibleLightboxItems[lightboxIndex];
  if (!item) return;
  const image = qs('#lightboxImage');
  const caption = qs('#lightboxCaption');
  image.src = item.src;
  image.alt = item.title;
  caption.textContent = item.title;
}

function setupMobileMenu() {
  const button = qs('#menuBtn');
  const menu = qs('#mobileMenu');
  if (!button || !menu) return;

  button.addEventListener('click', () => {
    const opening = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    button.setAttribute('aria-expanded', String(opening));
    button.innerHTML = opening ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  qsa('.mobile-link', menu).forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

function setupRevealAnimations() {
  const items = qsa('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

  items.forEach(item => observer.observe(item));
}

function setupHeader() {
  const header = qs('#siteHeader');
  if (!header) return;
  const apply = () => {
    header.classList.toggle('shadow-md', window.scrollY > 20);
  };
  apply();
  window.addEventListener('scroll', apply, { passive: true });
}

function setupQuoteForm() {
  const form = qs('#quoteForm');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = qs('#quoteName')?.value.trim() || 'Customer';
    const service = qs('#quoteService')?.value || 'Printing';
    const qty = qs('#quoteQty')?.value.trim() || 'Not specified';

    const message = `Hello PrintMate, I would like a quotation.\n\nName: ${name}\nService: ${service}\nQuantity / size: ${qty}`;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

function setupLightboxEvents() {
  qs('#lightboxClose')?.addEventListener('click', closeLightbox);
  qs('#lightboxPrev')?.addEventListener('click', () => moveLightbox(-1));
  qs('#lightboxNext')?.addEventListener('click', () => moveLightbox(1));

  qs('#lightbox')?.addEventListener('click', event => {
    if (event.target.id === 'lightbox') closeLightbox();
  });

  document.addEventListener('keydown', event => {
    const open = qs('#lightbox')?.classList.contains('open');
    if (!open) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });
}

function setupShowMore() {
  qs('#showMoreBtn')?.addEventListener('click', () => {
    showAllPortfolio = !showAllPortfolio;
    renderPortfolio();
    if (!showAllPortfolio) qs('#works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function init() {
  qs('#year').textContent = new Date().getFullYear();
  renderFilters();
  renderPortfolio();
  setupMobileMenu();
  setupRevealAnimations();
  setupHeader();
  setupQuoteForm();
  setupLightboxEvents();
  setupShowMore();
}

document.addEventListener('DOMContentLoaded', init);
