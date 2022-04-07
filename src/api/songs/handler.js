const ClientError = require('../../exceptions/ClientError');
const { successResponse, failResponse, serverErrorResponse } = require('../../utils/responseHandler');

class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        // Agar this nya merujuk pada instance dari SongsService bukan object route
        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { 
                title, year, genre, performer, duration, albumId = '',
            } = request.payload;

            const _songId = await this._service.addSong({
                title, year, genre, performer, duration, albumId,
            });
    
            return successResponse(h, {
                message: 'Lagu berhasil ditambahkan',
                data: {
                    songId: _songId,
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

    async getSongsHandler(request, h) {
        const { title, performer } = request.query;
        const songs = await this._service.getSongs();

        let filteredSong = songs;
        
        if (title && performer) {
            filteredSong = songs.filter(
                (song) => (song.title.toLowerCase().includes(title.toLowerCase())
                && song.performer.toLowerCase().includes(performer.toLowerCase())),
            );
        } if (title) {
            filteredSong = songs.filter(
                (song) => song.title.toLowerCase().includes(title.toLowerCase()),
            );
        } if (performer) {
            filteredSong = songs.filter(
                (song) => song.performer.toLowerCase().includes(performer.toLowerCase()),
            );
        }

        return successResponse(h, {
            data: {
                songs: filteredSong.map((song) => ({
                    id: song.id,
                    title: song.title,
                    performer: song.performer,
                })),
            },
        });
    }

    async getSongByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const songs = await this._service.getSongById(id);

            return successResponse(h, {
                data: {
                    song: songs,
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

    async putSongByIdHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { id } = request.params;
            await this._service.editSongById(id, request.payload);

            return successResponse(h, {
                message: 'Lagu berhasil diperbarui',
            });
        } catch (error) {
            if (error instanceof ClientError) {
                return failResponse(h, error);
            }

            // Server ERROR!
            return serverErrorResponse(h);
        }
    }

    async deleteSongByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteSongById(id);

            return successResponse(h, { 
                message: 'Lagu berhasil dihapus',
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

module.exports = SongsHandler;
