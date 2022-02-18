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
        method: 'POST', // CREATE
        path: '/notes',
        handler: addNoteHandler,
    },

    {
        method: 'GET', // READ
        path: '/notes',
        handler: getAllNotesHandler,
    },

    {
        method: 'GET', // READ
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },

    {
        method: 'PUT', // UPDATE
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },

    {
        method: 'DELETE', // DELETE
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;
