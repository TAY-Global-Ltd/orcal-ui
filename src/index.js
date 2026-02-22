import TeamBuilder from "./components/TeamBuilder";
import KnowledgeGraph from "./components/KnowledgeGraph";
import DecentralisedTeam from "./components/DecentralisedTeam";

/**
 * See the docs for more info on API versions:
 * https://docs.wsq.io/topics/custom-javascript-components/#api
 * 
 * TeamBuilder Props:
 * - agentTree: Object - Hierarchical structure for agent selection
 * - activeNode: string | null - Currently active/executing agent path (e.g. "Shared/Content Creation/Blog Writer")
 * - currentMessage: { node: string, message: string } | string | null - Message bubble to display
 *   - If object: { node: agentPath to show message on, message: markdown content }
 *   - If string (legacy): shows message on the activeNode
 * - initialNodes: Array - Initial node positions and data
 * - initialEdges: Array - Initial connections between nodes
 * - handleSave: Function - Called when saving the graph
 * - handleView: Function - Called when viewing an agent
 * - handleEdit: Function - Called when editing an agent
 * - initialEditable: boolean - Start in edit mode
 * - handlePrompt: Function - Called when user sends a prompt
 * - isFollowingActive: boolean - External trigger to enable follow mode
 * 
 * Example Usage:
 * ```jsx
 * // NEW API: Show message on "Blog Writer" while "SEO Optimizer" is the active agent
 * // This allows the message to stay on one agent while another becomes active
 * <TeamBuilder
 *   activeNode="Shared/Content Creation/SEO Optimizer"
 *   currentMessage={{
 *     node: "Shared/Content Creation/Blog Writer",
 *     message: "## Waiting for handoff\n\nSEO Optimizer is processing..."
 *   }}
 * />
 * 
 * // NEW API: Show message on the currently active agent
 * <TeamBuilder
 *   activeNode="Shared/Content Creation/Blog Writer"
 *   currentMessage={{
 *     node: "Shared/Content Creation/Blog Writer",
 *     message: "**Generating blog post...**\n\n- Analyzing keywords\n- Creating outline"
 *   }}
 * />
 * 
 * // LEGACY API (still supported): Pass message as string, displays on activeNode
 * <TeamBuilder
 *   activeNode="Shared/Content Creation/Blog Writer"
 *   currentMessage="**Generating blog post...**\n\n- Analyzing keywords"
 * />
 * ```
 * 
 * KnowledgeGraph Props:
 * - data: Object - Root node of the knowledge tree
 *   - id: string - Unique identifier
 *   - label: string - Display name
 *   - category: string - One of: 'root', 'history', 'tech', 'training', 'feature', 'safety'
 *   - content: string - Markdown content for the sidebar
 *   - children: Array<Node> - Child nodes
 * - title: string (optional) - Title displayed in the sidebar header. Defaults to "Wikipedia LLM Explorer".
 * 
 * Example Usage:
 * ```jsx
 * <KnowledgeGraph
 *   data={{
 *     id: 'root',
 *     label: 'Main Topic',
 *     category: 'root',
 *     content: 'This is the main topic content...',
 *     children: []
 *   }}
 * />
 * ```
 * 
 * DecentralisedTeam Props:
 * - agents: Array - List of agent nodes to display
 * - taskQueue: Array - List of tasks to display in the task queue sidebar
 * - agentTree: Object (optional) - Hierarchical structure for agent selection
 * - activeAgentId: string (optional) - ID of the currently active agent
 * - onAgentUpdate: Function (optional) - Handler for agent updates
 * - onAgentView: Function (optional) - Handler for viewing an agent
 * - onTaskClick: Function (optional) - Handler for clicking a task
 * 
 * Example Usage:
 * ```jsx
 * import { DecentralisedTeam } from 'orcal-ui';
 * import { useState, useEffect } from 'react';
 * 
 * function DemoTeam() {
 *   const getInitialTaskQueue = () => [
 *     { id: 't1', title: 'Research Commodity Market', status: 'pending' },
 *     { id: 't2', title: 'Research Equity Market', status: 'pending' },
 *     { id: 't3', title: 'Get position of the trader book', status: 'pending' },
 *     { id: 't4', title: 'Run delta risk of the trader book', status: 'pending' },
 *     { id: 't5', title: 'Run value at risk on the trader book', status: 'pending' },
 *     { id: 't6', title: 'Create a PDF report', status: 'pending' },
 *     { id: 't7', title: 'Email the report', status: 'pending' }
 *   ];
 * 
 *   const [taskQueue, setTaskQueue] = useState(getInitialTaskQueue());
 * 
 *   const [agents] = useState([
 *     { id: 'research-agent', x: 0, y: 0, data: { agentPath: ['Shared', 'Data Analysis', 'Market Trends'] } },
 *     { id: 'risk-agent', x: 0, y: 0, data: { agentPath: ['Shared', 'Data Analysis', 'Risk Agent'] } },
 *     { id: 'report-agent', x: 0, y: 0, data: { agentPath: ['Shared', 'Utility', 'Report Agent'] } }
 *   ]);
 * 
 *   const [isSimulationStarted, setIsSimulationStarted] = useState(false);
 * 
 *   // Simulation of agents picking up tasks and completing them
 *   useEffect(() => {
 *     if (!isSimulationStarted) return;
 * 
 *     const interval = setInterval(() => {
 *       setTaskQueue(currentQueue => {
 *         const newQueue = [...currentQueue];
 *         // 1. Complete any tasks currently 'in-progress' occasionally
 *         newQueue.forEach(t => {
 *           if (t.status === 'in-progress' && Math.random() > 0.5) {
 *             t.status = 'completed';
 *           }
 *         });
 *         
 *         // 2. Assign pending tasks to idle agents
 *         const busyAgentIds = newQueue.filter(t => t.status === 'in-progress').map(t => t.assigneeId);
 *         const idleAgents = agents.filter(a => !busyAgentIds.includes(a.id));
 *         
 *         idleAgents.forEach(agent => {
 *           // Simple logic: pick the first pending task
 *           const nextTask = newQueue.find(t => t.status === 'pending');
 *           if (nextTask) {
 *             nextTask.status = 'in-progress';
 *             nextTask.assigneeId = agent.id;
 *           }
 *         });
 *         
 *         return newQueue;
 *       });
 *     }, 3000); // Process every 3 seconds
 *     return () => clearInterval(interval);
 *   }, [agents, isSimulationStarted]);
 * 
 *   // Active agent could be the one working on the most recently started task
 *   const activeTask = taskQueue.find(t => t.status === 'in-progress');
 *   const activeAgentId = activeTask ? activeTask.assigneeId : null;
 * 
 *   return (
 *     <div style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
 *       <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
 *         <button 
 *           onClick={() => {
 *             if (!isSimulationStarted) setTaskQueue(getInitialTaskQueue());
 *             setIsSimulationStarted(!isSimulationStarted);
 *           }}
 *           style={{
 *             padding: '12px 24px',
 *             backgroundColor: isSimulationStarted ? '#ef4444' : '#0ea5e9',
 *             color: 'white',
 *             border: 'none',
 *             borderRadius: '6px',
 *             cursor: 'pointer',
 *             fontWeight: '600'
 *           }}
 *         >
 *           {isSimulationStarted ? 'Stop Simulation' : 'Start Simulation'}
 *         </button>
 *       </div>
 *       <div style={{ flex: 1, position: 'relative' }}>
 *         <DecentralisedTeam 
 *           agents={agents} 
 *           taskQueue={taskQueue} 
 *           activeAgentId={activeAgentId}
 *         />
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
export default {
    v1: {
        TeamBuilder,
        KnowledgeGraph,
        DecentralisedTeam,
    },
};
