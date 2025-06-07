const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /transaksi
router.get('/', (req, res) => {
  const limitOptions = [5, 10, 15, 20];
  const limitParam = req.query.limit || '5';
  const page = parseInt(req.query.page) || 1;

  const isAll = limitParam === 'all';
  const limit = isAll ? null : parseInt(limitParam);
  const offset = (page - 1) * (limit || 0);

  const countQuery = `
    SELECT COUNT(*) AS total FROM transaksi t
    JOIN pelanggan p ON t.pelanggan_id = p.id
    JOIN kelas k ON t.kelas_id = k.id
  `;

  const baseQuery = `
    SELECT 
      t.id,
      p.nama_depan,
      p.nama_belakang,
      k.nama_kelas,
      t.tanggal_pendaftaran,
      t.status,
      t.alasan
    FROM transaksi t
    JOIN pelanggan p ON t.pelanggan_id = p.id
    JOIN kelas k ON t.kelas_id = k.id
    ORDER BY t.id ASC
  `;

  const getData = (totalPages = 1) => {
    const queryWithLimit = isAll ? baseQuery : `${baseQuery} LIMIT ? OFFSET ?`;
    const params = isAll ? [] : [limit, offset];

    db.query(queryWithLimit, params, (err, results) => {
      if (err) return res.status(500).send('Gagal mengambil data transaksi');
      res.render('transaksi', {
        transaksi: results,
        currentPage: page,
        totalPages,
        limitParam,
        limitOptions
      });
    });
  };

  if (isAll) {
    getData(1); // no pagination
  } else {
    db.query(countQuery, (err, countResult) => {
      if (err) return res.status(500).send('Gagal menghitung jumlah transaksi');
      const total = countResult[0].total;
      const totalPages = Math.ceil(total / limit);
      getData(totalPages);
    });
  }
});

module.exports = router;
