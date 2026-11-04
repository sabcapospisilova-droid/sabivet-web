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
  const sections = [...services.querySelectorAll('.service-row')];
  const dots = document.querySelector('.section-dots');
  const dotLinks = dots ? [...dots.querySelectorAll('a')] : [];
  const root = document.documentElement;
  const desktop = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let layoutFrame = 0;
  let scrollFrame = 0;

  const updateActiveDot = () => {
    scrollFrame = 0;
    if (!dots || dots.hidden) return;
    const top = header.getBoundingClientRect().height;
    let active = 0;
    let mostVisible = -1;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const visible = Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(top, rect.top));
      if (visible > mostVisible) { mostVisible = visible; active = index; }
    });
    dotLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const updatePresentation = () => {
    layoutFrame = 0;
    if (!dots) return;
    const top = header.getBoundingClientRect().height;
    const available = innerHeight - top;
    const fits = desktop.matches && sections.every(section => section.getBoundingClientRect().height <= available + 1);
    root.style.setProperty('--services-snap-top', `${top}px`);
    root.classList.toggle('services-navigation', fits);
    root.classList.toggle('services-snap-enabled', fits && !reducedMotion.matches);
    dots.hidden = !fits;
    // Široké okno: vnější okraj. Užší desktop: tečky v prázdném pásu za ozdobnými nadpisy.
    const gutter = innerWidth - document.body.getBoundingClientRect().right;
    dots.classList.toggle('at-viewport-edge', gutter < 48);
    dots.style.setProperty('--dots-right', `${gutter >= 48 ? (gutter - 28) / 2 : 0}px`);
    dots.style.setProperty('--dots-top', `${top + available / 2}px`);
    updateActiveDot();
  };

  const schedulePresentationUpdate = () => {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(updatePresentation);
  };
  const updateHeaderHeight = () => {
    services.style.setProperty('--services-header-height', `${header.getBoundingClientRect().height}px`);
    schedulePresentationUpdate();
  };
  updateHeaderHeight();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateHeaderHeight).observe(header);
    const sectionObserver = new ResizeObserver(schedulePresentationUpdate);
    sections.forEach(section => sectionObserver.observe(section));
  } else {
    window.addEventListener('resize', updateHeaderHeight);
  }
  window.addEventListener('resize', schedulePresentationUpdate);
  window.addEventListener('scroll', () => {
    if (!scrollFrame && dots && !dots.hidden) scrollFrame = requestAnimationFrame(updateActiveDot);
  }, { passive: true });
  desktop.addEventListener('change', schedulePresentationUpdate);
  reducedMotion.addEventListener('change', schedulePresentationUpdate);
  document.fonts.ready.then(updateHeaderHeight);
}
