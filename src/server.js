/* Berkas ini menampung kode untuk membuat, mengonfigurasi, dan menjalankan HTTP server menggunakan Hapi. */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');

const albums = require('./api/album');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/album');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const playlists = require('./api/playlists');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications');
const TokenManager = require('./tokenize/tokenManager');

const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validator/collaborations');

const playlistSongs = require('./api/playlistsongs');
const PlaylistSongsService = require('./services/postgres/PlaylistsSongsService');
const PlaylistSongsValidator = require('./validator/playlistssongs');

const playlistActivities = require('./api/playlist-activities');
const PlaylistsActivitiesService = require('./services/postgres/PlaylistsActivitiesService');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
    const collaborationsService = new CollaborationsService();
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
    const playlistsService = new PlaylistsService(collaborationsService);
    const playlistSongsService = new PlaylistSongsService();
    const playlistActivitiesService = new PlaylistsActivitiesService();

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

    // Registrasi plugin eksternal
    await server.register([
        {
            plugin: Jwt,
        },
    ]);

    // mendefinisikan strategy autentikasi jwt
    server.auth.strategy('openmusicsapp_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            creedentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
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
    {
        plugin: users,
        options: {
            service: usersService,
            validator: UsersValidator,
        },
    },
    {
        plugin: authentications,
        options: {
            authenticationsService,
            usersService,
            tokenManager: TokenManager,
            validator: AuthenticationsValidator,
        },
    },
    {
        plugin: collaborations,
        options: {
            collaborationsService,
            playlistsService,
            usersService,
            validator: CollaborationsValidator, 
        },
    },
    {
        plugin: playlists,
        options: {
            service: playlistsService,
            validator: PlaylistsValidator,
        },
    },
    {
        plugin: playlistSongs,
        options: {
            service: {
                playlistSongsService,
                songsService,
                playlistsService,
                playlistActivitiesService,
            },
            validator: PlaylistSongsValidator,
        },
    },
    {
        plugin: playlistActivities,
        options: {
            service: {
                playlistActivitiesService,
                playlistsService,
            },
        },
    },
]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
