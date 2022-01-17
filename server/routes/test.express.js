/**
 * 
 * @param {import("./options.typedef").RouteOptions} opts
 */
module.exports = ({ express, socket, state }) => {
	express.get('*', (request, response) => {
		response.send('yes!');
	})
}