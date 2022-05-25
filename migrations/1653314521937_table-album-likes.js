exports.up = (pgm) => {
    pgm.createTable('albumlikes', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        albumId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });

    pgm.addConstraint('albumlikes', 'unique_album_id_and_user_id', 'UNIQUE("albumId", user_id)');

    pgm.addConstraint('albumlikes', 'fk_albumlikes.album_id_albums.id', 'FOREIGN KEY("albumId") REFERENCES albums(id) ON DELETE CASCADE');
    pgm.addConstraint('albumlikes', 'fk_albumlikes.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropTable('albumlikes');
};