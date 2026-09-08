/**
 * RAASTHA ACADEMY - MAHALLAH TRAINING PROGRAM
 * Interactive logic, modal handling, WhatsApp integration, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Off-Canvas Mobile Side Drawer Logic
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('active');
      drawerBackdrop.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      drawerBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('active');
      drawerBackdrop.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      drawerBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Close mobile drawer when any link inside it is clicked
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('.drawer-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  // 3. Registration Modal Handling
  const modal = document.getElementById('registrationModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="registration"]');
  const closeModalBtn = document.getElementById('closeModalBtn');

  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside dialog
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. Registration Form WhatsApp Integration
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('regName')?.value.trim() || '';
      const phone = document.getElementById('regPhone')?.value.trim() || '';
      const place = document.getElementById('regPlace')?.value.trim() || '';
      const role = document.getElementById('regRole')?.value || 'பொது உறுப்பினர்';

      if (!name || !phone) {
        alert('தயவுசெய்து உங்கள் பெயர் மற்றும் தொடர்பு எண்ணை உள்ளிடவும்.');
        return;
      }

      // Format WhatsApp message
      const targetPhone = '919495533900';
      const text = `அஸ்ஸலாமு அலைக்கும் (வரஹ்).
நான் ராஸ்தா அகாடமியின் மஹல்லா டிரெயினிங் திட்டத்தில் (Mahallah Training Program) இணைய விரும்புகிறேன்.

*விவரங்கள்:*
👤 பெயர்: ${name}
📞 எண்: ${phone}
📍 மஹல்லா / ஊர்: ${place}
🏷️ வகை: ${role}

தயவுசெய்து சேர்க்கை விவரங்களை அனுப்பவும்.`;

      const encodedText = encodeURIComponent(text);
      const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

      // Open WhatsApp
      window.open(waUrl, '_blank');
      closeModal();
      regForm.reset();
    });
  }

  // 5. Scroll Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
