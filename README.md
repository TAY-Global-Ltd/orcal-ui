# Orcal UI Components

A useful set of UI Components for LLM projects, built with React and designed for multi-agent applications.

## Overview

This library provides production-ready UI components for building and visualizing multi-agent LLM systems. The components are framework-agnostic and can be integrated into any React-based application.

## Demo

🔗 **[Live Demo](https://tay-global-ltd.github.io/orcal-ui/)**


Check out the interactive demo to see the TeamBuilder component in action with a simulated multi-agent workflow.

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

#### Demo

The included `index.html` demonstrates a **simulation button** that shows what the TeamBuilder would look like when used by a multi-agent LLM application. The simulation:

- Steps through a pre-defined workflow sequence
- Highlights active agents
- Displays markdown-formatted messages in speech bubbles
- Shows parallel processing paths converging

This is for demonstration purposes only - in a real application, you would connect the component events to your own agent management system.

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
│   │   └── TeamBuilder.js      # Main TeamBuilder component
│   ├── index.js                # Component exports
│   └── tailwind.css            # Tailwind styles
├── dist/                       # Built assets (generated)
├── index.html                  # Demo page with simulation
├── rollup.config.mjs           # Build configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## Usage Example

```javascript
import components from "./dist/custom-components-main.js";

const { TeamBuilder } = components.v1;

// Your component
function MyApp() {
    const [teamData, setTeamData] = React.useState({
        nodes: [],
        edges: []
    });

    return (
        <TeamBuilder
            // Initial state
            initialNodes={teamData.nodes}
            initialEdges={teamData.edges}
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
                // Save team structure to your backend
                console.log("Saving team:", nodes, edges, rootNodeId);
            }}
            
            handleViewAgent={({ agentPath }) => {
                // Navigate to agent details page
                console.log("View agent:", agentPath);
            }}
            
            handleEditAgent={({ agentPath }) => {
                // Open agent editor
                console.log("Edit agent:", agentPath);
            }}
            
            // Optional: Active agent tracking
            activeNode="Shared/Content Creation/Writer"
            
            // Optional: Display messages from active agent
            currentMessage="# Processing\nAnalyzing content..."
        />
    );
}
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
| `currentMessage` | String | `null` | Markdown message to display from active agent |
| `handleSave` | Function | - | Called when saving: `({ nodes, edges, rootNodeId }) => {}` |
| `handleViewAgent` | Function | - | Called when viewing: `({ agentPath }) => {}` |
| `handleEditAgent` | Function | - | Called when editing: `({ agentPath }) => {}` |

## Technology Stack

- **React 18.2** - UI framework
- **Rollup** - Module bundler
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Icon library
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
import components from "./dist/custom-components-main.js";
const { TeamBuilder } = components.v1;
```

This allows for future API changes while maintaining backward compatibility.

## License

Private package - see `package.json` for details.

## Contributing

This is a private package. For questions or issues, contact the maintainers.
