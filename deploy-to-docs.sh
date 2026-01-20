#!/bin/bash

# Deploy to docs folder for GitHub Pages
# This script copies the demo files and updates paths

set -e  # Exit on error

echo "🚀 Deploying to docs folder..."

# Create docs directory if it doesn't exist
mkdir -p docs

# Copy index.html to docs
echo "📄 Copying index.html..."
cp index.html docs/index.html

# Copy dist files directly to docs
echo "📦 Copying dist files..."
cp dist/orcal-ui.js docs/
cp dist/manifest.json docs/

# Update import path in docs/index.html
echo "✏️  Updating import path..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS requires empty string after -i
    sed -i '' 's|import components from "./dist/orcal-ui.js";|import components from "./orcal-ui.js";|g' docs/index.html
else
    # Linux
    sed -i 's|import components from "./dist/orcal-ui.js";|import components from "./orcal-ui.js";|g' docs/index.html
fi

echo "✅ Deployment complete!"
echo ""
echo "📁 Files copied to docs/:"
echo "   - index.html"
echo "   - orcal-ui.js"
echo "   - manifest.json"
echo ""
echo "🌐 Your demo is ready for GitHub Pages!"
echo "   Push the docs/ folder to GitHub to see it live."

