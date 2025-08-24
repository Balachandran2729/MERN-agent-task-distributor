import React from 'react';

const Input = React.forwardRef(({ 
  className = '', 
  type = 'text', 
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors';
  
  const classes = `${baseClasses} ${className}`;
  
  return (
    <input
      ref={ref}
      type={type}
      className={classes}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };