import React from 'react';
import { Share2, RefreshCw } from 'lucide-react';

export const Header = ({ data, onRefresh }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shadow-sm z-10">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Share2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">Dependency Graph</h1>
          <p className="text-xs text-slate-400">
            {data
              ? `${data.objects.length} Objects • ${data.functions.length} Functions`
              : 'Initializing...'}
          </p>
        </div>
      </div>

      {onRefresh && (
        <button
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          title="Regenerate Graph"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
