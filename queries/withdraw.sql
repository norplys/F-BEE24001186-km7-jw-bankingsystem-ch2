DO $$
BEGIN
    UPDATE Akun
    SET saldo = saldo - 200
    WHERE akun_id = akun_id AND saldo >= 200;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Saldo tidak mencukupi untuk penarikan';
    ELSE
        INSERT INTO Transaksi (akun_id, tanggal, jumlah)
        VALUES (1, NOW(), - 200);  
    END IF;

END $$;
