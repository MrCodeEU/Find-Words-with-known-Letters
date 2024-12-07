#!/bin/bash

CODE_DIR="/srv/findWordsWithKnownLetters" # Mounted volume directory
BUILD_DIR="/srv/findWordsWithKnownLetters/build"
DEBOUNCE_DELAY=5 # Time to wait after changes are detected

# Function to wait for file changes to finish
wait_for_changes_to_finish() {
    echo "Waiting for changes to finish..."
    while inotifywait -r -e modify,create,delete,move "$CODE_DIR" --timeout "$DEBOUNCE_DELAY"; do
        echo "Changes detected, resetting delay..."
    done
    echo "Changes complete. Proceeding with rebuild."
}

# Initial setup
cd "$CODE_DIR"

# Start monitoring the directory
while true; do
    echo "Monitoring $CODE_DIR for changes..."
    inotifywait -r -e modify,create,delete,move "$CODE_DIR"

    # Wait for changes to finish
    wait_for_changes_to_finish

    # Install dependencies
    echo "Installing dependencies..."
    npm install

    # Build the app
    echo "Building the application..."
    npm run build

    # Restart the app with PM2
    echo "Restarting the app with PM2..."
    pm2 restart findWordsWithKnownLetters.config.js
done
