const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'collaborations',
    version: '1.0.0',
    register: async (server, {
        collaborationsService,
        playlistsService, usersService, validator,
}) => {
        const collaborationHandler = new CollaborationsHandler(
            collaborationsService,
            usersService,
            playlistsService,
            validator,
            
        );
        server.route(routes(collaborationHandler));
    },
};