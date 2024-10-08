DO $$
BEGIN
    UPDATE Akun
    SET saldo = saldo + 1000
    WHERE akun_id = 1;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Akun tidak ditemukan';
    END IF;

    INSERT INTO Transaksi (akun_id, tanggal, jumlah)
    VALUES (1, NOW(), 1000);
END $$;
