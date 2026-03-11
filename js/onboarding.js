// Onboarding Slideshow — Score Tracker

// ══════════════════════════════════════════════════════════
// ONBOARDING
// ══════════════════════════════════════════════════════════
(function() {
  var SEEN_KEY = 'scoretracker_onboarding_seen';
  var currentSlide = 0;
  var totalSlides = 4;
  var overlay, slides, dots, nextBtn;
  var touchStartX = 0;
  var touchEndX = 0;

  function init() {
    overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;

    // Check if already seen
    if (localStorage.getItem(SEEN_KEY)) {
      overlay.classList.add('ob-hidden');
      return;
    }

    slides = overlay.querySelectorAll('.ob-slide');
    dots   = overlay.querySelectorAll('.ob-dot');
    nextBtn = document.getElementById('ob-next-btn');

    // Touch swipe support
    overlay.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    overlay.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].clientX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) obNext();
        else obPrev();
      }
    }, { passive: true });

    // Dot click
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goToSlide(i); });
    });

    updateUI();
  }

  function goToSlide(n) {
    if (n < 0 || n >= totalSlides) return;

    // Mark current as exiting
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('ob-exit');

    setTimeout(function() {
      slides[currentSlide].classList.remove('ob-exit');
    }, 450);

    currentSlide = n;

    // Stagger entrance slightly
    setTimeout(function() {
      slides[currentSlide].classList.add('active');
    }, 60);

    updateUI();
  }

  function updateUI() {
    dots.forEach(function(d, i) {
      d.classList.toggle('active', i === currentSlide);
    });

    var isLast = currentSlide === totalSlides - 1;
    nextBtn.classList.toggle('ob-last', isLast);
    nextBtn.textContent = isLast ? 'เริ่ม!' : 'ถัดไป';
  }

  // Expose globally
  window.obNext = function() {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    } else {
      finishOnboarding();
    }
  };

  window.obPrev = function() {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  };

  window.finishOnboarding = function() {
    if (!overlay) return;
    localStorage.setItem(SEEN_KEY, '1');

    // Animate out
    overlay.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(1.04)';

    setTimeout(function() {
      overlay.classList.add('ob-hidden');
      overlay.style.transition = '';
      overlay.style.opacity = '';
      overlay.style.transform = '';
    }, 420);
  };

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ── Auth Step ──────────────────────────────────────────
window.showAuthStep = function() {
  var authStep = document.getElementById('ob-auth-step');
  var controls = document.querySelector('.ob-controls');
  var slides   = document.getElementById('ob-slides');
  if (!authStep) { finishOnboarding(); return; }

  // Animate slides out, auth step in
  slides.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  slides.style.opacity = '0';
  slides.style.transform = 'translateX(-40px)';
  if (controls) {
    controls.style.transition = 'opacity 0.3s ease';
    controls.style.opacity = '0';
    controls.style.pointerEvents = 'none';
  }

  setTimeout(function() {
    authStep.style.display = 'flex';
    authStep.style.opacity = '0';
    authStep.style.transform = 'translateX(40px)';
    authStep.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        authStep.style.opacity = '1';
        authStep.style.transform = 'translateX(0)';
      });
    });
  }, 320);
};

window.obSignInGoogle = async function() {
  // Call the main app's signInGoogle, then finish onboarding
  if (typeof signInGoogle === 'function') {
    await signInGoogle();
  }
  finishOnboarding();
};