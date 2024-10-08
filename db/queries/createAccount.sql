INSERT INTO Nasabah (nama, alamat, nomor_hp, email)
VALUES ('Nama Nasabah', 'Alamat Nasabah', '081234567890', 'email@domain.com')
RETURNING nasabah_id;

INSERT INTO Akun (nasabah_id, saldo)
VALUES (1, 0.00)
RETURNING akun_id;
