/**
 * 
 * @param {import("./options.typedef").RouteOptions} opts
 */
module.exports = ({ express, socket, state }) => {
	socket.on('connection', (client) => {
		state.setState({
			...state.state,
			online: (state.state.online || 0) + 1,
		})
		console.log('connnected')
		client.on('ready', (cb) => {
			cb(state.state);
		});
		client.on('disconnect', () => {
			state.setState({
				...state.state,
				online: (state.state.online || 0) - 1,
			})
		});
		state.subscribe((newValue) => {
			socket.emit('online_change', newValue.online)
		});
	});
}