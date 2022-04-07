/* eslint-disable camelcase */

// migration utama kita tuliskan di dalam fungsi up dan kebutuhan rollback kita tuliskan di dalam fungsi down
exports.up = (pgm) => {
    pgm.createTable('songs', {
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
        genre: {
            type: 'TEXT',
            notNull: true,
        },
        performer: {
            type: 'TEXT',
        },
        duration: {
            type: 'INTEGER',
        },
        albumId: {
            type: 'TEXT',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('songs');
};
