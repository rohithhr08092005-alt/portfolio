// Replace alert-based validation with inline messages and friendly UI
(function(){
  const form = document.querySelector('.contact-form');
  if(!form) return;

  function makeMsg(el, text){
    let p = el.parentElement.querySelector('.field-error');
    if(!p){ p = document.createElement('div'); p.className = 'field-error'; p.style.color = '#b00020'; p.style.fontSize = '0.9rem'; p.style.marginTop = '6px'; el.parentElement.appendChild(p); }
    p.textContent = text;
  }

  function clearMsg(el){
    const p = el.parentElement.querySelector('.field-error');
    if(p) p.textContent = '';
  }

  function validEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  form.addEventListener('input', function(e){
    const target = e.target;
    if(target.id === 'email'){
      if(target.value && !validEmail(target.value)) makeMsg(target,'Enter a valid email.');
      else clearMsg(target);
    }
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let ok = true;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    if(!name.value.trim()){ makeMsg(name,'Please enter your name.'); ok = false; } else clearMsg(name);
    if(!validEmail(email.value.trim())){ makeMsg(email,'Please enter a valid email.'); ok = false; } else clearMsg(email);
    if(message.value.trim().length < 10){ makeMsg(message,'Message must be at least 10 characters.'); ok = false; } else clearMsg(message);

    if(!ok) return;

    // Show success state (demo only — does not actually send email)
    const submit = form.querySelector('button[type="submit"]');
    const original = submit.textContent;
    submit.textContent = 'Sending…';
    submit.disabled = true;

    // simulate async send
    setTimeout(()=>{
      submit.textContent = original;
      submit.disabled = false;
      form.reset();
      // simple success message
      let note = form.querySelector('.form-success');
      if(!note){ note = document.createElement('div'); note.className = 'form-success'; note.style.color = '#0b6623'; note.style.marginTop = '12px'; form.appendChild(note); }
      note.textContent = 'Thanks — your message was submitted (demo). I will get back to you soon.';
    }, 800);
  });
})();
