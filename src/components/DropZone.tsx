import React from 'react';

interface DropZoneProps {
  id: string;
  label: string;
  isActive: boolean;
  color: 'blue' | 'teal' | 'orange';
  children?: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ id, label, isActive, color, children }) => {
  const colorClasses = {
    blue: {
      bg: isActive ? 'bg-blue-100 border-blue-400' : 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      accent: 'bg-blue-600'
    },
    teal: {
      bg: isActive ? 'bg-teal-100 border-teal-400' : 'bg-teal-50 border-teal-200',
      text: 'text-teal-800',
      accent: 'bg-teal-600'
    },
    orange: {
      bg: isActive ? 'bg-orange-100 border-orange-400' : 'bg-orange-50 border-orange-200',
      text: 'text-orange-800',
      accent: 'bg-orange-600'
    }
  };

  const classes = colorClasses[color];

  return (
    <div
      data-drop-zone={id}
      className={`rounded-xl border-2 border-dashed p-6 min-h-32 flex flex-col items-center justify-center transition-all duration-200 ${classes.bg}`}
    >
      <div className={`${classes.accent} text-white px-4 py-2 rounded-lg font-semibold text-sm mb-4`}>
        {label}
      </div>
      {children && (
        <div className="w-full">
          {children}
        </div>
      )}
      {!children && (
        <p className={`text-sm ${classes.text} text-center font-medium`}>
          Sleep de kaart hierheen
        </p>
      )}
    </div>
  );
};

export default DropZone;