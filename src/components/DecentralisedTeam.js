import React, { useState } from 'react';
import AgentNode from './AgentNode';
import { Users, LayoutList, CheckCircle2, CircleDashed } from 'lucide-react';
import "../tailwind.css";

/**
 * COMPONENT: DecentralisedTeam
 * Simulates a decentralized pool of agents that appear/disappear based on props.
 * Agents process a shared task queue independently.
 */
function DecentralisedTeam({
    agents = [],
    taskQueue = [],
    agentTree = {},
    activeAgentId = null,
    onAgentUpdate = () => { },
    onAgentView = () => { },
    onTaskClick = () => { }
}) {
    const [openSelectorId, setOpenSelectorId] = useState(null);
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);

    const filteredTaskQueue = showCompletedTasks
        ? taskQueue
        : taskQueue.filter(t => t.status !== 'completed');

    return (
        <div className="flex flex-col h-full min-h-[500px] w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
            {/* Header / Top Bar */}
            <div className="border-b border-slate-200 bg-white flex items-center px-4 justify-between shadow-sm h-14 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-600 rounded text-white">
                        <Users size={18} />
                    </div>
                    <h1 className="font-bold text-lg hidden sm:block">Decentralised Team</h1>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                    <span>{agents.length} Active Agents</span>
                    <span className="w-px h-4 bg-slate-300"></span>
                    <span>{taskQueue.filter(t => t.status === 'pending').length} Tasks Pending</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden flex-col md:flex-row">

                {/* Task Queue Sidebar */}
                <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden shadow-sm z-10">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <LayoutList size={18} className="text-slate-500" />
                            <h2 className="font-semibold text-slate-700">Team Task Queue</h2>
                        </div>
                        <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCompletedTasks}
                                onChange={(e) => setShowCompletedTasks(e.target.checked)}
                                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                            />
                            Show Completed
                        </label>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {filteredTaskQueue.length === 0 ? (
                            <div className="text-center p-8 text-slate-400 text-sm">
                                {taskQueue.length === 0 ? "No tasks in queue. External events will add tasks here." : "No tasks match current filters."}
                            </div>
                        ) : (
                            filteredTaskQueue.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => onTaskClick(task)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${task.status === 'completed'
                                        ? 'bg-slate-50 border-slate-200 opacity-60'
                                        : task.status === 'in-progress'
                                            ? 'bg-blue-50 border-blue-200 shadow-sm'
                                            : 'bg-white border-slate-200 hover:border-purple-300 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-medium text-sm text-slate-800 line-clamp-2">
                                            {task.title}
                                        </h3>
                                        {task.status === 'completed' ? (
                                            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                        ) : task.status === 'in-progress' ? (
                                            <CircleDashed size={16} className="text-blue-500 animate-spin shrink-0" />
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-slate-300 mt-1 shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-end mt-2">
                                        {task.assigneeId && (() => {
                                            const assignedAgent = agents.find(a => a.id === task.assigneeId);
                                            const colour = assignedAgent?.data?.colour;
                                            const name = assignedAgent?.data?.agentPath?.slice(-1)?.[0] || 'Assigned';
                                            return (
                                                <div className="flex items-center gap-[6px] text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 max-w-[120px]">
                                                    {colour && (
                                                        <div
                                                            className="w-[8px] h-[8px] rounded-full shrink-0"
                                                            style={{ backgroundColor: colour }}
                                                        />
                                                    )}
                                                    <span className="truncate block">{name}</span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Agents Grid Area */}
                <div className="flex-1 overflow-y-auto bg-slate-100/50 p-6">
                    {agents.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Users size={48} className="mb-4 opacity-20" />
                            <p className="text-lg font-medium text-slate-500">No Active Agents</p>
                            <p className="text-sm mt-2 max-w-sm text-center">
                                Connect external processes to spawn agents dynamically.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-6 items-start content-start">
                            {agents.map((node) => {
                                const isActive = activeAgentId === node.id || (Array.isArray(activeAgentId) && activeAgentId.includes(node.id));
                                const agentPath = node.data?.agentPath || [];
                                const agentName = agentPath.length > 0
                                    ? agentPath[agentPath.length - 1]
                                    : 'Unassigned Agent';
                                const breadcrumbs = agentPath.slice(0, -1).join(' > ');

                                return (
                                    <div key={node.id} className="transition-all duration-300 animate-in fade-in zoom-in-95">
                                        <AgentNode
                                            node={node}
                                            isActive={isActive}
                                            isRootNode={false}
                                            isEditing={true} // Allow assigning paths if needed
                                            agentName={agentName}
                                            breadcrumbs={breadcrumbs}
                                            agentTree={agentTree}
                                            openSelectorId={openSelectorId}
                                            setOpenSelectorId={setOpenSelectorId}
                                            updateAgent={({ nodeId, path }) => onAgentUpdate(nodeId, path)}
                                            handleView={onAgentView}
                                            isAbsolute={false}
                                            style={{ margin: 0 }}
                                            colour={node.data?.colour}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ({ withBindings }) => withBindings ? withBindings(DecentralisedTeam) : DecentralisedTeam;
