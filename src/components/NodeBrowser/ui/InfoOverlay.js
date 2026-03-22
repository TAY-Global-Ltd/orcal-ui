import React from 'react';
import { getPathColor, truncateObjectName } from '../utils';

export const FunctionInfoOverlay = ({ node, pathColors }) => {
  const color = getPathColor(node.root || node.path, pathColors);

  return (
    <div
      className="absolute z-50 pointer-events-none bg-slate-800/95 backdrop-blur-md p-4 rounded-lg border border-slate-700 shadow-2xl transition-opacity duration-200"
      style={{
        left: 20,
        bottom: 20,
        maxWidth: '300px',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded text-white"
          style={{ backgroundColor: color }}
        >
          {node.root || node.path?.split('/')[1]}
        </span>
        <span className="text-xs text-slate-400 capitalize">
          {node.type?.replace('_', ' ')}
        </span>
      </div>

      <div className="mb-2">
        <h2 className="text-lg font-bold text-white break-words">{node.name}</h2>
        <div className="text-xs text-slate-400 font-mono break-all mt-1">
          {node.path || node.objectPath}
        </div>
      </div>
    </div>
  );
};

export const ObjectInfoOverlay = ({ object, pathColors }) => {
  const color = getPathColor(object.root || object.path, pathColors);

  return (
    <div
      className="absolute z-50 pointer-events-none bg-slate-800/95 backdrop-blur-md p-4 rounded-lg border border-slate-700 shadow-2xl transition-opacity duration-200"
      style={{
        left: 20,
        bottom: 20,
        maxWidth: '400px',
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded text-white"
          style={{ backgroundColor: color }}
        >
          {object.root || object.path.split('/')[1]}
        </span>
        <span className="text-xs text-slate-400 capitalize">Object</span>
      </div>

      <div className="mb-3">
        <h2 className="text-lg font-bold text-white break-words">
          {truncateObjectName(object.name)}
        </h2>
        <div className="text-xs text-slate-400 font-mono break-all mt-1">{object.path}</div>
      </div>

      <div className="border-t border-slate-700 pt-3">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">
          Functions ({object.functions.length})
        </h3>
        <div className="space-y-1 max-h-80 overflow-y-auto">
          {object.functions.map((func) => (
            <div
              key={func.id}
              className="text-xs text-slate-300 bg-slate-900/50 px-2 py-1 rounded font-mono"
            >
              {func.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
