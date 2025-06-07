const express = require('express');
const router = express.Router();
const db = require('../config/db'); // pastikan ini sudah ada

// Route detail kelas berdasarkan id
router.get('/kelas/:id', (req, res) => {
  const kelasId = req.params.id;
  const query = 'SELECT * FROM kelas WHERE id = ?';

  db.query(query, [kelasId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Terjadi kesalahan server');
    }
    if (results.length === 0) {
      return res.status(404).send('Kelas tidak ditemukan');
    }

    // Kirim data kelas ke view kelas.ejs
    res.render('kelas', { kelas: results[0] });
  });
});

module.exports = router;
