/**
 * 
 * @param {import("./options.typedef").RouteOptions} opts
 */
module.exports = ({ express, socket, state }) => {
	socket.on('connection', (client) => {
		client.on('click', () => {
			state.setState({
				...state.state,
				clicks: (state.state.clicks || 0) + 1
			});
		});
	});

	state.subscribe((newState) => {
		socket.emit('clicks_change', newState.clicks || 0);
	})
}