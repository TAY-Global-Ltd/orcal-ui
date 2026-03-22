import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

export const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg p-1 flex flex-col">
        <button
          className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded"
          title="Zoom In"
          onClick={onZoomIn}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded"
          title="Zoom Out"
          onClick={onZoomOut}
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
