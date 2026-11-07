// Run before styles load to avoid a flash of the wrong theme. No inline script/CSP exception.
(() => {
  let theme;
  try { theme = localStorage.getItem('raahsta-theme'); } catch { /* Storage can be unavailable. */ }
  if (!['light', 'dark'].includes(theme)) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
