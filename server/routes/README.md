## What is this folder
This folder contains routes for both express and socket.io.

## Naming Convention
Files containing express route should be named <name>.express.js and socket.io files should be named <name>.socket.js. Files containing both should be named <name>.express.socket.js

Examples:
A file containing both express routes and socketjs routes that handles requests for client info should be called "client-info.express.socket.js"
---
A file containing only socket event listeners should and sends information about state updates should be called "state-updater.socket.js"

## [options.typedef.js](./options.typedef.js)
This file contains the jsdoc type defintion for all routes to implement to get type access to the loading input. Its called options, however, the values are really fixed.

**A small note on static files:**
Static files will be hosted using Caddy on my server. This is because Caddy is written in Go and much more efficient. I would've written this backend in Go... if I knew it :sob:.
If you're trying to host a multiplayer-clicker-game deployment then you'll need to use Caddy *or some other static file manager and reverse proxy software*. Additionally, you could add a route that serve the static.