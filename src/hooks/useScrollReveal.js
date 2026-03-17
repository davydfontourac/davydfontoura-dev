import { useEffect, useRef, useState } from 'react';

/**
 * Hook para detectar quando um elemento entra na viewport
 * @param {Object} options - Opções do IntersectionObserver
 * @param {boolean} repeat - Se a animação deve repetir ao entrar/sair da viewport
 */
export const useScrollReveal = (options = { threshold: 0.1, rootMargin: '0px' }, repeat = true) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else if (repeat) {
        // Se repeat for true, reseta a visibilidade ao sair da tela
        setIsVisible(false);
      }
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.rootMargin, options.threshold, repeat]);

  return { ref, isVisible };
};
