import React from 'react';
import PropTypes from 'prop-types';

const ProjectStatRow = ({ label, value, icon: Icon, customValue }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
      {Icon && <Icon size={14} className="mr-1" />}
      {label}
    </span>
    {customValue ? customValue : (
      <span className="text-sm text-gray-900 dark:text-white font-medium">
        {value}
      </span>
    )}
  </div>
);

ProjectStatRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.elementType,
  customValue: PropTypes.node
};

export default ProjectStatRow;
