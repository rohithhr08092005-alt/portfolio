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
