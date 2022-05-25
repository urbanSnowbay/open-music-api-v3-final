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
        this.postLikeAlbumsHandler = this.postLikeAlbumsHandler.bind(this);
        this.getLikeAlbumsHandler = this.getLikeAlbumsHandler.bind(this);
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
            // const _songs = await this._service.getSongsByAlbumId(id);
            const album = await this._service.getAlbumById(id);

            return successResponse(h, {
                data: {
                    album, 
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

    async postLikeAlbumsHandler(request, h) {
        try {
            const { id: userId } = request.auth.credentials;
            const { id: albumId } = request.params;

            await this._service.getAlbumById(albumId);
            await this._service.addNewAlbumLikes(albumId, userId);

            const response = h.response({
                status: 'success',
                message: 'Like / Unlike berhasil',
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                return failResponse(h, error);
            }

            // Server ERROR!
            return serverErrorResponse(h);
        }
    }

    async getLikeAlbumsHandler(request, h) {
        try {
            const { id: albumId } = request.params;
            const { likes, cache } = await this._service.getAlbumLikes(albumId);

            const response = h.response({
                status: 'success',
                data: {
                    likes,
                },
            });
            response.code(200);
            if (cache) {
                response.header('X-Data-Source', 'cache');
            }
            return response;
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
