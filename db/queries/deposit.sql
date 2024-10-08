-- Please call this procedure and call as one transaction
-- Important: Only call this procedure after migrating the database

CREATE OR REPLACE PROCEDURE deposit(
    p_akun_id INT,
    p_amount DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Akun
    SET saldo = saldo + p_amount
    WHERE akun_id = p_akun_id;

    -- Check if the akun is not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Akun tidak ditemukan dengan akun_id: %', p_akun_id;
    END IF;

    INSERT INTO Transaksi (akun_id, tanggal, jumlah)
    VALUES (p_akun_id, NOW(), p_amount);
END $$;

CALL deposit(1, 1000);

