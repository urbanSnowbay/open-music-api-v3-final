const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
    constructor(service, validator, playlistsService) {
        this._service = service;
        this._validator = validator;
        this._playlistsService = playlistsService;

        this.postExportPlaylistSongHandler = this.postExportPlaylistSongHandler.bind(this);
    }

    async postExportPlaylistSongHandler(request, h) {
        try {
            this._validator.validateExportPlaylistSongPayload(request.payload);

            const { playlistId } = request.params;
            const { id: userId } = request.auth.credentials;
            await this._playlistsService.verifyPlaylistAccess(playlistId, userId);

            const message = {
                playlistId,
                targetEmail: request.payload.targetEmail,
            };

            await this._service.sendMessage('export:playlists', JSON.stringify(message));

            const response = h.response({
                status: 'success',
                message: 'Permintaan Anda sedang kami proses',
            });

            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            return response;
        }
    }
}

module.exports = ExportsHandler;