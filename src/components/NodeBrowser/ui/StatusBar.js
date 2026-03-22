import React from 'react';

export const StatusBar = ({ text }) => {
  return (
    <div className="px-6 py-2 bg-slate-800 border-b border-slate-700 z-10 min-h-[40px] flex items-center">
      <span className="text-sm font-mono text-slate-300">{text || '\u00A0'}</span>
    </div>
  );
};
