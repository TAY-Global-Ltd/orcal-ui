import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { getPathColor, truncateObjectName } from '../utils';

const Spinner = () => (
  <div className="flex items-center justify-center py-6">
    <div
      className="w-6 h-6 rounded-full"
      style={{
        borderWidth: '3px',
        borderStyle: 'solid',
        borderTopColor: '#0284c7',
        borderRightColor: '#cbd5e1',
        borderBottomColor: '#cbd5e1',
        borderLeftColor: '#cbd5e1',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  </div>
);

const NodeList = ({ nodes, pathColors, onClickNode }) => (
  <div className="space-y-1">
    {nodes.map((n) => (
      <div
        key={n.id}
        className={`flex items-center gap-2 text-xs bg-slate-100 px-2 py-1 rounded font-mono${onClickNode ? ' cursor-pointer hover:bg-slate-200 transition-colors' : ''}`}
        onClick={onClickNode ? () => onClickNode(n.id) : undefined}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: getPathColor(n.root || n.objectPath, pathColors) }}
        />
        <span className="text-slate-700 truncate">{n.name}</span>
      </div>
    ))}
  </div>
);

export const ObjectDetailPanel = ({ object, pathColors, onClickNode }) => {
  const color = getPathColor(object.root || object.path, pathColors);
  const functions = object.functions || [];

  return (
    <div
      className="absolute z-50 bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
      style={{
        right: 20,
        top: 20,
        bottom: 20,
        width: '360px',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <span className="text-sm font-semibold text-slate-800">Details</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <div>
          <div className="flex items-start justify-between mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: color }}
            >
              {object.root || object.path?.split('/')[1]}
            </span>
            <span className="text-xs text-slate-500 capitalize">Object</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 break-words mt-2">
            {truncateObjectName(object.name)}
          </h2>
          <div className="text-xs text-slate-500 font-mono break-all mt-1">{object.path}</div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Functions ({functions.length})
          </h3>
          <NodeList nodes={functions} pathColors={pathColors} onClickNode={onClickNode} />
        </div>

        {functions.length === 0 && (
          <div className="text-xs text-slate-400 italic">No functions</div>
        )}
      </div>
    </div>
  );
};

export const DetailPanel = ({ node, data, loading, content, pathColors }) => {
  const color = getPathColor(node.root || node.path, pathColors);

  const { parents, children } = useMemo(() => {
    const funcMap = new Map();
    for (const f of data.functions) {
      funcMap.set(f.id, f);
    }
    const parentIds = new Set();
    const childIds = new Set();
    for (const call of data.calls) {
      if (call.target === node.id && call.source !== node.id) parentIds.add(call.source);
      if (call.source === node.id && call.target !== node.id) childIds.add(call.target);
    }
    return {
      parents: [...parentIds].map((id) => funcMap.get(id)).filter(Boolean),
      children: [...childIds].map((id) => funcMap.get(id)).filter(Boolean),
    };
  }, [node.id, data]);

  return (
    <div
      className="absolute z-50 bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
      style={{
        right: 20,
        top: 20,
        bottom: 20,
        width: '360px',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <span className="text-sm font-semibold text-slate-800">Details</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Node info — available immediately */}
        <div>
          <div className="flex items-start justify-between mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: color }}
            >
              {node.root || node.path?.split('/')[1]}
            </span>
            <span className="text-xs text-slate-500 capitalize">
              {node.type?.replace('_', ' ')}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 break-words mt-2">{node.name}</h2>
          <div className="text-xs text-slate-500 font-mono break-all mt-1">
            {node.objectPath || node.path}
          </div>
        </div>

        {/* Parents (callers) */}
        {parents.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Called by ({parents.length})
            </h3>
            <NodeList nodes={parents} pathColors={pathColors} />
          </div>
        )}

        {/* Children (callees) */}
        {children.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Calls ({children.length})
            </h3>
            <NodeList nodes={children} pathColors={pathColors} />
          </div>
        )}

        {parents.length === 0 && children.length === 0 && (
          <div className="text-xs text-slate-400 italic">No connections</div>
        )}

        {/* Description — fetched async */}
        <div className="border-t border-slate-200 pt-3">
          {loading ? (
            <Spinner />
          ) : content ? (
            <div className="prose prose-sm max-w-none text-slate-700 [&_h1]:text-lg [&_h1]:text-slate-900 [&_h1]:mt-0 [&_h2]:text-base [&_h2]:text-slate-800 [&_h3]:text-sm [&_h3]:text-slate-700 [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sky-700 [&_pre]:bg-slate-100 [&_pre]:border [&_pre]:border-slate-200 [&_pre]:rounded-lg [&_table]:text-xs [&_th]:text-slate-700 [&_td]:text-slate-500 [&_hr]:border-slate-200">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
