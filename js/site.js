// Shared site script: nav toggle, hide current page link, set year
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle (if present)
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
  if (btn && nav) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Hide the nav link that points to the current page
  // Determine current filename (treat root and index.html as index)
  let current = (location.pathname.split('/').pop() || 'index.html');
  if (!current || current === '') current = 'index.html';

  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const target = href.split('/').pop() || 'index.html';
    // Treat both '' and 'index.html' as home
    const targetNorm = (target === '' ? 'index.html' : target);
    const currentNorm = (current === '' ? 'index.html' : current);
    if (targetNorm === currentNorm) {
      a.style.display = 'none';
      a.setAttribute('aria-hidden', 'true');
    }
  });

  // Set any year spans if present
  document.querySelectorAll('#year, #year2, #year3').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Lightbox functionality for collage images
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const collageImages = document.querySelectorAll('.collage-grid img');

  console.log('Lightbox elements:', { lightbox, lightboxImage, lightboxClose, collageImagesCount: collageImages.length });

  if (lightbox && lightboxImage && collageImages.length > 0) {
    // Open lightbox when image is clicked
    collageImages.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Image clicked:', this.src);
        lightboxImage.src = this.src;
        lightboxImage.alt = this.alt || 'Vineyard image';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Close lightbox when close button is clicked
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      });
    }

    // Close lightbox when clicking outside the image (on the background)
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
    
    // Prevent closing when clicking on the image itself
    if (lightboxImage) {
      lightboxImage.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  }
});
