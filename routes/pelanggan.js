const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /pelanggan
router.get('/', (req, res) => {
  const limitOptions = [5, 10, 15, 20];
  const limitParam = req.query.limit || '5';
  const page = parseInt(req.query.page) || 1;

  const isAll = limitParam === 'all';
  const limit = isAll ? null : parseInt(limitParam);
  const offset = (page - 1) * (limit || 0);

  const countQuery = 'SELECT COUNT(*) AS total FROM pelanggan';
  const baseQuery = `
    SELECT id, nama_depan, nama_belakang, email, no_hp, alamat, kota, provinsi
    FROM pelanggan
    ORDER BY id ASC
  `;

  const getData = (totalPages = 1) => {
    const queryWithLimit = isAll ? baseQuery : `${baseQuery} LIMIT ? OFFSET ?`;
    const params = isAll ? [] : [limit, offset];

    db.query(queryWithLimit, params, (err, results) => {
      if (err) return res.status(500).send('Gagal mengambil data pelanggan');
      res.render('pelanggan', {
        pelanggan: results,
        currentPage: page,
        totalPages,
        limitParam,
        limitOptions
      });
    });
  };

  if (isAll) {
    getData(1);
  } else {
    db.query(countQuery, (err, countResult) => {
      if (err) return res.status(500).send('Gagal menghitung jumlah pelanggan');
      const total = countResult[0].total;
      const totalPages = Math.ceil(total / limit);
      getData(totalPages);
    });
  }
});

module.exports = router;
