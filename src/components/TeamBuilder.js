import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import "../tailwind.css";
import { Settings, X, Plus, Play, Trash2, ChevronRight, ChevronDown, Check, Users, Save, Pencil, Home, AlertTriangle, Eye, Edit, Send, RotateCcw } from 'lucide-react';

/**
 * MOCK DATA
 * The hierarchical structure for Agents.
 */
const AGENT_TREE = {
    Shared: {
        "Content Creation": ["Blog Writer", "Tweet Generator", "SEO Optimizer"],
        "Data Analysis": ["Market Trends", "Sentiment Analyzer", "Chart Builder"],
        "Utility": ["Translator", "Summarizer"]
    },
    Users: {
        "user_jdoe": ["My Calendar", "Email Sorter"],
        "user_alice": ["Code Reviewer", "Bug Hunter"],
        "team_alpha": ["Sprint Planner", "Jira Sync"]
    }
};

/**
 * UTILS
 */
const generateId = () => Math.random().toString(36).substr(2, 9);

// Custom components for react-markdown styling
const markdownComponents = {
    h1: ({ children }) => <h1 className="text-xl font-bold mb-2 mt-4 first:mt-0">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-semibold mb-1 mt-2 first:mt-0">{children}</h3>,
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="ml-2">{children}</li>,
    code: ({ inline, children }) => 
        inline ? (
            <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
        ) : (
            <code>{children}</code>
        ),
    pre: ({ children }) => (
        <pre className="bg-slate-800 text-slate-100 p-3 rounded text-xs overflow-x-auto my-2">{children}</pre>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
};

// Calculate Bezier curve path
const getEdgePath = (sourceX, sourceY, targetX, targetY) => {
    const deltaX = Math.abs(targetX - sourceX);
    const controlPointOffset = Math.max(deltaX * 0.5, 50);

    return `M ${sourceX} ${sourceY} C ${sourceX + controlPointOffset} ${sourceY}, ${targetX - controlPointOffset} ${targetY}, ${targetX} ${targetY}`;
};

// Check if all nodes are connected (reachable from each other)
const isGraphConnected = (nodes, edges) => {
    if (nodes.length === 0) return true;
    if (nodes.length === 1) return true;
    
    // Build adjacency list (undirected for connectivity check)
    const adjList = {};
    nodes.forEach(node => {
        adjList[node.id] = [];
    });
    
    edges.forEach(edge => {
        adjList[edge.source].push(edge.target);
        adjList[edge.target].push(edge.source); // Make it undirected for connectivity
    });
    
    // BFS to check connectivity
    const visited = new Set();
    const queue = [nodes[0].id];
    visited.add(nodes[0].id);
    
    while (queue.length > 0) {
        const current = queue.shift();
        adjList[current].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        });
    }
    
    return visited.size === nodes.length;
};

// Find root nodes (nodes with no incoming edges)
const findRootNodes = (nodes, edges) => {
    const hasIncomingEdge = new Set();
    edges.forEach(edge => {
        hasIncomingEdge.add(edge.target);
    });
    
    return nodes.filter(node => !hasIncomingEdge.has(node.id));
};

// Validate graph: connected and has exactly one root node
const isGraphValid = (nodes, edges) => {
    if (nodes.length === 0) return true;
    const connected = isGraphConnected(nodes, edges);
    const rootNodes = findRootNodes(nodes, edges);
    return connected && rootNodes.length === 1;
};

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

/**
 * COMPONENT: Speech Bubble
 * Displays markdown content in a speech bubble positioned near a specified node
 * currentMessage: { node: string, message: string } | string | null
 *   - If object: { node: agentPath, message: markdown content }
 *   - If string (legacy): uses activeNode as the target node
 */
const SpeechBubble = ({ activeNode, nodes, nodeHeights, currentMessage, pan, containerRef }) => {
    const [animationState, setAnimationState] = useState('hidden'); // 'hidden', 'appearing', 'visible', 'disappearing'
    const [displayMessage, setDisplayMessage] = useState(null);
    const prevMessageTextRef = useRef(null);
    const bubbleRef = useRef(null);
    
    // Normalize currentMessage: support both string (legacy) and object formats
    const normalizedMessage = typeof currentMessage === 'string' 
        ? { node: activeNode, message: currentMessage }
        : currentMessage;
    
    // Extract node and message from normalized message object
    const messageNode = normalizedMessage?.node;
    const messageText = normalizedMessage?.message;
    
    // Find the node to display the message on
    const targetNodeData = nodes.find(node => messageNode === node.data.agentPath.join('/'));
    
    useEffect(() => {
        const prevMessageText = prevMessageTextRef.current;
        const hasMessage = !!messageText;
        const hadMessage = !!prevMessageText;
        
        if (!hasMessage && !hadMessage) {
            // No message before or after
            setAnimationState('hidden');
            setDisplayMessage(null);
        } else if (!hasMessage && hadMessage) {
            // Message disappeared - animate out
            setAnimationState('disappearing');
            // Force animation to start by triggering reflow
            requestAnimationFrame(() => {
                if (bubbleRef.current) {
                    bubbleRef.current.offsetHeight; // Force reflow
                }
            });
            // After animation completes, hide
            setTimeout(() => {
                setAnimationState('hidden');
                setDisplayMessage(null);
            }, 300); // Match animation duration
        } else if (hasMessage && !hadMessage) {
            // Message appeared - animate in
            setDisplayMessage(normalizedMessage);
            setAnimationState('appearing');
            // After animation completes, set to visible
            setTimeout(() => {
                setAnimationState('visible');
            }, 400); // Match animation duration
        } else if (hasMessage && hadMessage && prevMessageText !== messageText) {
            // Message replaced - no animation, just update
            setDisplayMessage(normalizedMessage);
            setAnimationState('visible');
        } else if (hasMessage && hadMessage && prevMessageText === messageText) {
            // Same message - keep visible
            setDisplayMessage(normalizedMessage);
            if (animationState === 'hidden') {
                setAnimationState('visible');
            }
        }
        
        prevMessageTextRef.current = messageText;
    }, [normalizedMessage, messageNode, messageText]);
    
    if (!messageNode || !displayMessage?.message || animationState === 'hidden') return null;
    if (!targetNodeData) return null;
    
    const nodeHeight = nodeHeights[targetNodeData.id] || 88;
    const bubbleWidth = 640; // Doubled from 320
    const bubbleHeight = 280;
    const nodeWidth = 256; // Node width is 256px
    
    // Position bubble below the target node, aligned with left edge
    const bubbleX = targetNodeData.x; // Align left edges
    const bubbleY = targetNodeData.y + nodeHeight + 20; // Below node with gap
    
    // Triangle position: middle of node (128px from node's left edge, which is bubble's left edge)
    const triangleLeft = nodeWidth / 2; // 128px - middle of node
    
    // Calculate scale origin from node center (for shrink animation)
    const nodeCenterX = targetNodeData.x + nodeWidth / 2;
    const nodeCenterY = targetNodeData.y + nodeHeight / 2;
    // Transform origin relative to the bubble element (0-100%)
    const originX = ((nodeCenterX - bubbleX) / bubbleWidth) * 100;
    const originY = ((nodeCenterY - bubbleY) / bubbleHeight) * 100;
    
    // Calculate the offset needed to shrink toward node center
    // When scaling to 0 at the origin point, we need to translate so the origin point moves to node center
    const offsetX = nodeCenterX - bubbleX;
    const offsetY = nodeCenterY - bubbleY;
    
    // Get animation style based on state
    let animationStyle = {};
    let baseTransform = `translate(${bubbleX}px, ${bubbleY}px)`;
    
    if (animationState === 'appearing') {
        animationStyle = {
            animation: `popOut-${bubbleX}-${bubbleY} 0.4s ease-out forwards`,
        };
    } else if (animationState === 'disappearing') {
        animationStyle = {
            animation: `shrinkIn-${bubbleX}-${bubbleY}-${nodeCenterX}-${nodeCenterY} 0.3s ease-in forwards`,
        };
    }
    
    return (
        <>
            {/* Add keyframes via style tag */}
            <style>{`
                @keyframes popOut-${bubbleX}-${bubbleY} {
                    0% {
                        transform: translate(${bubbleX}px, ${bubbleY}px) scale(0.3);
                        opacity: 0;
                    }
                    80% {
                        transform: translate(${bubbleX}px, ${bubbleY}px) scale(1.05);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${bubbleX}px, ${bubbleY}px) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes shrinkIn-${bubbleX}-${bubbleY}-${nodeCenterX}-${nodeCenterY} {
                    from {
                        transform: translate(${bubbleX}px, ${bubbleY}px) scale(1);
                        opacity: 1;
                    }
                    to {
                        transform: translate(${nodeCenterX}px, ${nodeCenterY}px) scale(0);
                        opacity: 0;
                    }
                }
            `}</style>
            <div
                ref={bubbleRef}
                className="absolute pointer-events-none z-20"
                style={{
                    ...(animationState === 'visible' && !animationStyle.animation ? { transform: baseTransform } : {}),
                    transformOrigin: `${originX}% ${originY}%`,
                    width: `${bubbleWidth}px`,
                    maxHeight: `${bubbleHeight}px`,
                    ...animationStyle,
                }}
            >
                {/* Speech bubble tail pointing upward */}
                <div
                    className="absolute z-10 pointer-events-auto"
                    style={{
                        left: `${triangleLeft}px`,
                        transform: 'translateX(-50%)',
                        top: '-12px',
                        width: 0,
                        height: 0,
                        borderLeft: '12px solid transparent',
                        borderRight: '12px solid transparent',
                        borderBottom: `12px solid ${!activeNode ? '#ffffff' : 'rgba(255, 255, 255, 0.95)'}`,
                        filter: 'drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1))',
                    }}
                />
                
                {/* Speech bubble content */}
                <div
                    className="bg-white rounded-2xl shadow-xl border-slate-300 overflow-hidden pointer-events-auto"
                    style={{
                        backgroundColor: !activeNode ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
                        borderWidth: '3px',
                        maskImage: !activeNode ? 'none' : 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))',
                        WebkitMaskImage: !activeNode ? 'none' : 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))',
                    }}
                >
                    <div
                        className="p-4 overflow-y-auto text-slate-800 text-sm leading-relaxed"
                        style={{
                            maxHeight: `${bubbleHeight}px`,
                        }}
                    >
                        <ReactMarkdown components={markdownComponents}>{displayMessage.message}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * MAIN APP COMPONENT
 */
function TeamBuilder({ 
    agentTree = AGENT_TREE, 
    activeNode, 
    initialNodes = [], 
    initialEdges = [], 
    handleSave, 
    handleView, 
    handleEdit, 
    initialEditable = false, 
    currentMessage, 
    handlePrompt, 
    isFollowingActive: shouldFollow,
    showPrompt = !activeNode
}) {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    // Prompt State
    const [promptInput, setPromptInput] = useState('');
    const [dismissedMessage, setDismissedMessage] = useState(null);

    // Reset dismissed message when content changes
    useEffect(() => {
        setDismissedMessage(null);
    }, [currentMessage]);

    const getMessageText = (msg) => typeof msg === 'string' ? msg : msg?.message;
    const currentMessageText = getMessageText(currentMessage);
    const effectiveMessage = currentMessageText === dismissedMessage ? null : currentMessage;

    const handleSendPrompt = () => {
        if (!promptInput.trim()) return;
        if (handlePrompt) {
            handlePrompt({ prompt: promptInput });
        }
        setPromptInput('');
    };

    // Mode State
    const [isEditing, setIsEditing] = useState(initialEditable);
    const [restorePoint, setRestorePoint] = useState({ nodes: initialNodes, edges: initialEdges });
    const [confirmResetOpen, setConfirmResetOpen] = useState(false);
    const [isFollowingActive, setIsFollowingActive] = useState(true);

    // Sync external following state trigger
    useEffect(() => {
        if (shouldFollow) {
            setIsFollowingActive(true);
        }
    }, [shouldFollow]);

    // Interaction State
    const [draggingNode, setDraggingNode] = useState(null);
    const [connectingSource, setConnectingSource] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    // Initialize pan from sessionStorage to persist across re-renders
    const [pan, setPan] = useState(() => {
        try {
            const saved = sessionStorage.getItem('teambuilder-pan');
            return saved ? JSON.parse(saved) : { x: 0, y: 0 };
        } catch {
            return { x: 0, y: 0 };
        }
    });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    // UI State
    const [openSelectorId, setOpenSelectorId] = useState(null);
    const [nodeHeights, setNodeHeights] = useState({});

    const containerRef = useRef(null);
    const nodeRefs = useRef({});
    const animationFrameRef = useRef(null);
    const panRef = useRef(pan);
    const isAutoPanningRef = useRef(false);
    // Track if we've done the initial pan to the active node
    const initialPanDoneRef = useRef(false);

    // Keep panRef in sync with pan state
    useEffect(() => {
        panRef.current = pan;
    }, [pan]);

    // --- Pan to Active Node ---
    const panToActiveNode = useCallback(() => {
        if (!activeNode || !containerRef.current) return;
        
        const activeNodeData = nodes.find(node => activeNode === node.data.agentPath.join('/'));
        if (!activeNodeData) return;
        
        const nodeHeight = nodeHeights[activeNodeData.id] || 88;
        const nodeWidth = 256;
        const bubbleHeight = 280;
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // Calculate target position: node should be in upper-middle area
        // Leave space below for the speech bubble
        const targetNodeCenterX = containerWidth / 2;
        const targetNodeCenterY = containerHeight * 0.3; // Position at 30% from top instead of 50%
        
        // Calculate required pan to move node center to target position
        const targetPanX = targetNodeCenterX - (activeNodeData.x + nodeWidth / 2);
        const targetPanY = targetNodeCenterY - (activeNodeData.y + nodeHeight / 2);
        
        // Smooth animation - use ref to get current pan value
        const startPan = { ...panRef.current };
        const startTime = performance.now();
        const duration = 600; // 600ms animation
        
        // Mark that we're doing an automatic pan
        isAutoPanningRef.current = true;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            
            const newPan = {
                x: startPan.x + (targetPanX - startPan.x) * eased,
                y: startPan.y + (targetPanY - startPan.y) * eased
            };
            
            setPan(newPan);
            
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                // Animation complete, clear auto-panning flag
                isAutoPanningRef.current = false;
            }
        };
        
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(animate);
    }, [activeNode, nodes, nodeHeights]);

    // Cleanup animation frame on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Auto-follow active node when follow mode is enabled
    useEffect(() => {
        if (isFollowingActive && activeNode) {
            panToActiveNode();
        }
    }, [activeNode, isFollowingActive, panToActiveNode]);

    // Handle initial pan when nodeHeights become available
    // This ensures we pan to the active node after the component has measured node heights
    useEffect(() => {
        // Check if we have node heights measured (object has keys)
        const hasNodeHeights = Object.keys(nodeHeights).length > 0;
        
        if (isFollowingActive && activeNode && hasNodeHeights && !initialPanDoneRef.current) {
            // Mark that we've done the initial pan
            initialPanDoneRef.current = true;
            panToActiveNode();
        }
    }, [nodeHeights, isFollowingActive, activeNode, panToActiveNode]);

    // Reset the initial pan flag when activeNode changes to a different value
    // This allows re-panning when activeNode changes
    useEffect(() => {
        // We don't reset on every activeNode change - the main follow effect handles that
        // This is just for tracking the initial mount scenario
    }, [activeNode]);

    // Disable follow mode when entering edit mode
    useEffect(() => {
        if (isEditing) {
            setIsFollowingActive(false);
        }
    }, [isEditing]);

    // --- Mode Handlers ---
    const handleEditClick = () => {
        // Save restore point when entering edit mode
        setRestorePoint({ nodes: [...nodes], edges: [...edges] });
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        const hasChanges = JSON.stringify(nodes) !== JSON.stringify(restorePoint.nodes) ||
            JSON.stringify(edges) !== JSON.stringify(restorePoint.edges);

        if (hasChanges) {
            setConfirmResetOpen(true);
        } else {
            setIsEditing(false);
        }
    };

    const handleConfirmReset = () => {
        setNodes(restorePoint.nodes);
        setEdges(restorePoint.edges);
        setIsEditing(false);
        setConfirmResetOpen(false);
    };

    const handleSaveClick = useCallback(async () => {
        if (handleSave) {
            const rootNodes = findRootNodes(nodes, edges);
            const rootNodeId = rootNodes.length === 1 ? rootNodes[0].id : null;
            await handleSave({ nodes, edges, rootNodeId });
        }
        setRestorePoint({ nodes: [...nodes], edges: [...edges] });
        setIsEditing(false);
    }, [edges, handleSave, nodes]);

    useEffect(() => {
        if (!confirmResetOpen) return;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setConfirmResetOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [confirmResetOpen]);

    // Persist pan position to sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem('teambuilder-pan', JSON.stringify(pan));
        } catch {
            // Ignore storage errors
        }
    }, [pan]);

    // Measure node heights
    useEffect(() => {
        const heights = {};
        nodes.forEach(node => {
            const nodeElement = nodeRefs.current[node.id];
            if (nodeElement) {
                heights[node.id] = nodeElement.offsetHeight;
            }
        });
        setNodeHeights(heights);
    }, [nodes]);

    // --- Handlers ---

    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        if (e.target.closest('[data-node]')) return;
        setIsPanning(true);
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e) => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        // Adjust mouse pos for logic (subtracting pan not needed for absolute tracking, but needed for relative calc)
        const worldX = x - pan.x;
        const worldY = y - pan.y;

        setMousePos({ x: worldX, y: worldY });

        if (isPanning) {
            setPan({
                x: e.clientX - panStart.x,
                y: e.clientY - panStart.y
            });
            // Disable follow mode when user manually pans (but not during automatic panning)
            if (isFollowingActive && !isAutoPanningRef.current) {
                setIsFollowingActive(false);
            }
            return;
        }

        if (draggingNode) {
            setNodes((nds) =>
                nds.map((n) => {
                    if (n.id === draggingNode.id) {
                        return {
                            ...n,
                            x: worldX - draggingNode.offsetX,
                            y: worldY - draggingNode.offsetY,
                        };
                    }
                    return n;
                })
            );
        }
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
        setConnectingSource(null);
        setIsPanning(false);
    };

    const onNodeDragStart = ({ event: e, node }) => {
        if (!isEditing) return;
        e.stopPropagation();
        // Only drag if not clicking a control
        if (e.target.closest('button') || e.target.closest('.nodrag')) return;

        setDraggingNode({
            id: node.id,
            offsetX: mousePos.x - node.x,
            offsetY: mousePos.y - node.y,
        });
    };

    const onHandleMouseDown = ({ event: e, nodeId, type }) => {
        if (!isEditing) return;
        e.stopPropagation();
        if (type === 'source') {
            const node = nodes.find(n => n.id === nodeId);
            const nodeHeight = nodeHeights[nodeId] || 88; // fallback to approximate height
            setConnectingSource({ 
                nodeId, 
                x: node.x + 256, // Right edge of node
                y: node.y + nodeHeight / 2 // Actual center Y
            });
        }
    };

    const onHandleMouseUp = ({ event: e, nodeId, type }) => {
        e.stopPropagation();
        if (connectingSource && type === 'target' && connectingSource.nodeId !== nodeId) {
            // Create Edge
            const newEdge = {
                id: `e${connectingSource.nodeId}-${nodeId}-${Date.now()}`,
                source: connectingSource.nodeId,
                target: nodeId
            };

            // Check duplicate
            const exists = edges.find(e => e.source === newEdge.source && e.target === newEdge.target);
            if (!exists) {
                setEdges([...edges, newEdge]);
            }
        }
        setConnectingSource(null);
    };

    const deleteNode = ({ id }) => {
        setNodes(nodes.filter(n => n.id !== id));
        setEdges(edges.filter(e => e.source !== id && e.target !== id));
        delete nodeRefs.current[id];
    };

    const deleteEdge = ({ id }) => {
        if (!isEditing) return;
        setEdges(edges.filter(e => e.id !== id));
    };

    const updateAgent = ({ nodeId, path }) => {
        setNodes(nodes.map(n => n.id === nodeId ? { ...n, data: { ...n.data, agentPath: path } } : n));
    };

    const addNode = () => {
        const id = generateId();
        // Calculate center of screen adjusted for pan
        const centerX = (-pan.x + (containerRef.current?.clientWidth || 800) / 2) - 100;
        const centerY = (-pan.y + (containerRef.current?.clientHeight || 600) / 2) - 50;

        setNodes([...nodes, {
            id,
            x: centerX,
            y: centerY,
            data: { label: 'New Node', agentPath: [] }
        }]);
    };

    return (
        <div className="flex flex-col h-full min-h-[500px] w-full bg-slate-100 text-slate-900 font-sans overflow-hidden relative">

            {/* Toolbar */}
            <div
                className="border-b border-slate-200 bg-white flex items-center px-[16px] justify-between z-10 shadow-sm"
                style={{ height: '56px' }}
            >
                <div className="flex items-center gap-[8px]">
                    <div className="p-[8px] bg-indigo-600 rounded text-white"><Users size={18} /></div>
                    <h1 className="font-bold text-[18px] hidden sm:block">Team Builder</h1>
                </div>

                <div className="flex items-center gap-[12px]">
                    {!isEditing && (
                        activeNode ? (
                            <button
                                onClick={() => setIsFollowingActive(!isFollowingActive)}
                                className={`flex items-center gap-[8px] px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm ${
                                    isFollowingActive 
                                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                            >
                                {isFollowingActive ? <Check size={16} /> : <Play size={16} />}
                                Follow Active Agent
                            </button>
                        ) : (
                            effectiveMessage ? (
                                <button
                                    onClick={() => setDismissedMessage(currentMessageText)}
                                    className="flex items-center gap-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
                                >
                                    <RotateCcw size={16} /> Restart
                                </button>
                            ) : (
                                <div className="text-[12px] text-slate-500 hidden md:block">
                                    View Only Mode
                                </div>
                            )
                        )
                    )}

                    {!isEditing ? (
                        <button
                            onClick={handleEditClick}
                            className="flex items-center gap-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
                        >
                            <Pencil size={16} /> Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleCancelClick}
                                className="flex items-center gap-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
                            >
                                <X size={16} /> Cancel
                            </button>
                            <button
                                onClick={handleSaveClick}
                                className="flex items-center gap-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
                            >
                                <Save size={16} /> Save
                            </button>
                            <button
                                onClick={addNode}
                                className="flex items-center gap-[8px] bg-indigo-600 hover:bg-indigo-700 text-white px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
                                style={{ color: '#fff' }}
                            >
                                <Plus size={16} /> Add Node
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Canvas Area */}
            <div
                ref={containerRef}
                className="flex-1 relative overflow-hidden bg-grid-slate-200"
                style={{ cursor: isPanning ? 'grabbing' : 'grab', backgroundSize: '40px 40px' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Transform Container for Pan/Zoom */}
                <div
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px)`,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none' // Let events pass through wrapper
                    }}
                >
                    {/* Edges Layer (SVG) */}
                    <svg className="absolute top-0 left-0 overflow-visible w-full h-full pointer-events-none z-0">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                            </marker>
                            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                            </marker>
                        </defs>

                        {edges.map(edge => {
                            const src = nodes.find(n => n.id === edge.source);
                            const trg = nodes.find(n => n.id === edge.target);
                            if (!src || !trg) return null;

                            // Calculate handle positions based on actual node heights
                            const srcHeight = nodeHeights[edge.source] || 88; // fallback to approximate height
                            const trgHeight = nodeHeights[edge.target] || 88;
                            
                            const sx = src.x + 256; // Width of node is w-64 (256px)
                            const sy = src.y + srcHeight / 2;  // Actual center Y
                            const tx = trg.x;
                            const ty = trg.y + trgHeight / 2;  // Actual center Y

                            const path = getEdgePath(sx, sy, tx, ty);

                            return (
                                <g key={edge.id} className="pointer-events-auto group">
                                    <path
                                        d={path}
                                        strokeWidth="15"
                                        stroke="transparent"
                                        fill="none"
                                        className={isEditing ? "cursor-pointer" : ""}
                                        onClick={() => deleteEdge({ id: edge.id })} // Click fat hidden path to delete
                                    />
                                    <path
                                        d={path}
                                        stroke="#64748b"
                                        strokeWidth="2"
                                        fill="none"
                                        markerEnd="url(#arrowhead)"
                                        className="group-hover:stroke-red-500 transition-colors"
                                    />
                                </g>
                            );
                        })}

                        {/* Temporary Connection Line */}
                        {connectingSource && (
                            <path
                                d={getEdgePath(connectingSource.x, connectingSource.y, mousePos.x, mousePos.y)}
                                stroke="#6366f1"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5,5"
                            />
                        )}
                    </svg>

                    {/* Speech Bubble Layer */}
                    <SpeechBubble
                        activeNode={activeNode}
                        nodes={nodes}
                        nodeHeights={nodeHeights}
                        currentMessage={effectiveMessage}
                        pan={pan}
                        containerRef={containerRef}
                    />

                    {/* Nodes Layer */}
                    <div className="pointer-events-auto w-full h-full">
                        {nodes.map(node => {
                            const isActive = activeNode === node.data.agentPath.join('/');
                            const agentName = node.data.agentPath.length > 0
                                ? node.data.agentPath[node.data.agentPath.length - 1]
                                : 'Select Agent...';

                            const breadcrumbs = node.data.agentPath.slice(0, -1).join(' > ');
                            
                            // Check if this is a root node (only show icon if graph is valid)
                            const rootNodes = findRootNodes(nodes, edges);
                            const graphValid = isGraphValid(nodes, edges);
                            const isRootNode = graphValid && rootNodes.length === 1 && rootNodes[0].id === node.id;

                            return (
                                <div
                                    ref={el => nodeRefs.current[node.id] = el}
                                    data-node="true"
                                    key={node.id}
                                    onMouseDown={(e) => onNodeDragStart({ event: e, node })}
                                    style={{
                                        transform: `translate(${node.x}px, ${node.y}px)`,
                                        width: '256px',
                                        height: 'fit-content',
                                        boxSizing: 'border-box',
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        fontFamily: 'sans-serif'
                                    }}
                                    className={`absolute bg-white rounded-[12px] shadow-lg border-2 transition-shadow duration-200 group flex flex-col ${openSelectorId === node.id ? 'z-50' : 'z-10'}
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
                                                {!isEditing ? (
                                                    handleView && node.data.agentPath.length > 0 && (
                                                        <button
                                                            onClick={() => handleView({ agentPath: node.data.agentPath.join('/') })}
                                                            className="p-[6px] rounded-[6px] text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="View Agent"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                    )
                                                ) : (
                                                    handleEdit && node.data.agentPath.length > 0 && (
                                                        <button
                                                            onClick={() => handleEdit({ agentPath: node.data.agentPath.join('/') })}
                                                            className="p-[6px] rounded-[6px] text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                                            title="Edit Agent"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                    )
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
                                                {isEditing && (
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
                                                <span>{agentName}</span>
                                                <ChevronDown size={14} />
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

                                    {/* Handles */}
                                    {/* Input Handle */}
                                    {isEditing && (
                                        <div
                                            className="absolute group-hover:scale-110 transition-transform pointer-events-none"
                                            style={{
                                                position: 'absolute',
                                                left: '-12px',
                                                right: 'auto',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '24px',
                                                height: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            <div
                                                className="w-[12px] h-[12px] bg-white border-2 border-slate-400 rounded-full hover:border-indigo-500 hover:bg-indigo-50 cursor-crosshair pointer-events-auto"
                                                onMouseUp={(e) => onHandleMouseUp({ event: e, nodeId: node.id, type: 'target' })}
                                            />
                                        </div>
                                    )}

                                    {/* Output Handle */}
                                    {isEditing && (
                                        <div
                                            className="absolute group-hover:scale-110 transition-transform pointer-events-none"
                                            style={{
                                                position: 'absolute',
                                                left: 'auto',
                                                right: '-12px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '24px',
                                                height: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            <div
                                                className="w-[12px] h-[12px] bg-white border-2 border-slate-400 rounded-full hover:border-indigo-500 hover:bg-indigo-50 cursor-crosshair pointer-events-auto"
                                                onMouseDown={(e) => onHandleMouseDown({ event: e, nodeId: node.id, type: 'source' })}
                                            />
                                        </div>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                
                    {/* Prompt Box */}
                    {!isEditing && handlePrompt && showPrompt && !activeNode && (
                        <div 
                            className="absolute w-full max-w-2xl px-4 z-30 pointer-events-none"
                            style={{ 
                                bottom: '24px', 
                                left: '50%', 
                                transform: 'translateX(-50%)' 
                            }}
                        >
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-end gap-2 pointer-events-auto">
                                <textarea
                                    value={promptInput}
                                    onChange={(e) => setPromptInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendPrompt();
                                        }
                                    }}
                                    placeholder="Message Team Builder..."
                                    className="w-full max-h-32 min-h-[44px] py-3 px-4 bg-transparent border-0 focus:ring-0 resize-none text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none"
                                    rows={1}
                                />
                                <button
                                    onClick={handleSendPrompt}
                                    disabled={!promptInput.trim()}
                                    className={`p-2 rounded-xl mb-1 transition-colors ${
                                        promptInput.trim() 
                                            ? 'bg-slate-900 text-white hover:bg-slate-700' 
                                            : 'bg-slate-100 text-slate-300'
                                    }`}
                                    style={promptInput.trim() ? { color: 'white' } : {}}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Info */}
            <div className="h-8 bg-white border-t border-slate-200 flex items-center px-4 text-xs text-slate-400 justify-between">
                <div className="flex items-center gap-2">
                    <span>Team: {nodes.length} Agents, {edges.length} Connections</span>
                    {nodes.length > 0 && !isGraphValid(nodes, edges) && (
                        <div className="flex items-center gap-1 text-amber-600">
                            <AlertTriangle size={14} />
                            <span>
                                {!isGraphConnected(nodes, edges) 
                                    ? 'Warning: Not all nodes are connected'
                                    : findRootNodes(nodes, edges).length !== 1
                                        ? `Warning: Graph must have exactly 1 root node (found ${findRootNodes(nodes, edges).length})`
                                        : 'Warning: Invalid graph structure'
                                }
                            </span>
                        </div>
                    )}
                </div>
                <div>
                    Active: {activeNode || 'None'}
                </div>
            </div>

            {confirmResetOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setConfirmResetOpen(false)}
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="reset-dialog-title"
                        className="relative w-[92%] max-w-[420px] rounded-[12px] bg-white shadow-2xl border border-slate-200 p-[20px] animate-in fade-in zoom-in-95 duration-150"
                    >
                        <div className="flex items-start gap-[12px]">
                            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-red-50 text-red-600">
                                <Trash2 size={18} />
                            </div>
                            <div className="flex-1">
                                <h2 id="reset-dialog-title" className="text-[16px] font-semibold text-slate-900">
                                    Discard unsaved changes?
                                </h2>
                                <p className="mt-[6px] text-[13px] text-slate-600">
                                    This will reset the canvas back to your last saved state.
                                </p>
                            </div>
                        </div>
                        <div className="mt-[18px] flex items-center justify-end gap-[8px]">
                            <button
                                onClick={() => setConfirmResetOpen(false)}
                                className="px-[12px] py-[8px] text-[13px] font-medium text-slate-700 hover:text-slate-900"
                            >
                                Keep Editing
                            </button>
                            <button
                                onClick={handleConfirmReset}
                                className="px-[14px] py-[8px] rounded-[6px] bg-red-600 text-white text-[13px] font-medium hover:bg-red-700 transition-colors"
                            >
                                Reset Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ({ withBindings }) => withBindings(TeamBuilder);

