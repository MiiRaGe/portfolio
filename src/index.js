import './less/index.less';
import './less/footer.less';
import './less/header.less';
import './less/card.less';
import './less/case-study.less';
import './less/base.less';

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.portfolioCard');
  if (cards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 100}ms`;
      observer.observe(card);
    });
  }

  const sections = document.querySelectorAll('.caseParagraphe, .caseGallery');
  if (sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    sections.forEach((el) => sectionObserver.observe(el));
  }

  const twoColSections = document.querySelectorAll('.caseTwoColumn');
  if (twoColSections.length) {
    const twoColObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          twoColObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    twoColSections.forEach((el) => twoColObserver.observe(el));
  }
});