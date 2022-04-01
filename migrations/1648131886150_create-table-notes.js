/* eslint-disable camelcase */

// migration utama kita tuliskan di dalam fungsi up dan kebutuhan rollback kita tuliskan di dalam fungsi down
exports.up = (pgm) => {
    pgm.createTable('notes', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true,
        },
        performer: {
            type: 'TEXT',
            notNull: true,
        },
        genre: {
            type: 'TEXT',
            notNull: false,
        },
        duration: {
            type: 'INTEGER',
            notNull: false,
        },
        albumId: {
            type: 'VARCHAR(50)',
            notNull: false,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('songs');
};
