const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'collaborations',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const collaborationHandler = new CollaborationsHandler(service, validator);
        
        server.route(routes(collaborationHandler));
    },
};