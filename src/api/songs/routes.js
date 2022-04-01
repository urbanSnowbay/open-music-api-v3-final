const routes = (handler) => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.postSongHandler, // postSongHandler hanya menerima dan menyimpan "satu" note.
    },

    {
        method: 'GET',
        path: '/notes',
        handler: handler.getSongsHandler, // getSongsHandler mengembalikan "banyak" note.
    },

    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getSongByIdHandler, // getNoteByIdHandler mengembalikan "satu" note.
    },

    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.putSongByIdHandler, // putSongByIdHandler hanya menerima dan mengubah "satu" note.
    },

    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteSongByIdHandler, // deleteSongByIdHandler hanya menerima dan menghapus "satu" note.
    },
];

module.exports = routes;
