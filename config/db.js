const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // ganti sesuai password MySQL kamu
    database: 'db_pemesanan_kelas' // sesuai nama database kamu
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

module.exports = db;
