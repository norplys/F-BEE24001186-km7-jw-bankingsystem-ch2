-- Please call this procedure and call as one transaction
-- Important: Only call this procedure after migrating the database
CREATE OR REPLACE PROCEDURE create_nasabah_akun(
    nama VARCHAR,
    alamat VARCHAR,
    nomor_hp VARCHAR,
    email VARCHAR,
    saldo DECIMAL
)
LANGUAGE plpgsql
AS $$
DECLARE
    my_nasabah_id INT;
    my_akun_id INT;
BEGIN
    INSERT INTO Nasabah (nama, alamat, nomor_hp, email)
    VALUES (nama, alamat, nomor_hp, email)
    RETURNING nasabah_id INTO my_nasabah_id;

    INSERT INTO Akun (nasabah_id, saldo)
    VALUES (my_nasabah_id, saldo)
    RETURNING akun_id INTO my_akun_id;

    RAISE NOTICE 'Nasabah ID: %, Akun ID: %', my_nasabah_id, my_akun_id;
END $$;

CALL create_nasabah_akun('TEST Nasabah', 'Alamat Nasabah', '081234567890', 'email@domain.com', 0.00);

-- Get all nasabah and akun
SELECT *
FROM Nasabah
JOIN Akun ON Nasabah.nasabah_id = Akun.nasabah_id
