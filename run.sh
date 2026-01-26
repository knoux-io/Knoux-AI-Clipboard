#!/bin/bash
# Quick start script for Knoux Clipboard AI

echo "🚀 Starting Knoux Clipboard AI..."
echo ""

# Check if EXE exists
if [ -f "Knoux-Clipboard-AI-FIXED.exe" ]; then
    echo "✅ Found executable"
    echo ""
    echo "Launching application..."
    echo ""

    # Run the EXE
    ./Knoux-Clipboard-AI-FIXED.exe

    if [ $? -eq 0 ]; then
        echo "✅ Application started successfully"
    else
        echo "❌ Failed to start application"
        exit 1
    fi
else
    echo "❌ Knoux-Clipboard-AI-FIXED.exe not found!"
    echo ""
    echo "Please ensure you're in the correct directory:"
    echo "  F:\Knoux-Clipboard-AI\"
    exit 1
fi
