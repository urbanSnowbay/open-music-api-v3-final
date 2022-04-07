const ClientError = require('../../exceptions/ClientError');
const { successResponse, failResponse, serverErrorResponse } = require('../../utils/responseHandler');

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        // Agar this nya merujuk pada instance dari SongsService bukan object route
        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    async postAlbumHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { name, year } = request.payload;

            const _albumId = await this._service.addAlbum({ name, year });
    
            return successResponse(h, {
                message: 'Album berhasil ditambahkan',
                data: {
                    albumId: _albumId,
                },
                responseCode: 201,
            });
        } catch (error) {
            if (error instanceof ClientError) {
                return failResponse(h, error);
            }

            // Server ERROR!
            return serverErrorResponse(h);
        }
    }

    async getAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const _songs = await this._service.getSongsByAlbumId(id);
            const _album = await this._service.getAlbumById(id);

            return successResponse(h, {
                data: {
                    album: {
                        ..._album,
                        songs: _songs,
                    },
                },
            });
        } catch (error) {
            if (error instanceof ClientError) {
                return failResponse(h, error);
            }

            // Server ERROR!
            return serverErrorResponse(h);
        }
    }

    async putAlbumByIdHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { id } = request.params;

            await this._service.editAlbumById(id, request.payload);
            
            return successResponse(h, {
                message: 'Detail album berhasil diperbarui',
            });
        } catch (error) {
            if (error instanceof ClientError) {
                return failResponse(h, error);
            }

            // Server ERROR!
            return serverErrorResponse(h);
        }
    }

    async deleteAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteAlbumById(id);

            return successResponse(h, {
                message: 'Album berhasil dihapus',
            });
        } catch (error) {
            if (error instanceof ClientError) {
                return failResponse(h, error);
            }

            // Server ERROR!
            return serverErrorResponse(h);
        }
    }
}

module.exports = AlbumsHandler;
