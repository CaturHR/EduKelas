-- buat database
CREATE DATABASE db_pemesanan_kelas;
USE db_pemesanan_kelas;

-- Tabel kelas
CREATE TABLE kelas (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nama_kelas VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    gambar VARCHAR(255)
);

-- Tabel pelanggan
CREATE TABLE pelanggan (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nama_depan VARCHAR(100),
    nama_belakang VARCHAR(100),
    tanggal_lahir DATE,
    jenis_kelamin ENUM('Laki-laki', 'Perempuan'),
    alamat TEXT,
    kota VARCHAR(100),
    provinsi VARCHAR(100),
    kode_pos VARCHAR(10),
    email VARCHAR(100),
    no_hp VARCHAR(20),
    sekolah VARCHAR(255)
);

-- Tabel transaksi
CREATE TABLE transaksi (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT(11),
    kelas_id INT(11),
    komentar TEXT,
    tanggal_pendaftaran TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'disetujui', 'ditolak') DEFAULT 'pending',
    alasan TEXT,
    FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id),
    FOREIGN KEY (kelas_id) REFERENCES kelas(id)
);

-- Tabel users
CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--input kelas
INSERT INTO kelas (id, nama_kelas, deskripsi, gambar) VALUES
(1, 'Kelas pemrograman C++', 'berisi seputar tutorial programmer untuk mengoding dengan program C++ dari pemula hingga jago coding', 'c.png'),
(3, 'Artificial Intelligence', 'mengetahui apa dibalik layar tentang ai, bagaimana ai memproses kata kalimat dan lainnya', 'ai.jpg'),
(9, 'Deep Learning dengan TensorFlow', 'Memahami dan membangun neural network dengan TensorFlow. Kelas ini mencakup pembuatan model deep learning untuk klasifikasi gambar, pemrosesan bahasa alami, dan optimalisasi model', 'tf.png'),
(10, 'Pemrograman Python untuk Data Science', 'Belajar Python dari awal hingga tahap implementasi untuk analisis data. Kelas ini mencakup pengolahan data dengan Pandas, visualisasi dengan Matplotlib, dan statistik dasar untuk data science. Sangat cocok untuk pemula yang ingin fokus pada analitik data.', 'python.png'),
(11, 'Machine Learning Praktis', 'Fokus pada penerapan teknik machine learning menggunakan dataset dunia nyata. Pelajari supervised dan unsupervised learning, serta evaluasi model dengan tools seperti scikit-learn dan TensorFlow.', 'images.jpg'),
(12, 'Pemrograman Java Lanjutan', 'Pelajari fitur lanjutan Java seperti multithreading, networking, collections framework, dan konsep desain berbasis objek yang kompleks. Cocok untuk peserta yang sudah memahami Java dasar.', 'Java-logo.svg');

--input pelanggan
INSERT INTO pelanggan (id, nama_depan, nama_belakang, tanggal_lahir, jenis_kelamin, alamat, kota, provinsi, kode_pos, email, no_hp, sekolah) VALUES
(1, 'Catur', 'HR', '2006-01-24', 'Laki-laki', 'jalan raya lenteng', 'Sumenep', 'Jawa Timur', '62451', 'catur@pens.com', '081234567890', 'PENS PSDKU Sumenep'),
(2, 'Panca', 'SSJ B', '2222-02-22', 'Perempuan', 'jalan 60', 'namex', 'picolo', '601', 'satya@kekautan.com', '082345678910', 'Sekolah ilmu hytam'),
(3, 'Yona', 'CDS', '2004-01-01', 'Perempuan', 'jalan gresik putih', 'kalianget', 'Jawa Timur', '312452', 'yona@suden.com', '080123456789', 'AKNS Sumenep'),
(4, 'Royhan', 'Firdaus', '2006-01-27', 'Laki-laki', 'jalan diponegoro', 'Sumenep', 'Jawa Timur', '69451', 'roy@gibol.com', '081098765432', 'PENS Pusat'),
(5, 'Dorigs', 'Pra FF', '2032-12-30', 'Perempuan', 'jalan raya lenteng', 'Saronggi', 'Jawa Timur', '60132', 'doriks@prayf.com', '089876543210', 'PENS PSDKU Lamongan'),
(6, 'Khairil', 'Anwar', '2005-07-13', 'Laki-laki', 'jalan raya lenteng', 'Saronggi', 'Jawa Timur', '60110', 'Khairil@anwr.com', '081098765432', 'PENS PJJ'),
(7, 'firman', 'ssr', '2005-07-08', 'Laki-laki', 'jalan wr supratman', 'Sumenep', 'Jawa Timur', '60110', 'firman@syah.com', '081234567890', 'PENS Pusat'),
(8, 'rayyan', 'ababil', '2025-06-17', 'Laki-laki', 'jalan wr supratman', 'Marengan', 'Jawa Timur', '69451', 'rayyan@syszl.com', '082345678910', 'AKNS Sumenep'),
(9, 'Aji', 'sultan hakim', '2006-02-07', 'Laki-laki', 'blok c nomor 23', 'Sumenep', 'Jawa Timur', '62451', 'aji@sltnhkm.com', '081098765432', 'PENS PSDKU Sumenep'),
(10, 'faiq', 'muntashir', '2004-02-12', 'Laki-laki', 'jalan raya surabaya', 'boyolali', 'jawa tengah', '60121', 'fishir@yahoo.com', '082345678910', 'PENS Pusat'),
(11, 'Juni', 'Cobaan', '2005-06-22', 'Laki-laki', 'jalan raya makassar', 'Makassar', 'sulawesi selatan', '60123', 'nicoxlyy@gmail.com', '081098765432', 'Universitas Brawijaya'),
(12, 'Adam', 'M I', '2006-03-10', 'Laki-laki', 'Jalan raya suramadu', 'Gresik', 'Jawa Timur', '69451', 'tenz@damz.com', '089876543210', 'PENS PSDKU Sumenep'),
(13, 'moh pariskik', 'hikmah', '2006-03-16', 'Laki-laki', 'jalan gresik putih', 'Marengan', 'Jawa Timur', '60110', 'john@smith.com', '081098765432', 'PENS PSDKU Sumenep'),
(14, 'ihsan', 'bachtiar', '2006-06-26', 'Laki-laki', 'jalan diponegoro', 'Marengan', 'Jawa Timur', '312452', 'ihsan@123.com', '081098765432', 'PENS PSDKU Sumenep'),
(15, 'ainur', 'taufikur', '2004-10-19', 'Laki-laki', 'jalan diponegoro', 'Sumenep', 'Jawa Timur', '60132', 'ainur@tfkr.com', '081234567890', 'PENS PSDKU Sumenep'),
(16, 'niken', 'rahmatillah', '2006-03-11', 'Laki-laki', 'jalan barito', 'Sumenep', 'Jawa Timur', '69451', 'niken@krnawn.com', '089876543210', 'PENS PSDKU Sumenep'),
(17, 'Haidar', 'Mubarok', '1995-08-24', 'Laki-laki', 'jalan wr supratman', 'Sumenep', 'Jawa Timur', '60110', 'haidar@mhymyn.com', '081098765432', 'PENS PSDKU Sumenep'),
(18, 'Reo', 'Savero', '2006-02-10', 'Laki-laki', 'jalan diponegoro', 'Sumenep', 'picolo', '31245', 'reveo@revo.com', '089876543210', 'PENS PSDKU Lamongan'),
(19, 'Satria', 'N A T', '2006-05-16', 'Laki-laki', 'jalan gresik putih', 'kalianget', 'Jawa Timur', '31245', 'satria@arytj.com', '082345678910', 'PENS PSDKU Sumenep'),
(20, 'Hanif', 'Asyari', '2006-04-17', 'Laki-laki', 'jalan ghaib', 'lamongan', 'Jawa Timur', '12452', 'hanif@pggk.com', '082345678910', 'Sekolah ilmu hytam'),
(21, 'Nur', 'Fajriyah', '2006-04-19', 'Perempuan', 'jalan diponegoro', 'Sumenep', 'Jawa Timur', '31252', 'fjri@nur.com', '082345678910', 'PENS PSDKU Sumenep'),
(22, 'Anggris', 'E M D', '2004-08-17', 'Laki-laki', 'jalan gresik putih', 'kalianget', 'Jawa Timur', '60132', 'akun@skolaa.com', '089876543210', 'PENS PSDKU Sumenep');

--input transaksi
INSERT INTO transaksi (id, pelanggan_id, kelas_id, komentar, tanggal_pendaftaran, status, alasan) VALUES
(1, 1, 1, 'bismillah menjadi programmer', '2025-06-05 22:43:52', 'disetujui', 'selamat bergabung'),
(2, 2, 11, 'semoga saya bisa menjadi super saiyan', '2025-06-06 17:01:16', 'ditolak', 'komentar nguawor'),
(3, 3, 3, 'semoga saya bisa membuat AI', '2025-06-06 17:09:01', 'disetujui', 'selamat bergabung'),
(5, 4, 10, 'saya ingin menjinakkan python', '2025-06-07 17:05:18', 'disetujui', 'selamat bergabung'),
(6, 5, 9, 'saya ingin belajar TF', '2025-06-07 17:13:13', 'disetujui', 'selamat bergabung'),
(7, 6, 12, 'semoga diterima', '2025-06-07 17:14:55', 'disetujui', 'selamat bergabung'),
(8, 7, 11, 'semoga saya bisa diterima', '2025-06-07 18:58:52', 'disetujui', 'selamat bergabung'),
(9, 8, 10, 'tidak apa apa', '2025-06-07 19:43:25', 'pending', 'komentar tidak jelas'),
(10, 9, 9, 'Memahami deeplearning', '2025-06-07 19:44:56', 'disetujui', 'selamat bergabung'),
(11, 10, 1, 'bismillah', '2025-06-07 21:23:17', 'disetujui', 'selamat bergabung'),
(12, 11, 3, 'Bismillah UB, Alhamdulillah', '2025-06-07 21:43:49', 'disetujui', 'selamat bergabung'),
(13, 12, 11, 'Dikira Lucu', '2025-06-07 21:51:36', 'disetujui', 'selamat bergabung'),
(14, 13, 10, 'Hobi : malas dan Telat', '2025-06-07 21:59:25', 'ditolak', 'tidak menerima pemalas'),
(15, 14, 12, 'saya ingin memahami jawa', '2025-06-07 22:02:00', 'disetujui', 'selamat bergabung'),
(16, 15, 9, 'Semoga diterima', '2025-06-07 22:04:31', 'disetujui', 'selamat bergabung'),
(17, 16, 1, 'semoga webnya berkembang', '2025-06-07 22:06:40', 'disetujui', 'selamat bergabung'),
(18, 17, 3, 'Web jelek gak bagus sama sekali', '2025-06-07 22:09:12', 'ditolak', 'tidak mendukung'),
(19, 18, 12, 'semoga bisa program', '2025-06-07 22:11:13', 'disetujui', 'selamat bergabung'),
(20, 19, 11, 'semoga diterima', '2025-06-07 22:14:17', 'disetujui', 'selamat bergabung'),
(21, 20, 10, 'Malas Belajar, mending bolos', '2025-06-07 22:15:50', 'ditolak', 'Tidak menerima yang tidak niat'),
(22, 21, 9, 'Rajin belajar', '2025-06-07 22:17:15', 'disetujui', 'selamat bergabung'),
(23, 22, 11, 'fokus ke materi, tujuan belajar', '2025-06-07 22:18:52', 'disetujui', 'selamat bergabung');

-- input user
INSERT INTO users (id, username, password) VALUES
(1, 'catur@gmail.com', '22244444');
