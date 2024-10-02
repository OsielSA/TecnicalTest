CREATE OR REPLACE PROCEDURE save_position(
    in_position_id INT,
    in_description VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF in_position_id = 0 THEN
        -- Insertar un nueva pocision
        INSERT INTO Positions (description)
        VALUES (in_description);
    ELSE
        -- Actualizar la posicion
        UPDATE Positions
        SET description = in_description
        WHERE position_id = in_position_id;
    END IF;
END;
$$;