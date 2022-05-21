const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
// const { mapDBToModelSong } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ 
        title, year, genre, performer, duration, albumId, 
    }) {
        const id = `song-${nanoid(16)}`;

    // Selanjutnya buat objek query untuk memasukan notes baru ke database seperti ini.
        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, genre, performer, duration, albumId], 
        };

        // Untuk mengeksekusi query yang sudah dibuat, kita gunakan fungsi this._pool.query.
        const result = await this._pool.query(query);

        // Jika nilai id tidak undefined, itu berarti catatan berhasil dimasukan dan kembalikan fungsi dengan nilai id. Jika tidak maka throw InvariantError.
        if (!result.rows[0].id) {
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongs() {
        // Di dalamnya kita dapatkan data songs yang ada di database dengan query “SELECT id, title, performer FROM songs.
        const result = await this._pool.query('SELECT * FROM songs');
        // Kembalikan fungsi getNotes dengan nilai result.rows yang telah di mapping dengan fungsi mapDBToModel.
        return result.rows;
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        // Kemudian periksa nilai result.rows, bila nilainya 0 (false) maka bangkitkan NotFoundError
        if (!result.rows.length) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        // Bila tidak, maka kembalikan dengan result.rows[0] yang sudah di-mapping dengan fungsi mapDBToModel.
        return result.rows[0];
    }

    async getSongsByPlaylistId(playlistId) {
        const result = await this._pool.query({
            text: `SELECT songs.id, songs.title, songs.performer FROM songs 
                    LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id 
                    WHERE playlistsongs.playlist_id = $1`,
            values: [playlistId],
        });
        return result.rows;
    }

    async editSongById(id, { 
        title, year, genre, performer, duration, albumId,
    }) {
        // lakukan query untuk mengubah note di dalam database berdasarkan id yang diberikan.
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "albumId" = $6 WHERE id = $7 RETURNING id',
            values: [title, year, genre, performer, duration, albumId, id],
        };

        const result = await this._pool.query(query);

        // periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError.
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        } 
    }

    async deleteSongById(id) {
        // Lakukan query untuk menghapus note di dalam database berdasarkan id yang diberikan.
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        // periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError. 
        if (!result.rows.length) {
            throw new NotFoundError('Gagal menghapus lagu. Id tidak ditemukan');
        }
    }
}

module.exports = SongsService;