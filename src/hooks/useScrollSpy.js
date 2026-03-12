import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds = ['home', 'about', 'services', 'portfolio', 'contact'], defaultSection = 'home') => {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const observers = [];


    // Ajuste melhor para scroll spy é usar IntersectionObserver dessa forma
    const sectionObserver = new IntersectionObserver((entries) => {
       entries.forEach((entry) => {
          if (entry.isIntersecting) {
             const id = entry.target.id;
             setActiveSection(id);
             if (window.location.hash !== `#${id}` && id !== 'home') {
                 window.history.replaceState(null, '', `/#${id}`);
             } else if (id === 'home' && window.location.hash !== '') {
                 window.history.replaceState(null, '', window.location.pathname);
             }
          }
       });
    }, { rootMargin: '-40% 0px -60% 0px' }); // O ativo é aquele que passa do 40% de cima

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        sectionObserver.observe(element);
        observers.push({ observer: sectionObserver, element });
      }
    });

    return () => {
      observers.forEach(({ observer, element }) => {
        observer.unobserve(element);
      });
      sectionObserver.disconnect();
    };
  }, [sectionIds, activeSection]);

  return activeSection;
};
