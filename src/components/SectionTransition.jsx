import React from 'react';

/**
 * SectionTransition
 * A reusable component to create smooth gradients between sections.
 */
const SectionTransition = ({ 
  toColor = 'to-white', 
  darkToColor = 'dark:to-gray-900', 
  height = 'h-32',
  className = '',
  via = '',
  darkVia = ''
}) => {
  const viaClass = via ? `via-${via}` : '';
  const darkViaClass = darkVia ? `dark:via-${darkVia}` : (via ? `dark:via-transparent` : '');
  
  return (
    <div 
      className={`absolute bottom-0 left-0 w-full ${height} bg-gradient-to-b from-transparent ${viaClass} ${darkViaClass} ${toColor} ${darkToColor} pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

export default SectionTransition;
