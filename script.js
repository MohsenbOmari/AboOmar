document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const opened = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(opened));
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const images = Array.from(document.querySelectorAll('.gallery-item img'));
  const viewer = document.getElementById('imageLightbox');
  const viewerImage = document.getElementById('lightboxImage');
  const closeButton = document.getElementById('lightboxClose');
  const previousButton = document.getElementById('lightboxPrev');
  const nextButton = document.getElementById('lightboxNext');
  const counter = document.getElementById('lightboxCounter');
  if (!viewer || !viewerImage || !closeButton) return;

  let current = 0;
  const show = index => {
    current = (index + images.length) % images.length;
    const image = images[current];
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt || 'صورة من معرض مطابخ أبو عمر';
    counter.textContent = `${current + 1} / ${images.length}`;
  };
  const open = index => {
    if (!images.length) return;
    show(index);
    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };
  const close = () => {
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    viewerImage.removeAttribute('src');
  };
  images.forEach((image, index) => {
    image.addEventListener('click', () => open(index));
    image.style.cursor = 'zoom-in';
  });
  closeButton.addEventListener('click', close);
  previousButton.addEventListener('click', () => show(current - 1));
  nextButton.addEventListener('click', () => show(current + 1));
  viewer.addEventListener('click', event => { if (event.target === viewer) close(); });
  document.addEventListener('keydown', event => {
    if (!viewer.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight') show(current - 1);
    if (event.key === 'ArrowLeft') show(current + 1);
  });
});
