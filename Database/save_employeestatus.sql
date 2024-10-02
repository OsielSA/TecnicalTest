CREATE OR REPLACE PROCEDURE save_employeestatus(
    in_status_id INT,
    in_description VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF in_status_id = 0 THEN
        -- Insertar un nuevo status
        INSERT INTO EmployeesStatus (description)
        VALUES (in_description);
    ELSE
        -- Actualizar el status
        UPDATE EmployeesStatus
        SET description = in_description
        WHERE status_id = in_status_id;
    END IF;
END;
$$;