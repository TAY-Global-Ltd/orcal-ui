# Orcal UI Components

A useful set of UI Components for LLM projects, built with React and designed for multi-agent applications.

## Overview

This library provides production-ready UI components for building and visualizing multi-agent LLM systems. The components are framework-agnostic and can be integrated into any React-based application.

## Demo

🔗 **[Live Demo](https://tay-global-ltd.github.io/orcal-ui/)**

Check out the interactive demo to see all components in action, including a simulated multi-agent workflow, knowledge graph explorer, decentralised agent pool, and dependency graph visualizer.

## Components

### TeamBuilder

A full-featured interactive node graph editor designed for **building teams of agents**, not workflows. The TeamBuilder component provides a visual interface for organizing and connecting agents in a hierarchical structure.

#### Key Features

- **Visual Team Organization**: Drag-and-drop interface for arranging agents
- **Hierarchical Agent Selection**: Navigate through agent trees (Shared/Users) with nested categories
- **Real-time Simulation**: Watch active agent execution with animated speech bubbles showing agent output
- **Edit & View Modes**: Toggle between editing team structure and viewing execution
- **Follow Mode**: Auto-follow active agents during execution
- **Connection Management**: Create connections between agents with visual Bezier curves
- **Validation**: Automatic graph validation (connectivity, single root node)
- **Markdown Support**: Rich text rendering in agent messages with code blocks, lists, and formatting

#### Important: Event-Based Architecture

The TeamBuilder component is designed to **trigger events** rather than handle business logic:

- `handleViewAgent`: Triggered when viewing an agent (owner implements navigation/display logic)
- `handleEditAgent`: Triggered when editing an agent (owner implements edit functionality)
- `handleSave`: Triggered when saving team structure (owner implements persistence)

**The actual handling of these events should be done by the owner of this component.** TeamBuilder is purely a UI component that emits events - it does not manage agents, persist data, or execute workflows.

### KnowledgeGraph

A tree-based knowledge visualization component with a radial layout for exploring hierarchical data.

#### Key Features

- **Radial Node Layout**: Expandable/collapsible nodes arranged in a radial tree
- **Pan & Zoom**: Navigate large knowledge trees with zoom controls and dragging
- **Sidebar Content Panel**: View selected node content with markdown rendering
- **Category Colors**: Optional color-coded categories with a legend
- **Reset View**: Snap back to the default viewport

### DecentralisedTeam

Visualizes a decentralized pool of agents processing a shared task queue, as an alternative to the hierarchical TeamBuilder.

#### Key Features

- **Task Queue Sidebar**: View pending, in-progress, and completed tasks with status badges
- **Agent Grid**: Visual layout of agents with animated activity indicators
- **Real-time Task Assignment**: Watch agents pick up and complete tasks
- **Show/Hide Completed**: Toggle visibility of completed tasks

### NodeBrowser

An interactive dependency graph visualizer for exploring function call relationships within objects. Built on D3.js force simulation.

#### Key Features

- **Force-Directed Graph**: D3.js physics simulation for automatic node layout
- **Object Grouping**: Convex hull grouping of functions by parent object with color coding
- **Detail Panel**: View object details and click through to individual functions
- **Search**: Fuzzy search across all nodes with keyboard shortcut (`/`)
- **Path Finding**: Highlight the call path between any two nodes
- **Hover Info**: Overlay showing node details on hover
- **Zoom Controls**: Zoom in/out and home button to snap to root node
- **Collapsible Legend**: Object category legend panel

## Installation

```bash
npm install
```

## Development

Start the development server with hot reloading:

```bash
npm start
```

This will:
- Start a development server on port 10001 (configurable via `DEV_SERVER_PORT`)
- Enable hot reloading of changes
- Serve the demo at `http://localhost:10001`

## Production Build

Build optimized production bundles:

```bash
npm run build
```

This generates:
- Hashed filenames for cache busting
- Minified JavaScript
- Optimized CSS with Tailwind
- Source maps
- Manifest file for asset tracking

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── TeamBuilder.js          # Hierarchical team graph editor
│   │   ├── KnowledgeGraph.js       # Radial knowledge tree visualization
│   │   ├── DecentralisedTeam.js    # Decentralized agent pool
│   │   ├── AgentNode.js            # Individual agent node component
│   │   └── NodeBrowser/            # Dependency graph visualizer
│   │       ├── index.js            # Main component
│   │       ├── hooks/              # useD3, useGraphData, useSearch, useSimulation
│   │       ├── interactions/       # D3 click/hover handlers
│   │       ├── ui/                 # Header, Legend, DetailPanel, SearchModal, etc.
│   │       └── utils/              # Colors, labels, hull math, fuzzy search
│   ├── index.js                    # Component exports
│   └── tailwind.css                # Tailwind styles
├── dist/                           # Built assets (generated)
├── docs/                           # GitHub Pages demo (generated)
├── index.html                      # Demo page
├── rollup.config.mjs               # Build configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── package.json                    # Dependencies and scripts
```

## Usage Example

```javascript
import components from "./dist/orcal-ui.js";

const { TeamBuilder, KnowledgeGraph, DecentralisedTeam, NodeBrowser } = components.v1;
```

### TeamBuilder

```jsx
<TeamBuilder
    // Initial state
    initialNodes={[]}
    initialEdges={[]}
    initialEditable={false}

    // Agent tree structure
    agentTree={{
        Shared: {
            "Content Creation": ["Writer", "Editor"],
            "Analysis": ["Analyzer", "Reviewer"]
        },
        Users: {
            "user_jdoe": ["Assistant", "Helper"]
        }
    }}

    // Event handlers (implement your own logic)
    handleSave={({ nodes, edges, rootNodeId }) => {
        console.log("Saving team:", nodes, edges, rootNodeId);
    }}
    handleViewAgent={({ agentPath }) => {
        console.log("View agent:", agentPath);
    }}
    handleEditAgent={({ agentPath }) => {
        console.log("Edit agent:", agentPath);
    }}

    // Optional: Active agent tracking
    activeNode="Shared/Content Creation/Writer"

    // Optional: Display messages from active agent
    currentMessage="# Processing\nAnalyzing content..."
/>
```

### KnowledgeGraph

```jsx
<KnowledgeGraph
    title="Knowledge Explorer"
    data={{
        id: "root",
        label: "Root Topic",
        category: "root",
        content: "Top-level overview.",
        children: [
            {
                id: "child1",
                label: "Subtopic",
                category: "tech",
                content: "Details about this subtopic.",
                children: []
            }
        ]
    }}
    categoryColors={{
        root: "#6366f1",
        tech: "#3b82f6"
    }}
/>
```

### DecentralisedTeam

```jsx
<DecentralisedTeam
    teamName="Research Pool"
    agents={[
        { id: "a1", x: 100, y: 100, data: { agentPath: ["Shared", "Analysis", "Researcher"], colour: "#3b82f6" } }
    ]}
    taskQueue={[
        { id: "t1", title: "Analyze dataset", status: "pending", assigneeId: null }
    ]}
    activeAgentId="a1"
    onAgentUpdate={(agent) => console.log("Agent updated:", agent)}
    onAgentView={(agent) => console.log("View agent:", agent)}
    onTaskClick={(task) => console.log("Task clicked:", task)}
/>
```

### NodeBrowser

```jsx
<NodeBrowser
    data={{
        root: "myModule",
        objects: [
            { id: "obj1", label: "UserService", path: "api/services" }
        ],
        functions: [
            { id: "fn1", label: "getUser", object: "obj1" }
        ],
        calls: [
            { source: "fn1", target: "fn2" }
        ]
    }}
    pathColors={{
        "api": "#3b82f6",
        "utils": "#10b981"
    }}
    onRefresh={() => console.log("Refresh graph")}
    onNodeClick={(node) => {
        console.log("Node clicked:", node);
        return "## Details\nMore info about this node.";
    }}
/>
```

## Component Props

### TeamBuilder

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `agentTree` | Object | Built-in tree | Hierarchical structure of available agents |
| `initialNodes` | Array | `[]` | Initial nodes in the graph |
| `initialEdges` | Array | `[]` | Initial connections between nodes |
| `initialEditable` | Boolean | `false` | Start in edit mode |
| `activeNode` | String | `null` | Path of currently active agent (e.g., "Shared/Content/Writer") |
| `currentMessage` | String\|Object | `null` | Markdown message string, or `{ node, message }` object |
| `handleSave` | Function | - | Called when saving: `({ nodes, edges, rootNodeId }) => {}` |
| `handleViewAgent` | Function | - | Called when viewing: `({ agentPath }) => {}` |
| `handleEditAgent` | Function | - | Called when editing: `({ agentPath }) => {}` |

### KnowledgeGraph

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Object | - | Root node with `id`, `label`, `category`, `content`, `children` |
| `title` | String | `"Wikipedia LLM Explorer"` | Sidebar title |
| `categoryColors` | Object | Built-in colors | Map of category names to hex colors |

### DecentralisedTeam

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `teamName` | String | - | Team display name |
| `agents` | Array | - | Agent objects with `id`, `x`, `y`, `data` |
| `taskQueue` | Array | - | Tasks with `id`, `title`, `status`, `assigneeId` |
| `agentTree` | Object | - | Optional hierarchical agent structure |
| `activeAgentId` | String | `null` | Currently active agent ID |
| `onAgentUpdate` | Function | - | Called when agent is updated |
| `onAgentView` | Function | - | Called when viewing an agent |
| `onTaskClick` | Function | - | Called when a task is clicked |

### NodeBrowser

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Object | - | Graph data with `root`, `objects[]`, `functions[]`, `calls[]` |
| `pathColors` | Object | - | Map of root paths to hex colors |
| `onRefresh` | Function | - | Optional callback for regenerating the graph |
| `onNodeClick` | Function | - | Optional callback when a function node is clicked; can return markdown content |
| `specialLabels` | Object | - | Map of node IDs to `{ label, opacity }` for custom labels |

## Technology Stack

- **React 18.2** - UI framework
- **D3.js** - Force simulation and graph visualization (dynamically loaded)
- **Rollup** - Module bundler
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering
- **Babel** - JavaScript compiler
- **PostCSS** - CSS processor

## Browser Support

Modern browsers with ES6+ support:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## API Versioning

Components are exported under versioned namespaces:

```javascript
import components from "./dist/orcal-ui.js";
const { TeamBuilder, KnowledgeGraph, DecentralisedTeam, NodeBrowser } = components.v1;
```

This allows for future API changes while maintaining backward compatibility.

## License

Private package - see `package.json` for details.

## Contributing

This is a private package. For questions or issues, contact the maintainers.
