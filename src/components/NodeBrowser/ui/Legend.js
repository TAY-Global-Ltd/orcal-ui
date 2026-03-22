import React from 'react';

export const Legend = ({ pathColors }) => {
  return (
    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl border border-slate-800 shadow-xl max-w-xs pointer-events-none">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Object Categories
      </h3>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {Object.keys(pathColors).map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: pathColors[key] }}
            ></span>
            <span className="text-xs text-slate-300 font-medium">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
