// Add a small theme toggle button to the nav and remember choice
(function(){
  const root = document.documentElement;
  const nav = document.querySelector('.nav-wrap');
  if(!nav) return;

  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label','Toggle theme');
  btn.style.cssText = 'margin-left:12px;padding:6px 8px;border-radius:6px;border:1px solid rgba(0,0,0,0.08);background:transparent;cursor:pointer';

  const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function apply(t){
    if(t === 'dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
    btn.textContent = t === 'dark' ? '🌙' : '☀️';
  }
  apply(current);

  btn.addEventListener('click', function(){
    const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', t);
    apply(t);
  });

  // insert into nav after site-title
  const title = nav.querySelector('.site-title');
  if(title && title.parentElement) title.parentElement.insertBefore(btn, title.nextSibling);
})();
