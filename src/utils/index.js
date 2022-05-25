/* eslint-disable camelcase */
const mapDBToModelAlbum = ({ 
    id, name, year, coverUrl, 
}) => ({ 
    id,
    name, 
    year, 
    coverUrl, 
});

const mapDBToModelSong = ({
    id,
    title, 
    year, 
    genre, 
    performer, 
    duration,
    albumId,
}) => ({
    id,
    title, 
    year, 
    genre, 
    performer, 
    duration,
    albumId,
});

module.exports = { mapDBToModelSong, mapDBToModelAlbum };