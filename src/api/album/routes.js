const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: handler.postAlbumHandler, // postAlbumHandler hanya menerima dan menyimpan "satu" Album.
    },

    {
        method: 'GET',
        path: '/albums/{id}',
        handler: handler.getAlbumByIdHandler, // getAlbumByIdHandler mengembalikan "satu" Album.
    },

    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: handler.putAlbumByIdHandler, // putAlbumByIdHandler hanya menerima dan mengubah "satu" Album.
    },

    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: handler.deleteAlbumByIdHandler, // deleteAlbumByIdHandler hanya menerima dan menghapus "satu" Album.
    },
];

module.exports = routes;
