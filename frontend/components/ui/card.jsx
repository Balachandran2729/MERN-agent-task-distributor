import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'bg-dark-800 border border-dark-700 rounded-lg shadow-lg card-hover';
  
  const classes = `${baseClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  const classes = `px-6 py-4 border-b border-dark-700 ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  const classes = `text-lg font-semibold text-white ${className}`;
  
  return (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  );
};

const CardContent = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  const classes = `p-6 ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };