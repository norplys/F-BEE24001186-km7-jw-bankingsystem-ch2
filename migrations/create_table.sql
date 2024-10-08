CREATE TABLE Nasabah (
    nasabah_id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat VARCHAR(255),
    nomor_hp VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Akun (
    akun_id SERIAL PRIMARY KEY,
    nasabah_id INT,
    saldo DECIMAL(15, 2) DEFAULT 0.00,
    FOREIGN KEY (nasabah_id) REFERENCES Nasabah(nasabah_id)
);
CREATE TABLE Transaksi (
    transaksi_id SERIAL PRIMARY KEY,
    akun_id INT,
    tanggal TIMESTAMP NOT NULL,
    jumlah DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (akun_id) REFERENCES Akun(akun_id)
);
