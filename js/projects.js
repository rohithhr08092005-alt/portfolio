// Lightweight project interactions: open GitHub repo or image lightbox
(function(){
  // Enhance project cards with repo links opening safely
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.open-repo');
    if(!btn) return;
    const url = btn.getAttribute('data-url');
    if(!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  // Simple image lightbox for any <img class="project-thumb"> inside .project
  function createLightbox(){
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.75);z-index:9999;padding:20px;';
    lb.innerHTML = '<div style="max-width:100%;max-height:100%;"><img style="max-width:100%;max-height:100%;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,0.6)" src="" alt=""></div>';
    lb.addEventListener('click', function(e){
      if(e.target === lb) lb.style.display = 'none';
    });
    document.body.appendChild(lb);
    return lb;
  }

  const lightbox = createLightbox();
  const lbImg = lightbox.querySelector('img');

  document.addEventListener('click', function(e){
    const img = e.target.closest('.project-thumb');
    if(!img) return;
    const src = img.getAttribute('src') || img.getAttribute('data-src');
    if(!src) return;
    lbImg.src = src;
    lightbox.style.display = 'flex';
  });
})();
