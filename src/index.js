import TeamBuilder from "./components/TeamBuilder";

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
 */
export default {
    v1: {
        TeamBuilder,
    },
};
