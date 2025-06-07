const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Halaman Form Pendaftaran (/form)
router.get('/', (req, res) => {
    const queryKelas = 'SELECT * FROM kelas';

    db.query(queryKelas, (err, results) => {
        if (err) {
            console.error('Gagal mengambil data kelas:', err);
            return res.status(500).send('Terjadi kesalahan saat memuat halaman.');
        }

        res.render('form', { kelas: results }); // views/form.ejs
    });
});

// Proses Submit Form Pendaftaran (POST /form/submit)
router.post('/submit', (req, res) => {
    const data = req.body;

    const pelanggan = [
        data.namaDepan,
        data.namaBelakang,
        data.tanggal_lahir,
        data.jenisKelamin || '',
        data.alamat || '',
        data.kota || '',
        data.provinsi || '',
        data.kodePos || '',
        data.email || '',
        data.hp || '',
        data.sekolah || ''
    ];

    const insertPelanggan = `
        INSERT INTO pelanggan 
        (nama_depan, nama_belakang, tanggal_lahir, jenis_kelamin, alamat, kota, provinsi, kode_pos, email, no_hp, sekolah) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertPelanggan, pelanggan, (err, result) => {
        if (err) {
            console.error('Gagal menyimpan data pelanggan:', err);
            return res.status(500).send('Terjadi kesalahan saat menyimpan data.');
        }

        const pelangganId = result.insertId;

        const insertTransaksi = `
            INSERT INTO transaksi (pelanggan_id, kelas_id, komentar) 
            VALUES (?, ?, ?)
        `;

        db.query(insertTransaksi, [pelangganId, data.kursus, data.komentar || ''], (err) => {
            if (err) {
                console.error('Gagal menyimpan data transaksi:', err);
                return res.status(500).send('Terjadi kesalahan saat menyimpan transaksi.');
            }

            // Redirect ke halaman utama dengan pesan sukses
            res.redirect('/?success=1');
        });
    });
});

module.exports = router;
