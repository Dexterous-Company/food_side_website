/* utils/aos.js - AOS Animation Utility */
export default {
  init() {
    if (typeof window === 'undefined') return;
    
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
              entry.target.classList.add('aos-animate');
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
  },
  refresh() {
    if (typeof window === 'undefined') return;
    
    const elements = document.querySelectorAll('[data-aos]:not(.aos-animate)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
              entry.target.classList.add('aos-animate');
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
  }
};