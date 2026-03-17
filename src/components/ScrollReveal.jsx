import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Componente que aplica animação de entrada ao entrar na viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo a ser animado
 * @param {string} props.variant - Tipo de animação ('fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom')
 * @param {string} props.delay - Delay da animação (ex: '100ms', '0.2s')
 * @param {string} props.duration - Duração da animação (ex: '800ms')
 * @param {number} props.threshold - Limiar de visibilidade para disparar (0 a 1)
 * @param {boolean} props.repeat - Se a animação deve repetir ao sair e entrar novamente
 * @param {string} props.className - Classes CSS adicionais para o container
 */
const ScrollReveal = ({ 
  children, 
  variant = 'fade-up', 
  delay = '0ms', 
  duration = '800ms',
  threshold = 0.1,
  repeat = true,
  className = ''
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold }, repeat);

  const variantClass = `variant-${variant}`;
  
  const styles = {
    transitionDelay: delay,
    transitionDuration: duration,
  };

  return (
    <div
      ref={ref}
      style={styles}
      className={`reveal-base ${variantClass} ${isVisible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
