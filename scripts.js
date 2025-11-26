// Simple mobile nav toggle
(function(){
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if(!btn || !menu) return;
  btn.addEventListener('click', ()=>{
    menu.classList.toggle('open');
  });
})();

/* 3D card mouse-tilt effect */
(function(){
  const card = document.getElementById('profile-card');
  if(!card) return;
  const inner = card.querySelector('.card__inner');
  const glare = card.querySelector('.card__glare');
  const maxTilt = 12; // degrees
  let w = card.offsetWidth, h = card.offsetHeight;

  function updateDims(){ w = card.offsetWidth; h = card.offsetHeight; }
  window.addEventListener('resize', updateDims);

  let raf = null;
  let mouseX = 0, mouseY = 0, tx = 0, ty = 0;

  function handleMove(e){
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) - w/2;
    const y = (e.clientY - rect.top) - h/2;
    mouseX = (x / (w/2)) * maxTilt;
    mouseY = (y / (h/2)) * maxTilt;
    if(!raf) raf = requestAnimationFrame(animate);
  }

  function animate(){
    // simple lerp for smoothness
    tx += (mouseX - tx) * 0.12;
    ty += (mouseY - ty) * 0.12;
    inner.style.transform = `rotateY(${tx}deg) rotateX(${-ty}deg) translateZ(0)`;
    // glare rotate/position
    const gx = (tx/ maxTilt) * 50; // percent
    const gy = (ty/ maxTilt) * 50;
    glare.style.transform = `translate(${gx}%, ${gy}%) rotate(${tx * 0.5}deg)`;
    raf = null;
  }

  function handleLeave(){
    mouseX = 0; mouseY = 0;
    tx = 0; ty = 0;
    inner.style.transform = `rotateY(0deg) rotateX(0deg)`;
    glare.style.transform = '';
  }

  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', handleLeave);
  card.addEventListener('mouseenter', updateDims);
})();

/* Smooth scrolling for internal anchor links + external link safety */
(function(){
  // smooth-scroll for anchors that target an element on the page
  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;

    // internal hash links
    if(href.startsWith('#')){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll:true});
      }
    }
  });

  // Ensure external links that open in a new tab use rel for security
  Array.from(document.querySelectorAll('a[target="_blank"]')).forEach(a=>{
    if(!a.hasAttribute('rel')) a.setAttribute('rel','noopener noreferrer');
  });
})();

/* Contact form basic client-side validation */
(function(){
  const form = document.querySelector('.contact-form');
  if(!form) return;

  function validEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function(e){
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    const errors = [];
    if(!name || !name.value.trim()) errors.push('Please enter your name.');
    if(!email || !validEmail(email.value.trim())) errors.push('Please enter a valid email address.');
    if(!message || message.value.trim().length < 10) errors.push('Message must be at least 10 characters.');

    if(errors.length){
      e.preventDefault();
      alert(errors.join('\n'));
      // focus first invalid field
      if(!name.value.trim()) name.focus();
      else if(!validEmail(email.value.trim())) email.focus();
      else message.focus();
    }
  });
})();
