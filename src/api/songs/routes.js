const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.postSongHandler, // postSongHandler hanya menerima dan menyimpan "satu" songs.
    },

    {
        method: 'GET',
        path: '/songs',
        handler: handler.getSongsHandler, // getSongsHandler mengembalikan "banyak" songs.
    },

    {
        method: 'GET',
        path: '/songs/{id}',
        handler: handler.getSongByIdHandler, // getSongByIdHandler mengembalikan "satu" songs.
    },

    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: handler.putSongByIdHandler, // putSongByIdHandler hanya menerima dan mengubah "satu" songs.
    },

    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: handler.deleteSongByIdHandler, // deleteSongByIdHandler hanya menerima dan menghapus "satu" songs.
    },
];

module.exports = routes;
