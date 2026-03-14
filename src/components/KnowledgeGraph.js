import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import "../tailwind.css";
import {
    Network,
    History,
    Cpu,
    Database,
    ShieldAlert,
    Zap,
    ChevronRight,
    BookOpen,
    ArrowRight,
    Plus,
    Minus,
    Move
} from 'lucide-react';

const KnowledgeGraph = ({
    data,
    title = "Wikipedia LLM Explorer",
    categoryColors
}) => {
    const [selectedNodeId, setSelectedNodeId] = useState(data?.id);
    const [expandedNodes, setExpandedNodes] = useState(new Set([data?.id]));
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const hasCategoryColors = !!(categoryColors && Object.keys(categoryColors).length > 0);
    const getCategoryColor = (category) => (hasCategoryColors ? categoryColors?.[category] : undefined);

    const canvasRef = useRef(null);
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Flatten tree for spatial layout
    const graphNodes = useMemo(() => {
        const list = [];
        const flatten = (node, x, y, angleStart, angleEnd, depth) => {
            const isExpanded = expandedNodes.has(node.id);
            list.push({ ...node, x, y, isExpanded, depth });

            if (isExpanded && node.children) {
                const count = node.children.length;
                const slice = (angleEnd - angleStart) / count;
                const radius = 240 - (depth * 15);

                node.children.forEach((child, i) => {
                    const angle = angleStart + (slice * i) + (slice / 2);
                    const nextX = x + Math.cos(angle) * radius;
                    const nextY = y + Math.sin(angle) * radius;
                    flatten(child, nextX, nextY, angle - slice / 2, angle + slice / 2, depth + 1);
                });
            }
        };
        if (data) flatten(data, 0, 0, 0, Math.PI * 2, 0);
        return list;
    }, [expandedNodes]);

    const selectedNode = useMemo(() => {
        const findInTree = (node) => {
            if (node.id === selectedNodeId) return node;
            if (node.children) {
                for (const child of node.children) {
                    const found = findInTree(child);
                    if (found) return found;
                }
            }
            return null;
        };
        return findInTree(data);
    }, [selectedNodeId]);

    // Center on node when selected (with animation)
    useEffect(() => {
        const node = graphNodes.find(n => n.id === selectedNodeId);
        if (node) {
            setShouldAnimate(true);
            setOffset({ x: -node.x, y: -node.y });
        }
    }, [selectedNodeId]);

    const handleNodeClick = (id) => {
        setSelectedNodeId(id);
        setExpandedNodes(prev => {
            const next = new Set(prev);
            if (!next.has(id)) {
                next.add(id);
            }
            return next;
        });
    };

    // Improved Panning Logic
    const handleMouseDown = (e) => {
        if (e.target === canvasRef.current || e.target.closest('.pan-area')) {
            setIsDragging(true);
            setShouldAnimate(false); // Disable animation during manual drag
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const dx = (e.clientX - lastMousePos.current.x) / zoom;
        const dy = (e.clientY - lastMousePos.current.y) / zoom;

        setOffset(prev => ({
            x: prev.x + dx,
            y: prev.y + dy
        }));

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const findParent = (childId, node = data) => {
        if (node.children) {
            if (node.children.some(c => c.id === childId)) return node;
            for (const child of node.children) {
                const p = findParent(childId, child);
                if (p) return p;
            }
        }
        return null;
    };

    return (
        <div
            className="flex h-full w-full bg-zinc-50 text-zinc-900 font-sans overflow-hidden transition-colors duration-500"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >

            {/* SIDEBAR: Light Theme */}
            <div className="w-96 bg-white border-r border-zinc-200 flex flex-col z-20 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-600 rounded-lg shadow-lg shadow-violet-200">
                            <Network size={20} className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-zinc-900">Concept Map</h1>
                            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{title}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                    {selectedNode ? (
                        <div className="p-8 animate-in fade-in slide-in-from-left-4 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <span
                                    className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest border"
                                    style={{
                                        backgroundColor: getCategoryColor(selectedNode.category) ? `${getCategoryColor(selectedNode.category)}10` : 'transparent',
                                        color: getCategoryColor(selectedNode.category) || '#18181b',
                                        borderColor: getCategoryColor(selectedNode.category) ? `${getCategoryColor(selectedNode.category)}20` : '#d4d4d8'
                                    }}
                                >
                                    {selectedNode.category}
                                </span>
                                {findParent(selectedNode.id) && (
                                    <span className="text-zinc-400 text-xs flex items-center gap-1">
                                        <ChevronRight size={12} className="w-3 h-3" />
                                        {findParent(selectedNode.id).label}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-extrabold mb-6 leading-tight tracking-tight text-zinc-900">
                                {selectedNode.label}
                            </h2>

                            <div className="prose prose-zinc max-w-none">
                                <ReactMarkdown className="text-zinc-600 leading-relaxed text-lg mb-8">
                                    {selectedNode.content}
                                </ReactMarkdown>
                            </div>

                            {selectedNode.children && (
                                <div className="mt-10">
                                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        Sub-Dimensions <div className="h-px flex-1 bg-zinc-100" />
                                    </h3>
                                    <div className="grid gap-2">
                                        {selectedNode.children.map(child => (
                                            <button
                                                key={child.id}
                                                onClick={() => handleNodeClick(child.id)}
                                                className="group flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCategoryColor(child.category) || '#18181b' }} />
                                                    <span className="text-sm font-semibold text-zinc-700 group-hover:text-zinc-900 transition-colors">{child.label}</span>
                                                </div>
                                                <Plus size={14} className="text-zinc-300 group-hover:text-zinc-500 transition-transform group-hover:rotate-90 w-3.5 h-3.5" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                                <BookOpen size={32} className="text-zinc-300 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">Select a Topic</h3>
                            <p className="text-zinc-400 text-sm">Pick a node on the map to explore its underlying principles and history.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* GRAPH CANVAS: Light Theme + Reactive Panning */}
            <div
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                className={`flex-1 relative bg-zinc-50 overflow-hidden select-none cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
            >
                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none pan-area">
                    <div className="h-full w-full opacity-40" style={{ backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                </div>

                {/* The Graph Layer */}
                <div
                    className={`absolute inset-0 pointer-events-none ${shouldAnimate ? 'transition-transform duration-700 ease-in-out' : ''}`}
                    style={{
                        transform: `scale(${zoom}) translate(calc(50% + ${offset.x}px), calc(50% + ${offset.y}px))`,
                        transformOrigin: '0 0'
                    }}
                >
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 overflow-visible pointer-events-none">
                        {graphNodes.map(node => {
                            const parent = graphNodes.find(n => n.children?.some(c => c.id === node.id));
                            if (!parent) return null;
                            return (
                                <line
                                    key={`line-${node.id}`}
                                    x1={parent.x} y1={parent.y}
                                    x2={node.x} y2={node.y}
                                    stroke={getCategoryColor(node.category) || '#d4d4d8'}
                                    strokeWidth="2.5"
                                    strokeOpacity="0.15"
                                    strokeDasharray="4 4"
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes */}
                    {graphNodes.map(node => (
                        <div
                            key={node.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNodeClick(node.id);
                            }}
                            className={`
                        absolute cursor-pointer transition-all duration-300 ease-out
                        flex items-center justify-center rounded-full border-2 
                        group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                        pointer-events-auto
                        ${selectedNodeId === node.id ? 'z-20 scale-110 shadow-xl' : 'scale-100 z-10'}
                    `}
                            style={{
                                width: Math.max(90, 140 - node.depth * 20),
                                height: Math.max(90, 140 - node.depth * 20),
                                left: node.x,
                                top: node.y,
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: selectedNodeId === node.id && getCategoryColor(node.category) ? getCategoryColor(node.category) : 'white',
                                borderColor: selectedNodeId === node.id
                                    ? (getCategoryColor(node.category) ? 'transparent' : '#111827')
                                    : (getCategoryColor(node.category) ? `${getCategoryColor(node.category)}40` : '#d4d4d8'),
                            }}
                        >
                            <div className="flex flex-col items-center p-3 text-center">
                                <span className={`
                            text-[11px] md:text-xs font-bold leading-tight
                            ${selectedNodeId === node.id && getCategoryColor(node.category) ? 'text-white' : 'text-zinc-700 group-hover:text-zinc-900'}
                        `}>
                                    {node.label}
                                </span>

                                {node.children && (
                                    <div className={`
                                mt-1.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter
                                ${selectedNodeId === node.id && getCategoryColor(node.category) ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'}
                            `}>
                                        {expandedNodes.has(node.id) ? 'Collapse' : `+${node.children.length}`}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Controls */}
                <div className="absolute bottom-8 right-8 !left-auto !top-auto !w-fit !h-fit flex flex-col gap-3">
                    <div className="flex bg-white/90 backdrop-blur-md border border-zinc-200 rounded-2xl p-1 shadow-lg shadow-zinc-200/50">
                        <button
                            onClick={() => {
                                setShouldAnimate(true);
                                setZoom(prev => Math.min(prev + 0.2, 2));
                            }}
                            className="p-3 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900"
                            title="Zoom In"
                        >
                            <Plus size={18} className="w-[18px] h-[18px]" />
                        </button>
                        <div className="w-px h-6 bg-zinc-200 self-center" />
                        <button
                            onClick={() => {
                                setShouldAnimate(true);
                                setZoom(prev => Math.max(prev - 0.2, 0.5));
                            }}
                            className="p-3 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900"
                            title="Zoom Out"
                        >
                            <Minus size={18} className="w-[18px] h-[18px]" />
                        </button>
                        <div className="w-px h-6 bg-zinc-200 self-center" />
                        <button
                            onClick={() => {
                                setShouldAnimate(true);
                                setOffset({ x: 0, y: 0 });
                            }}
                            className="p-3 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900"
                            title="Reset View"
                        >
                            <Move size={18} className="w-[18px] h-[18px]" />
                        </button>
                    </div>

                    {hasCategoryColors && (
                        <div className="bg-white/90 backdrop-blur-md border border-zinc-200 rounded-2xl p-4 shadow-lg shadow-zinc-200/50">
                            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Key</h4>
                            <div className="space-y-2">
                                {Object.entries(categoryColors).map(([cat, color]) => (
                                    <div key={cat} className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                                        <span className="text-[11px] font-bold text-zinc-500 capitalize">{cat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Top Hint */}
                <div className="absolute top-8 right-8 !left-auto !bottom-auto !w-fit !h-fit bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
                    <Move size={14} className="text-zinc-400 w-3.5 h-3.5" />
                    <span className="whitespace-nowrap">Drag background to pan</span>
                </div>
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d8;
        }
        .cursor-grab { cursor: grab; }
        .cursor-grabbing { cursor: grabbing; }
      `}</style>
        </div>
    );
};

export default ({ withBindings }) => withBindings(KnowledgeGraph);
