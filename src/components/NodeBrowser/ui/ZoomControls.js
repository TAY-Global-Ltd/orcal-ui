import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

export const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-1 flex flex-col">
        <button
          className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded"
          title="Zoom In"
          onClick={onZoomIn}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded"
          title="Zoom Out"
          onClick={onZoomOut}
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
