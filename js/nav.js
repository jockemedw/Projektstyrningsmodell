// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Mark active nav link based on current path
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('../','').replace('./','').replace('index.html',''))) {
      a.classList.add('active');
    }
  });

  // Mark active sidebar link
  document.querySelectorAll('.sidebar-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href) {
      const target = href.replace('../','').replace('./','').replace('index.html','');
      if (target && path.endsWith(target.split('/').pop())) {
        a.classList.add('active');
      }
    }
  });
});
