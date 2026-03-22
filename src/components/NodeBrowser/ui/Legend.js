import React, { useState } from 'react';

export const Legend = ({ pathColors }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-xl max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 cursor-pointer text-left"
      >
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Object Categories
        </h3>
        <svg
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 px-4 pb-4">
          {Object.keys(pathColors).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: pathColors[key] }}
              ></span>
              <span className="text-xs text-slate-700 font-medium">{key}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
