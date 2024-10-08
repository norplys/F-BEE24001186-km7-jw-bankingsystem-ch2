-- Please call this procedure and call as one transaction
-- Important: Only call this procedure after migrating the database

CREATE OR REPLACE PROCEDURE withdraw(
    p_akun_id INT,
    p_amount DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Akun
    SET saldo = saldo - p_amount
    WHERE akun_id = p_akun_id AND saldo >= p_amount;

    -- Check if the akun is not found or saldo is not enough
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Saldo tidak mencukupi untuk penarikan pada akun_id: %', p_akun_id; 
    ELSE
        INSERT INTO Transaksi (akun_id, tanggal, jumlah)
        VALUES (p_akun_id, NOW(), -p_amount);  
    END IF;

END $$;

CALL withdraw(1, 200);


