var express = require('express');
var router = express.Router();
const db = require('../config/db'); // Pastikan file config/db.js sesuai

// Halaman home - tampilkan daftar kelas
router.get('/', (req, res) => {
  db.query('SELECT * FROM kelas', (err, results) => {
    if (err) throw err;
    res.render('index', { kelas: results }); // <-- Kirim data ke views/index.ejs
  });
});

module.exports = router;
