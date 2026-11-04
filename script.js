document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

// Výška služeb se počítá ze skutečné výšky záhlaví, včetně načtených písem.
const services = document.getElementById('sluzby');
if (services) {
  const header = document.querySelector('.site-header');
  const updateHeaderHeight = () => {
    services.style.setProperty('--services-header-height', `${header.getBoundingClientRect().height}px`);
  };
  updateHeaderHeight();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateHeaderHeight).observe(header);
  } else {
    window.addEventListener('resize', updateHeaderHeight);
  }
  document.fonts.ready.then(updateHeaderHeight);
}
