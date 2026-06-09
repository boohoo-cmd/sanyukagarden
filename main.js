// Sanyuka — interactions
(function () {
  // Graceful image fallback: any failed photo becomes a tasteful brand panel
  // (no broken-image icons, regardless of CDN hiccups)
  function handleImgError(img) {
    if (img.dataset.fallback) return;
    img.dataset.fallback = '1';
    var wrap = img.parentElement;
    img.style.display = 'none';
    if (wrap) {
      wrap.style.background = 'linear-gradient(135deg, #2f5d43 0%, #14201a 100%)';
      wrap.style.minHeight = wrap.offsetHeight ? wrap.offsetHeight + 'px' : '320px';
      wrap.style.position = wrap.style.position || 'relative';
      var mark = document.createElement('div');
      mark.textContent = '✦';
      mark.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(230,200,120,0.5);font-size:2rem;';
      wrap.appendChild(mark);
    }
  }
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () { handleImgError(img); });
    if (img.complete && img.naturalWidth === 0) handleImgError(img);
  });

  // Nav background on scroll
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Menu tabs
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.tab-panel');
  if (tabs.length && panels.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.add('active');
        // re-trigger reveals inside the newly shown panel
        if (panel) panel.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
