/* Berkas ini menampung kode untuk membuat, mengonfigurasi, dan menjalankan HTTP server menggunakan Hapi. */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');
const albums = require('./api/album');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/album');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();

    const server = Hapi.server({
    // port: 5000,
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
    {
        plugin: albums,
        options: {
            service: albumsService,
            validator: AlbumsValidator,
        },
    }, 
    {
        plugin: songs,
        options: {
            service: songsService,
            validator: SongsValidator,
        },
    },
]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
