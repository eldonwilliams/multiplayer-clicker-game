const socketio = require("socket.io");

/**
 * @typedef {Object} RouteOptions This options class is what all routes use to get type annotations in VSCode, I would use TypeScript but I'm lazy.
 * @property {import("express").Application} express The express.js app/server created in index.js
 * @property {socketio.Server} socket The socket.io server created in index.js
 * @property {import("jstates").JstateInstance} state The sharable state created in index.js 
 */

/**
 * @param {RouteOptions} opts
 */
module.exports = ({ express, socket, state }) => {
    // It works!
};