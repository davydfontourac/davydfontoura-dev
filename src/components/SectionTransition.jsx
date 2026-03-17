import React from 'react';
import PropTypes from 'prop-types';

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
  
  let darkViaClass = '';
  if (darkVia) {
    darkViaClass = `dark:via-${darkVia}`;
  } else if (via) {
    darkViaClass = 'dark:via-transparent';
  }
  
  return (
    <div 
      className={`absolute bottom-0 left-0 w-full ${height} bg-gradient-to-b from-transparent ${viaClass} ${darkViaClass} ${toColor} ${darkToColor} pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

SectionTransition.propTypes = {
  toColor: PropTypes.string,
  darkToColor: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  via: PropTypes.string,
  darkVia: PropTypes.string
};

export default SectionTransition;
