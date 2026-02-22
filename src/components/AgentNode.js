import React, { useState } from 'react';
import { Settings, X, Trash2, ChevronRight, ChevronDown, Home, Eye, Edit } from 'lucide-react';

/**
 * COMPONENT: Agent Selector (Dropdown/Modal)
 * Handles the tree navigation logic.
 */
const AgentSelector = ({ value, onChange, onClose, agentTree }) => {
    const [path, setPath] = useState([]); // Array of keys selected so far

    // Current level of the tree based on path
    let currentOptions = agentTree;
    path.forEach(key => {
        if (currentOptions[key]) currentOptions = currentOptions[key];
    });

    const isLeaf = Array.isArray(currentOptions);

    const handleSelect = ({ key }) => {
        if (isLeaf) {
            // It's an agent selection
            onChange({ path: [...path, key] });
            onClose();
        } else {
            // Go deeper
            setPath([...path, key]);
        }
    };

    const goBack = () => {
        setPath(path.slice(0, -1));
    };

    return (
        <div
            className="absolute top-full left-0 mt-[8px] bg-white rounded-[8px] shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100"
            style={{ width: '256px' }}
        >
            <div className="p-[8px] bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                {path.length > 0 ? (
                    <button onClick={goBack} className="text-[12px] font-medium text-blue-500 hover:text-blue-600 flex items-center">
                        &larr; Back
                    </button>
                ) : (
                    <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Select Source</span>
                )}
                <button onClick={onClose} className="text-slate-400 hover:text-red-500"><X size={14} /></button>
            </div>

            <div className="max-h-[240px] overflow-y-auto p-[4px] bg-white text-slate-900">
                {isLeaf ? (
                    currentOptions.map((agent) => (
                        <button
                            key={agent}
                            onClick={() => handleSelect({ key: agent })}
                            className="w-full text-left px-[12px] py-[8px] text-[14px] text-slate-700 hover:bg-blue-50 rounded flex items-center gap-[8px]"
                        >
                            <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
                            {agent}
                        </button>
                    ))
                ) : (
                    Object.keys(currentOptions).map((key) => (
                        <button
                            key={key}
                            onClick={() => handleSelect({ key })}
                            className="w-full text-left px-[12px] py-[8px] text-[14px] text-slate-700 hover:bg-slate-100 rounded flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-[8px]">
                                {path.length === 0 ? (key === 'Shared' ? '🌍' : '🔒') : '📁'}
                                <span>{key}</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-600" />
                        </button>
                    ))
                )}
                {/* Fallback check */}
                {!isLeaf && Object.keys(currentOptions).length === 0 && (
                    <div className="p-2 text-slate-400 text-xs text-center italic">No items found</div>
                )}
            </div>
        </div>
    );
};

const AgentNode = ({
    node,
    isActive,
    isRootNode,
    isEditing,
    agentName,
    breadcrumbs,
    agentTree,
    openSelectorId,
    setOpenSelectorId,
    updateAgent,
    handleView,
    handleEdit,
    deleteNode,
    onNodeDragStart,
    nodeRef,
    style,
    isAbsolute = true,
    colour,
    children
}) => {
    return (
        <div
            ref={nodeRef}
            data-node="true"
            onMouseDown={(e) => onNodeDragStart ? onNodeDragStart({ event: e, node }) : null}
            style={{
                width: '256px',
                height: 'fit-content',
                boxSizing: 'border-box',
                fontSize: '14px',
                lineHeight: '1.5',
                fontFamily: 'sans-serif',
                ...style
            }}
            className={`${isAbsolute ? 'absolute' : 'relative'} bg-white rounded-[12px] shadow-lg border-2 transition-shadow duration-200 group flex flex-col ${openSelectorId === node.id ? 'z-50' : 'z-10'}
                ${isActive
                    ? 'border-green-500 shadow-green-500/30 ring-1 ring-green-500'
                    : 'border-blue-500 hover:border-blue-600'
                }
            `}
        >
            {/* Active Indicator / Header */}
            <div
                className={`rounded-t-[12px] w-full ${isActive ? 'bg-green-500' : 'bg-slate-100'}`}
                style={{ height: '8px' }}
            ></div>

            <div className="flex flex-col" style={{ padding: '16px', gap: '12px' }}>

                {/* Header Row */}
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        {breadcrumbs && (
                            <span className="text-slate-400 truncate max-w-[150px]" title={breadcrumbs} style={{ fontSize: '10px' }}>{breadcrumbs}</span>
                        )}
                    </div>

                    <div className="flex gap-[4px]">
                        {/* View/Edit Icon */}
                        {handleView && node.data.agentPath.length > 0 && (
                            <button
                                onClick={() => handleView({ agentPath: node.data.agentPath.join('/') })}
                                className="p-[6px] rounded-[6px] text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="View Agent"
                            >
                                <Eye size={16} />
                            </button>
                        )}
                        {isEditing && handleEdit && node.data.agentPath.length > 0 && (
                            <button
                                onClick={() => handleEdit({ agentPath: node.data.agentPath.join('/') })}
                                className="p-[6px] rounded-[6px] text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                title="Edit Agent"
                            >
                                <Edit size={16} />
                            </button>
                        )}
                        {/* Root Node Indicator */}
                        {isRootNode && (
                            <div
                                className="p-[6px] rounded-[6px] transition-all text-indigo-600 bg-indigo-50"
                                title="Root Node"
                            >
                                <Home size={18} />
                            </div>
                        )}
                        {/* Active Toggle */}
                        {isActive && (
                            <div
                                className="p-[6px] rounded-[6px] transition-all text-green-600 bg-green-50"
                                title="Active Node"
                            >
                                <Settings size={18} className="animate-spin" />
                            </div>
                        )}
                        {isEditing && deleteNode && (
                            <button
                                onClick={() => deleteNode({ id: node.id })}
                                className="p-[6px] rounded-[6px] text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Agent Selector Dropdown */}
                <div className="relative nodrag">
                    <button
                        onClick={() => setOpenSelectorId(openSelectorId === node.id ? null : node.id)}
                        className="w-full flex items-center justify-between px-[12px] py-[8px] bg-slate-50 border border-slate-200 rounded-[6px] text-[14px] text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex items-center gap-[8px] overflow-hidden">
                            {colour && (
                                <div
                                    className="w-[10px] h-[10px] rounded-full shrink-0"
                                    style={{ backgroundColor: colour }}
                                />
                            )}
                            <span className="truncate">{agentName}</span>
                        </div>
                        <ChevronDown size={14} className="shrink-0" />
                    </button>

                    {openSelectorId === node.id && isEditing && (
                        <AgentSelector
                            value={node.data.agentPath}
                            onChange={({ path }) => updateAgent({ nodeId: node.id, path })}
                            onClose={() => setOpenSelectorId(null)}
                            agentTree={agentTree}
                        />
                    )}
                </div>
            </div>

            {/* Handles/Children */}
            {children}
        </div>
    );
};

export default AgentNode;
