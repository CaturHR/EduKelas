const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const formRoutes = require('./routes/form');
const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index'); // ← tambahkan ini
const kelasRouter = require('./routes/kelas');
const pelangganRouter = require('./routes/pelanggan');
const transaksiRouter = require('./routes/transaksi');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // opsional, jaga-jaga jika views tidak terdeteksi

// Routes
app.use('/', indexRoutes);      // ← ini untuk halaman utama (index.ejs)
app.use('/form', formRoutes);
app.use('/admin', adminRoutes); // ← ini untuk halaman admin
app.use('/', kelasRouter);
app.use('/pelanggan', pelangganRouter);
app.use('/transaksi', transaksiRouter);


//const PORT = 3000;
//app.listen(PORT, () => {
//    console.log(`Server running on http://localhost:${PORT}`);
//});

module.exports = app;
