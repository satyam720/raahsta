export function initInterface() {
  const themeButton = document.querySelector('.theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let explicitTheme = false;
  try { explicitTheme = ['light', 'dark'].includes(localStorage.getItem('raahsta-theme')); } catch { /* Optional preference storage. */ }
  const updateThemeLabel = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton?.setAttribute('title', `Switch to ${dark ? 'light' : 'dark'} theme`);
  };
  updateThemeLabel();
  themeButton?.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    explicitTheme = true;
    try { localStorage.setItem('raahsta-theme', theme); } catch { /* Theme still works without storage. */ }
    updateThemeLabel();
  });
  media.addEventListener('change', event => {
    if (!explicitTheme) {
      document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
      updateThemeLabel();
    }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-navigation');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    navigation?.classList.remove('is-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation?.classList.toggle('is-open', open);
  });
  navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });

  const filters = document.getElementById('tour-filters');
  if (!filters) return;
  const search = document.getElementById('tour-search');
  const difficulty = document.getElementById('tour-difficulty');
  const duration = document.getElementById('tour-duration');
  const cards = [...document.querySelectorAll('.card[data-tour-search]')];
  const applyFilters = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const card of cards) {
      const days = Number(card.dataset.duration);
      const matches = card.dataset.tourSearch.toLowerCase().includes(query)
        && (difficulty.value === 'all' || card.dataset.difficulty === difficulty.value)
        && (duration.value === 'all' || (duration.value === 'short' ? days <= 7 : days > 7));
      card.hidden = !matches;
      if (matches) visible++;
    }
    document.getElementById('tour-count').textContent = `${visible} ${visible === 1 ? 'adventure' : 'adventures'} to discover`;
    document.getElementById('filter-empty').hidden = visible > 0;
  };
  filters.addEventListener('submit', event => { event.preventDefault(); applyFilters(); });
  search.addEventListener('input', applyFilters);
  difficulty.addEventListener('change', applyFilters);
  duration.addEventListener('change', applyFilters);
  document.querySelectorAll('.reset-filters').forEach(button => button.addEventListener('click', () => {
    filters.reset();
    applyFilters();
  }));
}
