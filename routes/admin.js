const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const session = require('express-session');

// middleware
function isAuthenticated(req, res, next) {
    if (req.session.admin) return next();
    res.redirect('/admin/login');
}

router.use(session({
    secret: 'rahasiaadmin',
    resave: false,
    saveUninitialized: true
}));

// login page
router.get('/login', (req, res) => {
    res.render('admin/login');
});

// proses login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.send('User tidak ditemukan');

        const admin = results[0];
        bcrypt.compare(password, admin.password, (err, match) => {
            if (password === admin.password) {
                req.session.admin = admin;
                res.redirect('/admin/dashboard');
            } else {
                res.send('Password salah');
            }

        });
    });
});

// dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM kelas', (err, kelas) => {
        if (err) throw err;
        res.render('admin/dashboard', { kelas });
    });
});

// tambah kelas
router.get('/kelas/tambah', isAuthenticated, (req, res) => {
    res.render('admin/kelas_add');
});

router.post('/kelas/tambah', isAuthenticated, (req, res) => {
    const { nama_kelas, deskripsi, gambar } = req.body;
    db.query(
        'INSERT INTO kelas (nama_kelas, deskripsi, gambar) VALUES (?, ?, ?)',
        [nama_kelas, deskripsi, gambar],
        (err) => {
            if (err) throw err;
            res.redirect('/admin/dashboard');
        }
    );
});

// edit kelas
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM kelas WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.send('Data tidak ditemukan');
        }
        res.render('admin/edit', { kelas: results[0] });
    });
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nama_kelas, deskripsi, gambar } = req.body;
    const query = 'UPDATE kelas SET nama_kelas = ?, deskripsi = ?, gambar = ? WHERE id = ?';
    db.query(query, [nama_kelas, deskripsi, gambar, id], (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

// hapus kelas
router.get('/hapus:id', isAuthenticated, (req, res) => {
    db.query('DELETE FROM kelas WHERE id=?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

// GET /admin/transaksi dengan pagination & limit
router.get('/transaksi', isAuthenticated, (req, res) => {
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
      t.*,
      p.nama_depan,
      p.nama_belakang,
      k.nama_kelas
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
      res.render('admin/transaksi', {
        transaksi: results,
        currentPage: page,
        totalPages,
        limitParam,
        limitOptions
      });
    });
  };

  if (isAll) {
    getData(1); // tanpa pagination
  } else {
    db.query(countQuery, (err, countResult) => {
      if (err) return res.status(500).send('Gagal menghitung jumlah transaksi');
      const total = countResult[0].total;
      const totalPages = Math.ceil(total / limit);
      getData(totalPages);
    });
  }
});

// POST update status transaksi
router.post('/transaksi/:id/update', isAuthenticated, (req, res) => {
  const { status, alasan } = req.body;
  const id = req.params.id;
  const query = 'UPDATE transaksi SET status = ?, alasan = ? WHERE id = ?';
  db.query(query, [status, alasan, id], (err) => {
    if (err) throw err;
    res.redirect('/admin/transaksi');
  });
});

module.exports = router;
