/* eslint-disable camelcase */
const mapDBToModel = ({
    id,
    title, 
    year, 
    genre, 
    performer, 
    duration,
    created_at,
    updated_at,
}) => ({
    id,
    title, 
    year, 
    genre, 
    performer, 
    duration,
    createdAt: created_at,
    updatedAt: updated_at,
});

module.exports = { mapDBToModel };