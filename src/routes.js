/* eslint-disable indent */
/* eslint-disable linebreak-style */
const { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByIdHandler, 
} = require('./handler');

const routes = [
    {
        method: 'POST', // CREATE (Menambahkan catatan baru)
        path: '/notes',
        handler: addNoteHandler,
    },

    {
        method: 'GET', // READ (Mendapatkan seluruh catatan yang diisi)
        path: '/notes',
        handler: getAllNotesHandler,
    },

    {
        method: 'GET', // READ (Mendapatkan catatan secara spesifik)
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },

    {
        method: 'PUT', // UPDATE (Mengubah catatan)
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },

    {
        method: 'DELETE', // DELETE (Menghapus catatan)
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;
