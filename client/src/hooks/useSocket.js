import { useEffect, useState } from "react";
import { io } from "socket.io-client";

/**
 * 
 * @param {Object} options Options variable
 * @param {string} [options.url=window.location] The location to attempt to connect a socket
 * @param {Partial<import("socket.io-client").ManagerOptions & import("socket.io-client").SocketOptions>} [options.options={}] The options object to pass to io
 * @returns {[import("socket.io-client").Socket, isSocketSafe, runSafely, boolean]}
 */
const useSocket = ({ url = window.location, options = {}, }) => {
	/**
	 * @type {[import('socket.io-client').Socket | null, ]}
	 */
	const [socket, setSocket] = useState(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		if (!socket) setSocket(io(url, options));
		if (!socket) return;
		setConnected(socket.connected);
		socket.on('connect', () => {
			console.log('conn')
			setConnected(true);
		});
	}, [socket, url, options]);

	/**
	 * Checks if the socket is safe, this is a separate function for the case of maintainability
	 * @returns {boolean} Is the socket safe to make calls on?
	 */
	const isSocketSafe = () => {
		return socket !== null && socket.connected;
	}

	/**
	 * @callback safeSocketCallback
	 * @param {import("socket.io-client").Socket} socket The current socket value
	 * @param {boolean} safe Is the socket safe to make calls on?
	 * @returns {any}
	 */

	/**
	 * A function which will take in some function, call it only if socket is safe to use, additionally you can provide the "always" parameter and it will always fire but it will tell the function if it is safe via a parameter
	 * @param {safeSocketCallback} fn A function to pass the socket and should use? to
	 * @param {boolean} [always=false] Should the function always fire?
	 * @returns {any}
	 */
	const runSafely = (fn=()=>{}, always=false) => {
		let safe = isSocketSafe(); // Just so I only have to run this once lol
		if (always) return fn(socket, safe);
		if (safe) return fn(socket, safe);
		return null;
	};

	return [
		socket,
		isSocketSafe,
		runSafely,
		connected, // This is useful for forcing a re-render upon connection status changing
	];
};

export default useSocket;