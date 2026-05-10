/* ============================================================
   gsap-3d.js — GSAP 3D Animations Engine for Traveloop
   Requires: GSAP 3 core + ScrollTrigger
   ============================================================ */

/* ── Particle System ────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const PARTICLE_COUNT = 60;
  const colors = [
    'rgba(59,130,246,0.3)',
    'rgba(255,107,107,0.2)',
    'rgba(245,166,35,0.2)',
    'rgba(16,185,129,0.2)',
    'rgba(139,92,246,0.2)',
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ── 3D Card Tilt ──────────────────────────────────────────── */
function initTiltCards() {
  document.querySelectorAll('.card-3d, .tilt-card, .trip-card, .city-card, .insp-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        ease: 'power2.out',
        duration: 0.4,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: 'elastic.out(1, 0.5)',
        duration: 0.8,
      });
    });
  });
}

/* ── GSAP Scroll Animations ────────────────────────────────── */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Fade up elements
  gsap.utils.toArray('.gsap-fade-up, .animate-in').forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Scale in elements
  gsap.utils.toArray('.gsap-scale-in').forEach(el => {
    gsap.fromTo(el,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Rotate in elements
  gsap.utils.toArray('.gsap-rotate-in').forEach(el => {
    gsap.fromTo(el,
      { rotateY: -15, opacity: 0, transformPerspective: 800 },
      {
        rotateY: 0, opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Staggered grid items
  document.querySelectorAll('.stats-grid, .section-trip-grid, .destinations-grid, .trips-grid, .quick-actions').forEach(grid => {
    const items = grid.children;
    if (items.length > 0) {
      gsap.fromTo(items,
        { y: 30, opacity: 0, rotateX: -5, transformPerspective: 600 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
}

/* ── Hero 3D Entrance Animation ────────────────────────────── */
function animateHero() {
  if (typeof gsap === 'undefined') return;

  const hero = document.querySelector('.dashboard-hero, .auth-hero, .hero-banner');
  if (!hero) return;

  const tl = gsap.timeline();
  tl.fromTo(hero, 
    { opacity: 0, y: 60, rotateX: -8, transformPerspective: 1000, scale: 0.95 },
    { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.2, ease: 'power4.out' }
  );

  // Animate hero children staggered
  const children = hero.querySelectorAll('h1, h2, p, .btn, .auth-stat, .dest-pill');
  if (children.length) {
    tl.fromTo(children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
      '-=0.6'
    );
  }
}

/* ── Floating Emoji Animations ─────────────────────────────── */
function animateFloatingEmojis() {
  if (typeof gsap === 'undefined') return;

  document.querySelectorAll('.dest-pill, .dashboard-hero-emoji, .trip-card-image-placeholder span, .insp-card-img span').forEach((el, i) => {
    gsap.to(el, {
      y: -12 - Math.random() * 8,
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.2,
    });
  });
}

/* ── Magnetic Button Effect ────────────────────────────────── */
function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-accent, .btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}

/* ── Navbar Scroll Effect ──────────────────────────────────── */
function initNavbarEffect() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
      navbar.style.borderBottomColor = 'rgba(59,130,246,0.15)';
    } else {
      navbar.style.boxShadow = '';
      navbar.style.borderBottomColor = '';
    }
    lastScroll = current;
  });
}

/* ── Page Loading Animation ────────────────────────────────── */
function initLoadingScreen() {
  const loader = document.querySelector('.loading-screen');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 800);
  });
}

/* ── 3D Globe Auto-Rotate ──────────────────────────────────── */
function initGlobe() {
  const globe = document.querySelector('.globe-3d');
  if (!globe || typeof gsap === 'undefined') return;

  gsap.to(globe, {
    rotateY: 360,
    duration: 30,
    repeat: -1,
    ease: 'none',
  });

  gsap.to(globe, {
    y: -15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/* ── Count-Up Animation ────────────────────────────────────── */
function animateCountUp(element, target, duration = 1.5) {
  if (typeof gsap === 'undefined') return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.val);
    },
  });
}

function initCountUps() {
  document.querySelectorAll('.stat-value').forEach(el => {
    const text = el.textContent.trim();
    const num = parseInt(text);
    if (!isNaN(num) && num > 0) {
      el.textContent = '0';
      setTimeout(() => animateCountUp(el, num), 500);
    }
  });
}

/* ── Smooth Page Transitions ───────────────────────────────── */
function initPageTransitions() {
  if (typeof gsap === 'undefined') return;

  // Entrance
  gsap.fromTo('body', 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.4, ease: 'power2.out' }
  );
}

/* ── Decorative Orbit Rings ────────────────────────────────── */
function createOrbitRings(container) {
  if (!container) return;

  const sizes = [180, 260, 340];
  sizes.forEach((size, i) => {
    const ring = document.createElement('div');
    ring.classList.add('orbit-ring');
    ring.style.cssText = `
      width: ${size}px; height: ${size}px;
      top: calc(50% - ${size/2}px);
      left: calc(50% - ${size/2}px);
      animation-duration: ${12 + i * 5}s;
      animation-direction: ${i % 2 === 0 ? 'normal' : 'reverse'};
      opacity: ${0.3 - i * 0.08};
    `;
    container.appendChild(ring);
  });
}

/* ── Initialize All ────────────────────────────────────────── */
function initGSAP3D() {
  initLoadingScreen();
  initPageTransitions();
  initParticles();
  initNavbarEffect();

  // Wait for GSAP to be ready
  if (typeof gsap !== 'undefined') {
    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      animateHero();
      animateFloatingEmojis();
      initTiltCards();
      initMagneticButtons();
      initGlobe();
      initCountUps();

      // ScrollTrigger animations
      if (typeof ScrollTrigger !== 'undefined') {
        initScrollAnimations();
      }
    });
  }
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGSAP3D);
} else {
  initGSAP3D();
}
