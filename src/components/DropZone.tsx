import React from 'react';

interface DropZoneProps {
  id: string;
  label: string;
  isActive: boolean;
  color: 'blue' | 'teal' | 'orange' | 'green';
  children?: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ id, label, isActive, color, children }) => {
  // Vaste kleuren per categorie onafhankelijk van shock/flauwte
  const getCategoryColor = (categoryId: string) => {
    switch(categoryId) {
      case 'oorzaken':
        return {
          bg: isActive ? 'bg-[#009fe3]/20 border-[#009fe3]' : 'bg-[#009fe3]/10 border-[#009fe3]/40',
          text: 'text-[#006072]',
          accent: 'bg-[#009fe3]'
        };
      case 'verschijnselen':
        return {
          bg: isActive ? 'bg-[#52bbb5]/20 border-[#52bbb5]' : 'bg-[#52bbb5]/10 border-[#52bbb5]/40',
          text: 'text-[#006072]',
          accent: 'bg-[#52bbb5]'
        };
      case 'eerste_hulp':
        return {
          bg: isActive ? 'bg-[#d5ac48]/20 border-[#d5ac48]' : 'bg-[#d5ac48]/10 border-[#d5ac48]/40',
          text: 'text-[#006072]',
          accent: 'bg-[#d5ac48]'
        };
      default:
        // Fallback voor shock/flauwte keuze
        if (categoryId === 'shock') {
          return {
            bg: isActive ? 'bg-[#009fe3]/20 border-[#009fe3]' : 'bg-[#009fe3]/10 border-[#009fe3]/40',
            text: 'text-[#006072]',
            accent: 'bg-[#009fe3]'
          };
        } else if (categoryId === 'flauwte') {
          return {
            bg: isActive ? 'bg-[#52bbb5]/20 border-[#52bbb5]' : 'bg-[#52bbb5]/10 border-[#52bbb5]/40',
            text: 'text-[#006072]',
            accent: 'bg-[#52bbb5]'
          };
        }
        // Default fallback
        return {
          bg: isActive ? 'bg-[#009fe3]/20 border-[#009fe3]' : 'bg-[#009fe3]/10 border-[#009fe3]/40',
          text: 'text-[#006072]',
          accent: 'bg-[#009fe3]'
        };
    }
  };

  const classes = getCategoryColor(id);

  return (
    <div
      data-drop-zone={id}
      className={`rounded-2xl border-2 border-dashed p-5 min-h-28 flex flex-col transition-all duration-300 ${classes.bg} hover:scale-105 shadow-lg hover:shadow-xl`}
    >
      <div className={`${classes.accent} text-white px-4 py-2 rounded-xl font-bold text-sm mb-3 self-center shadow-md`}>
        <span>{label}</span>
      </div>
      
      {children && (
        <div className="w-full flex-1 space-y-2">
          {children}
        </div>
      )}
      
      {!children && (
        <div className={`flex-1 flex items-center justify-center ${classes.text} opacity-60`}>
          <span className="text-xs font-medium">Sleep kaart hierheen</span>
        </div>
      )}
    </div>
  );
};

export default DropZone;