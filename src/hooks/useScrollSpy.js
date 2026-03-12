import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds = ['home', 'about', 'services', 'portfolio', 'contact'], defaultSection = 'home') => {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const observers = [];
    const visibleSections = new Map();

    const callback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          visibleSections.set(id, entry.intersectionRatio);
        } else {
          visibleSections.delete(id);
        }
      });

      if (visibleSections.size > 0) {
        // Encontra a seção com maior intersectionRatio
        let maxRatio = 0;
        let mostVisibleId = activeSection;

        visibleSections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleId = id;
          }
        });

        if (mostVisibleId !== activeSection) {
          setActiveSection(mostVisibleId);
          // Opcionalmente atualiza a URL sem disparar reload
          if (window.location.hash !== `#${mostVisibleId}`) {
             window.history.replaceState(null, '', `/#${mostVisibleId}`);
          }
        }
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Aciona quando a div cruzar a metade da tela
      // threshold: 0
    };

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
